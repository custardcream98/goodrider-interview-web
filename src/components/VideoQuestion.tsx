const VideoQuestion = () => {
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        width={400}
        src={require("../../public/videos/급가속/급가속30.mp4")}
      ></video>
    </div>
  );
};

export default VideoQuestion;
