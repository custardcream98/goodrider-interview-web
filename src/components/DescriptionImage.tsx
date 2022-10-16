import Image from "next/image";
import { IDescriptionImages } from "~/utils/question_data";

const DescriptionImage = ({
  title,
  imgSrc,
  description,
}: IDescriptionImages) => {
  return (
    <div className="w-64 text-center">
      <strong className="mb-2 block text-[1.2rem]">{title}</strong>
      <div className="relative h-44 w-64 overflow-hidden rounded-xl">
        {/\.mp4$/.test(imgSrc) ? (
          <video
            className="h-full w-full object-cover object-center"
            controls
            muted
            src={imgSrc}
          ></video>
        ) : (
          <Image
            src={imgSrc}
            alt={title + " 이미지"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        )}
      </div>
      <p className="mb-1 mt-2 text-left">{description}</p>
    </div>
  );
};

export default DescriptionImage;
