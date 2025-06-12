import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
// import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estilos from './Editar.module.css';
import disc from '../assets/images/disc.png'; //nome da disciplina
import curso from '../assets/images/curso.png'; // nome do curso
import carga_horaria from '../assets/images/carga_horaria.png'; // carga horaria
import descricao from '../assets/images/descricao.png'; // descricao
import person1 from '../assets/images/person1.png';
 
const schemaDisciplina = z.object({
    nome: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    curso: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    ch: z.number({
        invalid_type_error: 'Informe a cargahorária'})
        .int("Deve ser um número inteiro")
        .min(1, "A carga horária mínima é 1 hora")
        .max(260, "A carga horária máxima é 260 horas"),
    desc: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(300, 'Informe até 300 caracteres'),
    professor: z.number({
        invalid_type_error: 'Selecione um professor'
                            }).min(1, 'Selecione um professor')
});
 
export function DisciplinaEditar() {
 
    const [professores, setProfessores] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplina)
    });
 
    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
                //Preenche o formulários com os dados do registro do ID
                 const resDisciplina = await axios.get(`http://127.0.0.1:8000/api/disciplinas/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
 
                // Preenche o formulário
                reset(resDisciplina.data);
 
            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }
        }
        buscarProfessores();
    }, []);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.put(
                `http://127.0.0.1:8000/api/disciplinas/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Disciplina cadastrado com sucesso!', response.data);
            alert('Disciplina cadastrado com sucesso!');
            reset();
            navigate('/inicial/disciplina');
 
        } catch (error) {
            console.error('Erro ao cadastrar disciplina', error);
            alert("Erro ao cadastrar disciplina");
        }
    }
 
    return (
        <div className={estilos.conteiner}>
           
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2 className={estilos.titulo}>Editar Disciplina</h2>

                    <div className={estilos.campo}>

                        <label className ={estilos.icone}>
                            <img src={disc} />
                        </label>

                        <input                        
                            className={estilos.inputField}
                            {...register('nome')}
                            placeholder="Materia"
                            />
                    </div>
                    {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
               
                    {/* campo de curso */}
                    <div className={estilos.campo}>

                        <label className ={estilos.icone}>
                            <img src={curso} />
                        </label>

                        <input
                            className={estilos.inputField}
                            {...register('curso')}
                            placeholder="Desenvolvimento de Sistema"
                            />
                    </div>
                    {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
               
                    <div className={estilos.campo}>

                        <label className ={estilos.icone}>
                            <img src={carga_horaria} />
                        </label>

                        <input
                        type="number"
                        
                        className={estilos.inputField}
                        {...register('cargaHoraria', { valueAsNumber: true })}
                        placeholder="75"
                        />
                    </div>
                    {errors.cargaHoraria &&
                    <p className={estilos.error}>
                        {errors.cargaHoraria.message}
                    </p>}
               
                <div className={estilos.campo}>

                     <label className ={estilos.icone}>
                        <img src={descricao} />
                    </label>

                    <textarea
                        className={estilos.inputField}
                        {...register('descricao')}
                        placeholder="Descreva o curso com até 2000 caracteres"
                        rows={5}
                        />
                </div>
                        {errors.descricao && <p className={estilos.error}>{errors.descricao.message}</p>}
                
                <div className={estilos.campo}>
                        <label className={estilos.icone}>
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
               
 
                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Editar
                    </button>
                </div>
            </form>
        </div>
    );
}