import React from 'react';

const VideoPlayer = ({ videoSrc }) => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={videoSrc}
        title="Video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;