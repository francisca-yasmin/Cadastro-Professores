import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react-router-dom"; //meu conteudo vai passar a ser mostrado no outlet

export function Inicial(){
    return(
        <>
            <BarraNavegacao/>
            <Cabecalho/>
            <Outlet/>
        </>
    )
}