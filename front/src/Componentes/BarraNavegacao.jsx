import estilos from './BarraNavegacao.module.css'
import { Link } from 'react-router-dom'

export function BarraNavegacao(){
    return(
        <nav className={estilos.conteiner}>
            <ul>
                <Link to={`/inicial`}>
                    <li>Home</li>
                </Link>

                <Link>
                    <li>Professores</li>
                </Link>
                    
                <Link to={`disciplina/`}>
                    <li>Disciplinas</li>
                </Link>

                <Link>
                    <li>Reservas de Ambiente</li>
                </Link>
            </ul>
        </nav>

    )

}