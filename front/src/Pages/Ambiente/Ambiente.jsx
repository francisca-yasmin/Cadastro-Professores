import axios from "axios"; //bater numa url do back
import React, {useState, useEffect} from 'react';
import add from '../../assets/images/add.png';
import canetinha from '../../assets/images/canetinha.png';
import del from '../../assets/images/del.png';
import estilos from '../Visualizar.module.css';
import { Link } from "react-router-dom";


export function Ambiente(){
  const [ambientes, setAmbientes] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://127.0.0.1:8000/api/ambiente/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      setAmbientes(response.data);
    })
    .catch(error => {
      console.error("Erro ao buscar ambientes:", error);
    });
  }, []);

  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este ambiente?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');
    axios.delete(`http://127.0.0.1:8000/api/ambiente/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      alert('Ambiente excluído com sucesso!');
      setAmbientes(prev => prev.filter(item => item.id !== id));
    })
    .catch(error => {
      console.error('Erro ao excluir ambiente:', error);
      alert('Erro ao excluir ambiente.');
    });
  };


    return(
        <main className={estilos.container}>
            <h3 className={estilos.titulo}> Ambientes </h3>
            <div className={estilos.topoAcoes}>
                {/* botao de adicionar */}
                <Link to="/inicial/cadastroAmbiente">
                    <img className={estilos.iconeAdd} src={add} alt="adicionar disciplina" />
                </Link>
            </div>

            <div className={estilos.tableWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            {/* titulo da coluna */}
                            <th> Data inicio </th>
                            <th> Data Final </th>
                            <th> Periodo </th>
                            <th> Disciplina </th>
                            <th> Sala </th>
                            <th> Professor </th>
                            <th> Ação </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ambientes.map(ambiente =>(
                            <tr key={ambiente.id}>
                                <td> {ambiente.dt_inicio} </td>
                                <td> {ambiente.dt_termino} </td>
                                <td> {ambiente.periodo} </td>
                                <td> {ambiente.disciplina?.nome} </td>
                                <td> {ambiente.sala?.nome} </td>
                                <td> {ambiente.professor?.username} </td>

                                <td className={estilos.acoes}>
                                {/* Passo para o "param" o id do item que posso editar e excluir */}
                                    <Link to={`/inicial/editAmbiente/${ambiente.id}`}>
                                        <img src={canetinha} className={estilos.icone}/>
                                    </Link>
                                    <img src={del} alt="Excluir" className={estilos.icone}
                                        onClick={() => handleDelete(ambiente.id)}/>                                  
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </main>
    )
}