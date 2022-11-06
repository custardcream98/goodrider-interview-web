import { IDescriptionImages } from "~/utils/question_data";
import EmbededContent from "./EmbededContent";

const DescriptionImage = ({
  title,
  imgSrc,
  description,
}: IDescriptionImages) => {
  return (
    <div className="w-[280px] text-center md:w-64">
      <strong className="mb-2 block text-[1.2rem]">{title}</strong>
      <EmbededContent imgTitle={title} src={imgSrc} />
      <p className="mb-1 mt-2 text-left">{description}</p>
    </div>
  );
};

export default DescriptionImage;
