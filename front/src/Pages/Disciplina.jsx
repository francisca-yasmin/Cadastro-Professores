import axios from "axios"; //bater numa url do back
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import canetinha from '../assets/canetinha.png';
import del from '../assets/del.png';
import estilos from './Visualizar.module.css';


export function Disciplina(){
    const [disciplinas, setDisciplinas] = useState([]);
    const [professores , setProfessores] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.01:8000/api/disciplinas/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
            
        })

        // se der certo (200) quero popular a minah variavel disciplina com os dados da API
        .then(response =>{
            setDisciplinas(response.data);
        })
        // se der ruim
        .catch(error =>{
            console.error("erro", error);
        });

        //busca dos professores por id
        axios.get('http://127.0.0.1:8000/api/usuario/',{ //url para pegar os professores
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }) 
        .then(response =>{
            //variavel que eu tô criando agora
            const professorPorId ={};
            response.data.forEach(prof =>{
                professorPorId[prof.id] = `${prof.first_name} ${prof.last_name}`;
            });
            setProfessores(professorPorId);
        })
        //se der errado
        .catch(error =>{
            console.error("erro na busca por professor", error);
        });
    },[])

    return(
        <main className={estilos.container}>
            <h3 className={estilos.titulo}> Disciplinas </h3>
            <div className={estilos.topoAcoes}>
                <p> Adicionar </p>
                <img className={estilos.iconeAdd} src={add} alt="adicionar disciplina" />
            </div>

            <div className={estilos.tableWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            {/* titulo da coluna */}
                            <th> Nome </th>
                            <th> Curso </th>
                            <th> Descrição </th>
                            <th> Carga Horária </th>
                            <th> Professor </th>
                            <th> Ação </th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.map(disciplina =>(
                            <tr key={disciplina.id}>
                            <td> {disciplina.nome} </td>
                            <td> {disciplina.curso} </td>
                            <td> {disciplina.desc} </td>
                            <td> {disciplina.ch} </td>
                            <td> {professores[disciplina.professor]} </td>

                            <td>
                                <img className={estilos.icone} src={canetinha} />
                                <img className={estilos.icone} src={del} />
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </main>
    )
}