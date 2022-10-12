interface IProps {
  videoPath: string;
}

const VideoQuestion = ({ videoPath }: IProps) => {
  return (
    <div>
      <video autoPlay loop muted width={400} src={videoPath}></video>
    </div>
  );
};

export default VideoQuestion;
