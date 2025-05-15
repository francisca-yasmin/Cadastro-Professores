import estilos from './Menu.module.css';
// imports dos icones do menu na tela inicial
import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplina.png';
import professor from '../assets/professor.png';
import gestor from '../assets/gestor.png';

export function Menu(){
    return(
        <div className={estilos.conteiner}>
            <table>
                <tbody>
                    <tr>  {/*tr -> linhas e td são as celulas dentro da linha que pode ser chamada de coluna*/ }
                        <td>
                            <img src={disciplina} />
                            <label alt='Disciplinas do professor'>Disciplinas</label>
                        </td>

                        <td>
                            <img src={ambiente} />
                            <label>Ambiente</label>
                        </td>

                        <tr>
                            <td>
                                <img src={professor} />
                                <label>Professores</label>
                            </td>

                            <td>
                                <img src={gestor} />
                                <label> Gestores </label>
                            </td>
                        </tr>
                    
                    </tr>
                </tbody>
            </table>
        </div>
    )
}