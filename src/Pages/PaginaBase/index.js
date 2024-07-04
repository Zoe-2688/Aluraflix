import Cabecera from "../../Componentes/Cabecera";
import Container from "../../Componentes/Container";
import FavoritoProvider from "../../context/Favoritos";
import { Outlet } from "react-router-dom";

function PaginaBase() {
    return (
        <main>
            <Cabecera />
            <FavoritoProvider>
                <Container>
                    <Outlet />
                </Container>
            </FavoritoProvider>
        </main>
    );
}

export default PaginaBase;
