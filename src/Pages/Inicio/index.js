import React, { useEffect, useState } from "react";
import Banner from "../../Componentes/Banner"; // Ajusta la ruta según la estructura de tu proyecto
import VideosCategorias from "../../Componentes/VideosCategorias/VideoCategorias";
import styles from "./inicio.module.css";

function Inicio() {
    const [videos, setVideos] = useState([]);
    const [bannerImg, setBannerImg] = useState(""); // Estado para la imagen del banner
    const [bannerColor, setBannerColor] = useState(""); // Estado para el color del banner

    useEffect(() => {
        // Realizar la solicitud fetch
        fetch('https://raw.githubusercontent.com/Zoe-2688/Aluraflix/master/public/Data/db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched videos:', data);
            setVideos(data.videos);
            // Establecer la imagen y color del banner desde los datos recibidos
            if (data.banner && data.banner.img && data.banner.color) {
                setBannerImg(data.banner.img);
                setBannerColor(data.banner.color);
            }
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        });
    }, []);

    return (
        <>
            <Banner img={bannerImg} color={bannerColor} />
            <section className={styles.container}>
                <VideosCategorias videos={videos} />
                {videos.length === 0 && <p>No hay videos disponibles.</p>}
            </section>
        </>
    );
}

export default Inicio;
