interface IProps {
  videoPath: string;
}

const VideoQuestion = ({ videoPath }: IProps) => {
  return (
    <video
      className="rounded-lg"
      autoPlay
      loop
      muted
      width={400}
      src={videoPath}
    ></video>
  );
};

export default VideoQuestion;
