
import estilos from './Menu.module.css';

// imports dos icones do menu na tela inicial
import ambientes from '../assets/images/ambientes.png';
import disciplinas from '../assets/images/disciplinas.png';
import professor from '../assets/images/professor.png';
import gestor from '../assets/images/gestor.png';
import { Link } from 'react-router-dom'; //navegaçao
import salaas from '../assets/images/salaas.png';
import educaCode from  '../assets/images/educaCode.png';

export function Menu(){
    const tipo = localStorage.getItem('tipo');
    const linkDisciplina = tipo === 'P' ? 'discProfessor' : 'disciplina';
    const ambiente = tipo === 'P' ? 'ambienteProfessor' : 'ambiente';

    const nome = localStorage.getItem('username')


    return(
        <>
            <header className={estilos.conteiner}>

                <div>
                    <img src={educaCode} alt="banner de boas vindas" className={estilos.banner} />
                </div>


            </header>

            <main className={estilos.conteiner}>

                <div className={estilos.filtros}>


                    {/* filtro de ambientes */}
                    <Link to={ambiente} className={estilos.link}>
                        <div className={estilos.icones}>
                            <img src={ambientes} alt="icone de ambiente" />
                        </div>
                        <p> Ambientes </p>
                    </Link>

                    {/* filtro de disciplinas */}
                    <Link to={linkDisciplina} className={estilos.link}>
                        <div className={estilos.icones}>
                            <img src={disciplinas} alt="icone de disciplina" />
                        </div>
                            <p> Disciplinas </p>

                    </Link>
                
                    {/* filtro de gestor */}
                    {tipo === 'G' && (
                        <>
                            <Link to='gestores' className={estilos.link}>
                                <div className={estilos.icones}>
                                    <img src={gestor} alt="icone de gestor" />
                                </div>
                                    <p> Gestores </p>

                            </Link>

                            {/* filtro de professores */}
                            <Link to='professor' className={estilos.link}>
                                <div className={estilos.icones}>
                                    <img src={professor} alt="icone de professor" />
                                </div>
                                    <p> Professores </p>
                            </Link>

                            <Link to='salas' className={estilos.link}>
                                <div className={estilos.icones}>
                                    <img src={salaas} alt="icone de salas" />
                                </div>
                                    <p> Salas </p>
                            </Link>
                        </>
                    )}
               </div>
            </main>
        </>
    )
}

