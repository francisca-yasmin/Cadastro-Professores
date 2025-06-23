import estilos from './BarraNavegacao.module.css'
import { Link } from 'react-router-dom'

export function BarraNavegacao(){
    return(
        <nav className={estilos.conteiner}>
            <ul>
                <Link to={`/inicial`} className={estilos.link}>
                    <li>Home</li>
                </Link>

                <Link to={`professor/`} className={estilos.link}>
                    <li>Professores</li>
                </Link>
                    
                <Link to={`disciplina/`} className={estilos.link}>
                    <li>Disciplinas</li>
                </Link>

                <Link to={`ambiente/`} className={estilos.link}>
                    <li>Ambiente</li>
                </Link>

                <Link to={`gestores/`} className={estilos.link}>
                    <li> Gestores </li>
                </Link>

                <Link to={`salas/`} className={estilos.link}>
                    <li> Salas </li>
                </Link>

            </ul>
        </nav>

    )

}