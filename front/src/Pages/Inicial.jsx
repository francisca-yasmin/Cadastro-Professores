import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Outlet } from "react-router-dom"; //meu conteudo vai passar a ser mostrado no outlet
import { Footer } from '../Componentes/Footer';


export function Inicial(){
    return(
        <>
            <BarraNavegacao/>
            <Outlet/>
            <Footer/>
        </>
    )
}