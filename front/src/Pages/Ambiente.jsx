import axios from "axios"; //bater numa url do back
import React, {useState, useEffect} from 'react';
import add from '../assets/images/add.png';
import canetinha from '../assets/images/canetinha.png';
import del from '../assets/images/del.png';
import estilos from './Visualizar.module.css';
import { Link } from "react-router-dom";


export function Ambientes(){
    const [disciplinas, setDisciplinas] = useState([]);
    const [professores , setProfessores] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.01:8000/api/ambientes/',{
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
        axios.get('http://127.0.0.1:8000/api/usuario/professor/',{ //url para pegar os professores
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }) 
        .then(response =>{
            //variavel que eu tô criando agora
            const professorPorId ={};
            response.data.forEach(prof =>{
                professorPorId[prof.id] = `${prof.username}`;
            });
            setProfessores(professorPorId);
        })
        //se der errado
        .catch(error =>{
            console.error("erro na busca por professor", error);
        });

        //busca por disciplina 
        axios.get('http://127.0.0.1:8000/api/disciplinas/',{ //url para pegar os disciplina
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }) 
        .then(response =>{
            //variavel que eu tô criando agora
            const disciplinaPorID ={};
            response.data.forEach(disc =>{
                disciplinaPorID[disc.id] = `${disc.nome}`;
            });
            setProfessores(disciplinaPorID);
        })
        //se der errado
        .catch(error =>{
            console.error("erro na busca por disciplina", error);
        });

             //busca por sala
        axios.get('http://127.0.0.1:8000/api/sala/',{ //url para pegar os disciplina
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }) 
        .then(response =>{
            //variavel que eu tô criando agora
            const salaPorID ={};
            response.data.forEach(sala =>{
                salaPorID[sala.id] = `${sala.nome}`;
            });
            setProfessores(salaPorID);
        })
        //se der errado
        .catch(error =>{
            console.error("erro na busca por sala", error);
        });
    },[])

     const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este ambiente?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/ambiente/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Ambiente excluído com sucesso!');
            setDisciplinas(prev => prev.filter(dis => dis.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir ambiente:', error);
            alert('Erro ao excluir ambiente.');
        });
    };


    return(
        <main className={estilos.container}>
            <h3 className={estilos.titulo}> Disciplinas </h3>
            <div className={estilos.topoAcoes}>
                {/* botao de adicionar */}
                <Link to="/inicial/cadastrar">
                    <img className={estilos.iconeAdd} src={add} alt="adicionar disciplina" />
                </Link>
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

                            <td className={estilos.acoes}>
                            {/* Passo para o "param" o id do item que posso editar e excluir */}
                                <Link to={`/inicial/editar/${disciplina.id}`}>
                                    <img src={canetinha} className={estilos.icone}/>
                                </Link>
                                <img src={del} alt="Excluir" className={estilos.icone}
                                    onClick={() => handleDelete(disciplina.id)}/>                                  
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </main>
    )
}