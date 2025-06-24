import axios from "axios"; // importa axios para fazer requisições HTTP
import React, {useState, useEffect} from 'react';
import add from '../../assets/images/add.png';
import canetinha from '../../assets/images/canetinha.png';
import del from '../../assets/images/del.png';
import estilos from '../Visualizar.module.css';
import { Link, useNavigate } from "react-router-dom";

export function Professores(){
    const [professores , setProfessores] = useState([]); // guarda os professores vindos da API
    const navigate= useNavigate(); // permite redirecionar o usuário

    useEffect(()=>{ // executa ao carregar a página
        const token = localStorage.getItem('access_token'); // pega token do localStorage

        axios.get('http://127.0.0.1:8000/api/usuario/professor/', {
            headers: {
                'Authorization': `Bearer ${token}` // envia o token no cabeçalho
            }
        })
        .then(response => {
            setProfessores(response.data); // salva os professores no estado
        })
        .catch(error => {
            console.error("erro", error); // exibe erro no console
        });
    }, [])

    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este professor?'); // pede confirmação
        if (!confirmar) return;

        const token = localStorage.getItem('access_token');

        axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}` // envia token na exclusão
            }
        })
        .then(() => {
            alert('Professor excluído com sucesso!');
            setProfessores(prev => prev.filter(dis => dis.id !== id)); // remove do estado local
            navigate('/inicial/professor'); // redireciona
        })
        .catch(error => {
            console.error('Erro ao excluir professor:', error); // exibe erro
            alert('Erro ao excluir a professor.');
        });
    };

    return(
        <main className={estilos.container}>
            <h3 className={estilos.titulo}> Pofessores </h3>

            <div className={estilos.topoAcoes}>
                {/* botão para cadastrar novo professor */}
                <Link to="/inicial/cadastrarP">
                    <img className={estilos.iconeAdd} src={add} alt="adicionar um professor novo" />
                </Link>
            </div>

            <div className={estilos.tableWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            {/* cabeçalho da tabela */}
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
                        {professores.map(professor =>(
                            <tr key={professor.id}>
                                <td> {professor.first_name} </td>
                                <td> {professor.email} </td>
                                <td> {professor.ni} </td>
                                <td> {professor.nascimento} </td>
                                <td> {professor.data_contratacao} </td>
                                <td> {professor.telefone} </td>

                                <td className={estilos.acoes}>
                                    {/* botão de editar professor */}
                                    <Link to={`/inicial/profedit/${professor.id}`}>
                                        <img src={canetinha} className={estilos.icone}/>
                                    </Link>
                                    {/* botão de excluir professor */}
                                    <img src={del} alt="Excluir" className={estilos.icone}
                                        onClick={() => handleDelete(professor.id)}/>                                  
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
