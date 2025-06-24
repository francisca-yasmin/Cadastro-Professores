import estilos from './BarraNavegacao.module.css'
import { Link, useNavigate } from 'react-router-dom'

export function BarraNavegacao(){
    const navigate = useNavigate;

    const tipo = localStorage.getItem('tipo');

    //verificar como quem (g ou p) eu tô logada
    const linkDiscuplina = tipo == 'P' ? 'discprofessor' : 'disciplina'
    const linkAmbiente = tipo == 'P' ? 'ambienteProfessor' : 'ambiente'

     const nome = localStorage.getItem('username')

    function handleLogout(){
        localStorage.clear();
        navigate('/');
    }
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