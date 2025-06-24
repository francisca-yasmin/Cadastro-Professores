import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Outlet } from "react-router-dom"; //meu conteudo vai passar a ser mostrado no outlet
import { Footer } from '../Componentes/Footer';
import estilos from './Inicial.module.css';

export function Inicial(){
    return(
        <div className={estilos.container}>
            <BarraNavegacao/>
            <main className={estilos.conteudo}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}