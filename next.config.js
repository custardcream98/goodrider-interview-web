const withVideos = require("next-videos");

module.exports = {
  compiler: {
    styledComponents: true,
  },
  ...withVideos(),
};
withVideos();
