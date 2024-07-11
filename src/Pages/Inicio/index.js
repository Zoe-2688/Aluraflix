import React, { useEffect, useState } from "react";
import Banner from "../../Componentes/Banner";
import VideoCategories from "Componentes/VideosCategorias/VideosCategorias"; // Importa el componente VideoCategories
import styles from "./inicio.module.css";

function Inicio() {
    const [videos, setVideos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [TestImages, setTestImages] = useState([]);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/Zoe-2688/Aluraflix/master/db.json")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched videos:", data);
                if (data && data.videos) {
                    const categoriasUnicas = [...new Set(data.videos.map(video => video.categoria))];
                    setCategorias(categoriasUnicas);

                    const videosWithImageURLs = data.videos.map(video => ({
                        ...video,
                        img: video.img ? `${process.env.PUBLIC_URL}${video.img}` : null
                    }));
                    setVideos(videosWithImageURLs);
                } else {
                    console.error("Videos not found in data:", data);
                    setVideos([]);
                }
            })
            .catch(error => {
                console.error("Error fetching videos:", error);
            });
    }, []);

    return (
        <>
            <Banner img="home" color="#154580" />
            <section className={styles.container}>
                <VideoCategories videos={videos} />
                {videos.length === 0 && <p>No hay videos disponibles.</p>}
            </section>
        </>
    );
}

export default Inicio;

