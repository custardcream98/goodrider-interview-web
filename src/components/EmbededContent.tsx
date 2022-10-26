import Image from "next/image";

type Props = {
  imgTitle?: string;
  src: string;
};

const EmbededContent = ({ imgTitle, src }: Props) => (
  <div
    className={`relative h-[230px] w-[330px] overflow-hidden rounded-xl md:h-44 md:w-64`}
  >
    {/\.mp4$/.test(src) ? (
      <video
        className="h-full w-full object-cover object-center"
        controls
        muted
        src={src}
      ></video>
    ) : (
      <Image
        src={src}
        alt={imgTitle + " 이미지"}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    )}
  </div>
);

export default EmbededContent;
