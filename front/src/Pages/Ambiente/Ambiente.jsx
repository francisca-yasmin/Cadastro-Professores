import axios from "axios"; //bater numa url do back
import React, {useState, useEffect} from 'react';
import add from '../../assets/images/add.png';
import canetinha from '../../assets/images/canetinha.png';
import del from '../../assets/images/del.png';
import estilos from '../Visualizar.module.css';
import { Link } from "react-router-dom";


export function Ambiente(){
  const [ambientes, setAmbientes] = React.useState([]);
  const [salas, setSalas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');


    // buscando a reserva
    axios.get('http://127.0.0.1:8000/api/ambiente/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      setAmbientes(response.data);
    })
    .catch(error => {
      console.error("Erro ao buscar ambientes:", error);
    });

    // Buscar professores
    axios.get('http://127.0.0.1:8000/api/usuario/professor/', {
      headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => {
      const professorPorId = {};
      response.data.forEach(prof => {
          professorPorId[prof.id] = `${prof.first_name}`;
      });
      setProfessores(professorPorId);
  })
  .catch(error => console.error("Erro ao buscar o professor ", error));

  // Buscar salas
  axios.get('http://127.0.0.1:8000/api/sala/', {
      headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => {
      const salaPorId = {};
      response.data.forEach(sala => {
          salaPorId[sala.id] = `${sala.nome}`;
      });
      setSalas(salaPorId);
  })
  .catch(error => console.error("Erro ao buscar a sala ", error));

  // Buscar disciplinas
  axios.get('http://127.0.0.1:8000/api/disciplinas/', {
      headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => {
      const disciplinaPorId = {};
      response.data.forEach(disciplina => {
          disciplinaPorId[disciplina.id] = `${disciplina.nome}`;
      });
      setDisciplinas(disciplinaPorId);
  })
  .catch(error => console.error("Erro ao buscar a disciplina ", error));


    
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
                                <td>{disciplinas[ambiente.disciplina]}</td>
                                <td>{salas[ambiente.reserva]}</td>
                                <td>{professores[ambiente.professor]}</td>

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