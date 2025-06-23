import axios from 'axios';
import React, { useState, useEffect } from 'react';
import estilos from '../Visualizar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import add from '../../assets/images/add.png';
import canetinha from '../../assets/images/canetinha.png';
import del from '../../assets/images/del.png';

// componente que exibe e cria as salas
export function Salas(){
    
    const [salas, setSalas] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        // buscar salas
        axios.get('http://127.0.0.1:8000/api/sala/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        .then(response => {
            setSalas(response.data);
        })

        .catch(error => {
            console.error("Erro: ", error);
        });
    }, [])

    // Função para deletar sala
    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta sala?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/sala/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Sala excluída com sucesso!');
            setSalas(prev => prev.filter(sala => sala.id !== id));
            navigate('/inicial/sala');
        })
        .catch(error => {
            console.error('Erro ao excluir sala:', error);
            alert('Erro ao excluir a sala.');
        });
    };

    // Interface principal da página
    return(

        <main className={estilos.container}>
            <h3 className={estilos.titulo}>Salas</h3>

            {/* Botão de adicionar nova sala */}
            <div className={estilos.topoAcoes}>
                <Link to="/inicial/salacadastrar">
                    <img className={estilos.iconeAdd} src={add} alt="Adicionar salas" />
                </Link>
            </div>

            {/* Tabela de salas */}
            <div className={estilos.tabelaWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Capacidade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salas.map(sala => (
                            <tr key={sala.id}>
                                <td>{sala.nome}</td>
                                <td>{sala.capacidade}</td>
                                <td className={estilos.acoes}>
                                    <Link to={`/inicial/salaeditar/${sala.id}/`}>
                                        <img className={estilos.icone} src={canetinha}/>
                                    </Link>

                                    <img src={del} alt="Excluir" className={estilos.icone} 
                                        onClick={() => handleDelete(sala.id)}/>    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
