import Banner from "components/Banner";
import styles from "./Player.module.css"
import Titulo from "components/Titulo";
import { useParams } from "react-router-dom";
import NotFound from "pages/NotFound";
import { useEffect, useState } from "react";

function Player(){
  const [video, setVideo] = useState({});

  const parametros = useParams();

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/Zoe-2688/Alura-cinema/videos?id=${parametros.id}`)
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array with a single video object
        if (data.length > 0) {
          setVideo(data[0]); // Update state with the first element of data array
        }
      });
  }, [parametros.id]); // Ensure useEffect runs when parametros.id changes

  console.log(video);

  if (!video || Object.keys(video).length === 0) return <NotFound />;

  return (
    <>
      <Banner img="player" color="#58B9AE"/>
      <Titulo>
        <h1>Player</h1>
      </Titulo>
      <section className={styles.container}>
        <iframe
          width="100%"
          height="100%"
          src={video.link}
          title={video.titulo}
          frameborder={0} 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </section>
    </>
  );
}

export default Player;
