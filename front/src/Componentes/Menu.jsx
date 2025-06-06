import estilos from './Menu.module.css';
// imports dos icones do menu na tela inicial
import ambientes from '../assets/images/ambientes.png';
import disciplinas from '../assets/images/disciplinas.png';
import professor from '../assets/images/professor.png';
import gestor from '../assets/images/gestor.png';


import { Link } from 'react-router-dom'; //navegaçao

export function Menu(){
    const tipo = localStorage.getItem('tipo');
    const linkDisciplina = tipo === 'P' ? 'discProfessor' : 'disciplina';


    return(
        <>
            <header className={estilos.conteiner}>

                {/* filtro de professores */}
                <Link>
                    <div className={estilos.icones}>
                        <img src={professor} alt="icone de professor" />
                    </div>
                        <p> Professores </p>
                </Link>
            
                {/* filtro de gestor */}
                <Link>
                    <div className={estilos.icones}>
                        <img src={gestor} alt="icone de gestor" />
                    </div>
                        <p> Gestores </p>

                </Link>

                    {/* filtro de ambientes */}
                <Link>
                    <div className={estilos.icones}>
                        <img src={ambientes} alt="icone de ambiente" />
                    </div>
                    <p> Ambientes </p>
                </Link>

                {/* filtro de disciplinas */}
                <Link to={linkDisciplina}>
                    <div className={estilos.icones}>
                        <img src={disciplinas} alt="icone de disciplina" />
                    </div>
                        <p> Disciplinas </p>

                </Link>
            </header>

            <main>

            </main>
        </>
    )
}

