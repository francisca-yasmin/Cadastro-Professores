import axios from 'axios';
import React, {useState, useEffect} from 'react'; 
import estilos from '../Visualizar.module.css'; 

// Componente que mostra as reservas do professor

export function AmbienteProfessor(){

    // Estados para armazenar dados da API
    const [ambientes, setAmbientes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [salas, setSalas] = useState([]);
    
    // Carregamento dos dados ao abrir a tela
    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        // Buscar reservas do professor
        axios.get('http://127.0.0.1:8000/api/professor/ambiente/', {
            headers:{ 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            setAmbientes(response.data);
        })
        .catch(error => {
            console.error("Erro", error);
        });

        // Buscar salas
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
            console.error("Erro ao buscar a sala ", error);
        });

        // Buscar disciplinas
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
            console.error("Erro ao buscar a disciplina ", error);
        });

    }, []);
    
    
    // Interface visual
    return(
        <div className={estilos.containerCard}>
            <h2 className={estilos.tituloCard}>Minhas Reservas</h2>

            <div className={estilos.listaCard}>
                {/* Percorre as reservas e exibe os dados */}
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