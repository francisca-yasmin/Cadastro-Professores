import estilos from './BarraNavegacao.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logout from '../assets/images/logout.png';

export function BarraNavegacao(){
    const navigate = useNavigate();

    const tipo = localStorage.getItem('tipo');

    //verificar como quem (g ou p) eu tô logada
    const linkDisciplina = tipo == 'P' ? 'discprofessor' : 'disciplina'
    const linkAmbiente = tipo == 'P' ? 'ambienteProfessor' : 'ambiente'

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
   
                <Link to={linkDisciplina} className={estilos.link}>
                    <li>Disciplinas</li>
                </Link>

                <Link to={linkAmbiente} className={estilos.link}>
                    <li>Ambiente</li>
                </Link>

                {tipo === 'G' && (
                    <>
                        <Link to={`professor/`} className={estilos.link}>
                            <li>Professores</li>
                        </Link>

                        <Link to={`gestores/`} className={estilos.link}>
                            <li> Gestores </li>

                        </Link>

                        <Link to={`salas/`} className={estilos.link}>
                            <li> Salas </li>
                        </Link>
                    </>
                )} 

                     {/* Botão para realizar logout */}
                     <li onClick={() => handleLogout()} className={estilos.linkLogout}>  
                        <img src={logout} alt="logout da pagina" />   
                    </li>

            </ul>
        </nav>

    )

}