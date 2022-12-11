import { calScoreToVal } from "~/utils/calSlider";
import ahpDummyJson from "../fixtures/ahpDummy.json";

describe("AHP 테스트", () => {
  it("렌더링 확인", () => {
    cy.visit("/");
    cy.contains(
      "본 설문조사는 이륜차 착한운전 평가 시스템 개발에 관한 설문지입니다."
    );

    cy.get<HTMLInputElement>("#male").should("not.be.checked");
    cy.get<HTMLInputElement>("#female").should("not.be.checked");
    cy.get<HTMLSelectElement[]>("#age option").each((item, index) =>
      index === 0
        ? expect(Cypress.$(item).is(":checked")).to.not.eq(false)
        : expect(Cypress.$(item).is(":checked")).to.not.eq(true)
    );
  });

  it("응답 입력 및 동작 확인", () => {
    cy.visit("/");

    // 나이대 체크
    cy.get<HTMLSelectElement>("#age").select("20");
    cy.get<HTMLSelectElement>("#age").should("have.value", "20");

    // 응답 초기화화기 활성화 여부 확인
    cy.contains("응답 초기화하기").should("be.enabled");

    // 성별 체크
    cy.get<HTMLInputElement>("#male").check();
    cy.get<HTMLInputElement>("#male").should("be.checked");

    // 이륜차 경험 여부 체크
    cy.get<HTMLInputElement>("#yes").check();
    cy.get<HTMLInputElement>("#yes").should("be.checked");

    // 설문 시작
    cy.contains("설문 시작").should("not.have.class", "opacity-30");

    cy.contains("설문 시작").click();

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;

    const inputEventDispatcher = (
      element: EventTarget,
      val: number | string
    ) => {
      nativeInputValueSetter?.call(element, val);
      element.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const setInputValByPage = (pageIndex: number) =>
      cy
        .get<HTMLInputElement[]>("input[type='range']")
        .each((element, questionIndex) => {
          const calculatedVal = calScoreToVal(
            ahpDummyJson[pageIndex][questionIndex]
          );

          inputEventDispatcher(element[0], calculatedVal);
        })
        .then((_) => {
          cy.wait(20);
          cy.contains<HTMLButtonElement>("틀린 문제로 이동").should(
            "be.hidden"
          );
          cy.get("a.outline").should("have.class", "dark");
        });

    cy.get<HTMLAnchorElement[]>("[data-testid='page-link']").each(
      (pageLink, i) => {
        cy.log(JSON.stringify(ahpDummyJson[i][1]));
        if (typeof ahpDummyJson[i][1] === "object") {
          cy.visit(pageLink.attr("href"), { timeout: 30000 }).then((_) => {
            cy.wait(500);
            const radioCheckIndex = ahpDummyJson[i][0] as number;
            cy.get("input[type='radio']").each((element, index) => {
              if (index === radioCheckIndex) {
                cy.wrap(element).check();
              }
            });
            cy.get("select")
              .each((element, index) => {
                if (index >= radioCheckIndex) {
                  cy.wrap(element).select(
                    ahpDummyJson[i][1][index - radioCheckIndex]
                  );
                }
              })
              .then((_) => {
                cy.get("a.outline").should("have.class", "dark");
              });
          });
        } else if (i !== 0) {
          cy.visit(pageLink.attr("href"), { timeout: 30000 }).then((_) => {
            cy.wait(500);
            setInputValByPage(i);
          });
        } else {
          setInputValByPage(i);
        }
      }
    );
  });
});
