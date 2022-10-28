const withVideos = require("next-videos");

module.exports = {
  compiler: {
    styledComponents: true,
  },
  rewrites: () => [
    {
      source: "/post",
      destination: "http://geodb.uos.ac.kr/api/driver/post/survey",
    },
  ],
  ...withVideos(),
};
withVideos();
