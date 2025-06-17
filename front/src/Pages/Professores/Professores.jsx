import axios from "axios"; //bater numa url do back
import React, {useState, useEffect} from 'react';
import add from '../../assets/images/add.png';
import canetinha from '../../assets/images/canetinha.png';
import del from '../../assets/images/del.png';
import estilos from '../Visualizar.module.css';
import { Link, useNavigate } from "react-router-dom";


export function Professores(){
    const [professores , setProfessores] = useState([]);
    const navigate= useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/usuario/professor/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
            
        })

        // se der certo (200) quero popular a minah variavel disciplina com os dados da API
        .then(response =>{
            setProfessores(response.data);
        })
        // se der ruim
        .catch(error =>{
            console.error("erro", error);
        });
    },[])

     const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este professor?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Professor excluído com sucesso!');
            setProfessores(prev => prev.filter(dis => dis.id !== id));
            navigate('/inicial/professor')
        })
        .catch(error => {
            console.error('Erro ao excluir professor:', error);
            alert('Erro ao excluir a professor.');
        });
    };


    return(
        <main className={estilos.container}>
            <h3 className={estilos.titulo}> Pofessores </h3>
            <div className={estilos.topoAcoes}>
                {/* botao de adicionar */}
                <Link to="/inicial/cadastrar">
                    <img className={estilos.iconeAdd} src={add} alt="adicionar um professor novo" />
                </Link>
            </div>

            <div className={estilos.tableWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                        <tr>
                            {/* titulo da coluna */}
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
                            {/* Passo para o "param" o id do item que posso editar e excluir */}
                                <Link to={`/inicial/profedit/${professor.id}`}>
                                    <img src={canetinha} className={estilos.icone}/>
                                </Link>
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