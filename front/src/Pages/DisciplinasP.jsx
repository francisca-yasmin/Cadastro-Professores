import axios, { Axios } from "axios"; //axios permite que eu chame minha api do back(pagina hhtp(s))
import React, { useState, useEffect } from "react"; //useState permite que eu crie um estado e o useEffect permite que eu execute uma função quando o componente for renderizado
import estilos from './Visualizar.module.css';

export function DisciplinaP(){
    //crio uma variavel disciplina que recebe os dados da api, e é controlado pelo state
    const[disciplinas, setDisciplina] = useState([]);

    //()paramentros, {}scrips, []dependencias
    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        //chama o endereço da api que eu quero consumir
        axios.get('http://127.0.0.1:8000/api/professor/disciplinas/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        //deu certo -> se der certo vai acontecer isso (if e else)
        .then(response =>{
            setDisciplina(response.data);
        })
        // deu errado -> mostra o erro para o ususario
        .catch(error =>{
            console.log("Erro", error);
        });

    },[]);

    //visão do professor
    return (
        <div className={estilos.conteinerCard}>
            <h2 className={estilos.tituloCard}> Minhas Disciplinas</h2>

            <div className={estilos.listaCard}>
                {disciplinas.map(disciplina => (
                    <div className={estilos.card} key={disciplina.id}>
                        <h3 className={estilos.nome}>{disciplina.nome}</h3>
                        {/* nome dos campos seguindo os nomes do banco de dados da minha api (models) */}
                        <p><strong>Curso:</strong>{disciplina.curso}</p>
                        <p><strong>Descrição:</strong>{disciplina.desc}</p>
                        <p><strong>Carga Horária:</strong>{disciplina.ch}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}