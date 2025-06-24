import axios from 'axios';
import React, {useState, useEffect} from 'react'; 
import estilos from '../Visualizar.module.css'; 

// componente que mostra as reservas do professor
export function AmbienteProfessor(){

    // estados para armazenar dados da api
    const [ambientes, setAmbientes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [salas, setSalas] = useState([]);
    
    // carrega os dados ao abrir a tela
    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        // busca as reservas do professor
        axios.get('http://127.0.0.1:8000/api/professor/ambiente/', {
            headers:{ 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            setAmbientes(response.data);
        })
        .catch(error => {
            console.error("erro", error);
        });

        // busca todas as salas
        axios.get('http://127.0.0.1:8000/api/sala/', {
            headers:{ 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            const salaPorId = {};
            response.data.forEach(sala => {
                salaPorId[sala.id] = `${sala.nome}`;
            });
            setSalas(salaPorId);
        })
        .catch(error => {
            console.error("erro ao buscar a sala", error);
        });

        // busca todas as disciplinas
        axios.get('http://127.0.0.1:8000/api/disciplinas/', {
            headers:{ 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            const disciplinaPorId = {};
            response.data.forEach(disciplina => {
                disciplinaPorId[disciplina.id] = `${disciplina.nome}`;
            });
            setDisciplinas(disciplinaPorId);
        })
        .catch(error => {
            console.error("erro ao buscar a disciplina", error);
        });

    }, []);
    
    // interface visual da página
    return(
        <div className={estilos.conteinerCard}>
            <h2 className={estilos.tituloCard}>Minhas Reservas</h2>

            <div className={estilos.listaCard}>
                {/* percorre as reservas e exibe os dados */}
                {ambientes.map(ambiente => (
                    <div className={estilos.card} key={ambiente.id}>
                        <h3 className={estilos.nome}>{salas[ambiente.reserva]}</h3>
                        <p><strong>Data início: </strong>{ambiente.dt_inicio}</p>
                        <p><strong>Data término: </strong>{ambiente.dt_termino}</p>
                        <p><strong>Período: </strong>{ambiente.periodo}</p>
                        <p><strong>Disciplina: </strong>{disciplinas[ambiente.disciplina]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
