import { memo } from "react";
import { IDescriptionImages } from "~/utils/question_data";
import EmbededContent from "./EmbededContent";

const DescriptionImage = ({ data }: { data: IDescriptionImages }) => {
  return (
    <div className="w-[280px] text-center md:w-64">
      <strong className="mb-2 block text-[1.2rem]">{data.title}</strong>
      <EmbededContent imgTitle={data.title} src={data.imgSrc} />
      <p className="mb-1 mt-2 text-left">{data.description}</p>
    </div>
  );
};

export default memo(DescriptionImage);
