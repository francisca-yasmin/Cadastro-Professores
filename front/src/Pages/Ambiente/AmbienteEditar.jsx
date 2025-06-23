import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import estilos from '../Cadastrar.module.css'; 
import person1 from '../../assets/images/person1.png';
import periodo from '../../assets/images/periodo.png';
import disc from '../../assets/images/disc.png';
import sala from '../../assets/images/salas.png';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const schemaAmbiente = z.object({
  dt_inicio: z.string()
    .regex(dateRegex, 'Data de início deve estar no formato YYYY-MM-DD'),

  dt_termino: z.string()
    .regex(dateRegex, 'Data de término deve estar no formato YYYY-MM-DD'),

  periodo: z.string()
    .min(1, 'Informe um periodo')
    .max(10, 'Informe no maximo 10 caracteres'),

    disciplina: z.number({
        invalid_type_error: 'Selecione uma disciplina'})
    .min(1, 'Selecione uma disciplina'),

  reserva: z.number({
        invalid_type_error: 'Selecione uma sala'})
    .min(1, 'Selecione uma sala'),

  professor: z.number({
      invalid_type_error: 'Selecione um professor válido'
    })
    .min(1, 'Selecione um professor')
    }).refine((data) => {

  const inicio = new Date(data.dt_inicio);
  const fim = new Date(data.dt_termino);
  return inicio <= fim;

}, {
    message: 'A data de término deve ser posterior à de início'
});

export function AmbienteEditar(){
    const [professores, setProfessores] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const { id } = useParams();
    const [salas, setSalas] = useState([]);
    const navigate = useNavigate();

   
    //fazer valer o zod
    const{
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm ({
        resolver: zodResolver(schemaAmbiente),
        defaultValues: {
           dt_inicio: '',
           dt_termino: '',
           periodo: '',
           disciplina: 0,
           reserva: 0,
           professor: 0
        }
    });

    useEffect(() => {
        async function buscarProfessores() {
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                //se der certo
                setProfessores(response.data);

            }catch(error){
                console.error("erro", error);
            }
        }

            async function buscarDisciplinas() {
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/disciplinas/', {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                //se der certo
                setDisciplinas(response.data);

            }catch(error){
                console.error("erro", error);
            }
        }

            async function buscarSalas() {
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sala/', {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                //se der certo
                setSalas(response.data);

            }catch(error){
                console.error("erro", error);
            }
        }

        async function buscarAmbiente() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://127.0.0.1:8000/api/ambiente/${id}/`, {
                    headers: {
                         'Authorization': `Bearer ${token}`
                    }
                })
                //popularizando meu form com os dados que vieram da minha API
                reset({
                    dt_inicio: response.data.dt_inicio,
                    dt_termino: response.data.dt_termino,
                    periodo: response.data.periodo,
                    disciplina: response.data.disciplina?.id ?? 0,
                    reserva: response.data.reserva ?? 0, //reserva já é um numero
                    professor: response.data.professor?.id ?? 0
            });
            }catch(error){
                console.log("Erro ao buscar os dados do Ambiente", error);
            }
            
        }

        buscarProfessores(); //chamando minha função para chamar buscar professores
        buscarDisciplinas(); //chamando minha função para chamar buscar disciplinas
        buscarSalas(); //chamando minha função para chamar buscar salas
        buscarAmbiente(); //chamando a função para buscar por ambiente na API
    }, [])

    //retornando os dados para API
    async function obterDadosFormulario(data) {
        console.log("Dados do formulario", data);

        try{
            const token = localStorage.getItem('access_token');
            await axios.put(
                `http://127.0.0.1:8000/api/ambiente/${id}/`,
                data,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Ambiente editado com sucesso");
            reset();
            navigate('/inicial/ambiente/');

        }catch(error){
            console.log("erro", error)
            alert("Erro ao editar")
        }
        
    }

    return(
        <div className={estilos.conteiner}>
            
        <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={estilos.titulo}>Editar Ambiente</h2>

                <div className={estilos.campo}>
                    <label className ={estilos.icone}>
                        
                    </label>

                    <input                        
                        className={estilos.inputField}
                        {...register('dt_inicio')}
                        type='date'
                        />
                </div>

                {errors.dt_inicio && <p className={estilos.error}>{errors.dt_inicio.message}</p>}
            
                <div className={estilos.campo}>
                    <label className ={estilos.icone}>
                        
                    </label>

                    <input                        
                        className={estilos.inputField}
                        {...register('dt_termino')}
                        type='date'
                        />
                </div>

                {errors.dt_termino && <p className={estilos.error}>{errors.dt_termino.message}</p>}


                {/* Período */}
                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                        <img src={periodo} />
                    </label>
                  <select className={estilos.inputField}
                        {...register('periodo')}
                        >
                            <option value="">Selecione o período</option>
                            <option value="M">Manhã</option>
                            <option value="T">Tarde</option>
                            <option value="N">Noite</option>
                    </select>
                </div>
                {errors.periodo && <p className={estilos.error}>{errors.periodo.message}</p>}
            
                <div className={estilos.campo}>
                    {/* icone que vai dentro do input pro usuario digitar */}
                    <label className ={estilos.icone}>
                        <img src={disc} />
                    </label>

                    <select className={estilos.inputField}
                    {...register('disciplina', { valueAsNumber: true })}>
                        <option  value="">Selecione uma disciplina</option>
                        {disciplinas.map((disc) => (
                            <option className={estilos.inputField} key={disc.id} value={disc.id}>
                                {disc.nome} 
                            </option>
                        ))}
                    </select>
                </div>
                {errors.disciplina && <p className={estilos.error}>{errors.disciplina.message}</p>}

                {/* SALA */}
                <div className={estilos.campo}>

                    {/* icone que vai dentro do input pro usuario digitar */}
                    <label className ={estilos.icone}>
                        <img src={sala} />
                    </label>

                    <select className={estilos.inputField}
                    {...register('reserva', { valueAsNumber: true })}>
                        <option  value="">Selecione uma sala</option>
                        {salas.map((sala) => (
                            <option className={estilos.inputField} key={sala.id} value={sala.id}>
                                {sala.nome}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.reserva && <p className={estilos.error}>{errors.reserva.message}</p>}
            
            
                <div className={estilos.campo}>

                    {/* icone que vai dentro do input pro usuario digitar */}
                    <label className ={estilos.icone}>
                        <img src={person1} />
                    </label>

                    <select className={estilos.inputField}
                    {...register('professor', { valueAsNumber: true })}>
                        <option  value="">Selecione um professor</option>
                        {professores.map((prof) => (
                            <option className={estilos.inputField} key={prof.id} value={prof.id}>
                                {prof.first_name} {prof.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
            

            <div>
                <button className={estilos.submitButton} type="submit">
                    Editar
                </button>
            </div>
        </form>
    </div>
    );
}


