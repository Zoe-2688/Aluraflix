import Banner from "../../Componentes/Banner"; // Ajusta la ruta según la estructura de tu proyecto
import Titulo from "../../Componentes/Titulo"; // Ajusta la ruta según la estructura de tu proyecto
import Card from "../../Componentes/Card"; // Ajusta la ruta según la estructura de tu proyecto
import styles from "./inicio.module.css";
import { useEffect, useState } from "react";

function Inicio() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/Zoe-2688/aluraflix/videos")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched videos:", data); // Log para verificar los datos
                if (data && data.videos) {
                    setVideos(data.videos); // Asegúrate de que los videos se establezcan correctamente
                } else {
                    console.error("Videos not found in data:", data);
                    setVideos([]); // Configurar videos como un array vacío si no se encuentran videos válidos
                }
            })
            .catch(error => {
                console.error("Error fetching videos:", error);
            });
    }, []);
    

    return (
        <>
            <Banner img="home" color="#154580" />
            <Titulo>
                <h1>Un lugar para guardar sus videos favoritos</h1>
            </Titulo>
            <section className={styles.container}>
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <Card {...video} key={video.id} />
                    ))
                ) : (
                    <p>No hay videos disponibles.</p>
                )}
            </section>
        </>
    );
}

export default Inicio;
