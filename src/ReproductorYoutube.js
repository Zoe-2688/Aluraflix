import React, { useEffect } from 'react';

const ReproductorYouTube = ({ videoId }) => {

  useEffect(() => {
    const loadYouTubePlayer = () => {
      new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: videoId,
        playerVars: {
          origin: window.location.origin,
          controls: 1,
          autoplay: 0,
        },
      });
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onload = loadYouTubePlayer;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [videoId]);

  return <div id="player"></div>;
};

export default ReproductorYouTube;
