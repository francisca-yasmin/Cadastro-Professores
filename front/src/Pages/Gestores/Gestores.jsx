import axios from "axios"; // importa axios para requisições HTTP
import React, {useState, useEffect} from 'react';
import add from '../../assets/images/add.png';
import canetinha from '../../assets/images/canetinha.png';
import del from '../../assets/images/del.png';
import estilos from '../Visualizar.module.css';
import { Link, useNavigate } from "react-router-dom";

export function Gestores(){
    const [gestores , setGestores] = useState([]); // armazena os gestores
    const navigate = useNavigate(); // redirecionamento

    useEffect(()=>{ // executa ao abrir a tela
        const token = localStorage.getItem('access_token'); // pega token do localStorage

        axios.get('http://127.0.0.1:8000/api/usuario/gestor/', {
            headers: {
                'Authorization': `Bearer ${token}` // inclui token no cabeçalho
            }
        })
        .then(response => {
            setGestores(response.data); // atualiza lista com os dados da API
        })
        .catch(error => {
            console.error("erro", error); // exibe erro no console
        });
    }, [])

    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este gestor?'); // pede confirmação
        if (!confirmar) return;

        const token = localStorage.getItem('access_token'); // pega token

        axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}` // inclui token no cabeçalho
            }
        })
        .then(() => {
            alert('Gestor excluído com sucesso!');
            setGestores(prev => prev.filter(dis => dis.id !== id)); // remove da lista
            navigate('/inicial/gestores'); // redireciona
        })
        .catch(error => {
            console.error('Erro ao excluir gestor:', error); // exibe erro
            alert('Erro ao excluir a gestor.');
        });
    };

    return(
        <main className={estilos.container}>
            <h3 className={estilos.titulo}> Gestores </h3>

            <div className={estilos.topoAcoes}>
                {/* botão de adicionar novo gestor */}
                <Link to="/inicial/cadastrarGestor">
                    <img className={estilos.iconeAdd} src={add} alt="adicionar um gestor novo" />
                </Link>
            </div>

            <div className={estilos.tableWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            {/* cabeçalhos da tabela */}
                            <th> Nome </th>
                            <th> Email </th>
                            <th> NI </th>
                            <th> Data de Nascimento </th>
                            <th> Data de contratação </th>
                            <th> Telefone </th>
                            <th> Ação </th>
                        </tr>
                    </thead>
                    <tbody>
                        {gestores.map(gestores => (
                            <tr key={gestores.id}>
                                <td> {gestores.username} </td>
                                <td> {gestores.email} </td>
                                <td> {gestores.ni} </td>
                                <td> {gestores.nascimento} </td>
                                <td> {gestores.data_contratacao} </td>
                                <td> {gestores.telefone} </td>

                                {/* botões de editar e excluir */}
                                <td className={estilos.acoes}>
                                    <Link to={`/inicial/editGestor/${gestores.id}`}>
                                        <img src={canetinha} className={estilos.icone}/>
                                    </Link>
                                    <img src={del} alt="Excluir" className={estilos.icone}
                                        onClick={() => handleDelete(gestores.id)}/>                                  
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
