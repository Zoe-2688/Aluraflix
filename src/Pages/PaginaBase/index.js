import React from "react";
import Container from "../../Componentes/Container";
import { Outlet } from "react-router-dom";

function PaginaBase() {
    return (
        <main>
            
            <Container>
                <Outlet />
            </Container>
        </main>
    );
}

export default PaginaBase;
