import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import estilos from '../Pages/Cadastrar.module.css'; 
import person1 from '../assets/images/person1.png';
import disc from '../assets/images/disc.png'; //nome da disciplina
import curso from '../assets/images/curso.png'; // nome do curso
import carga_horaria from '../assets/images/carga_horaria.png'; // carga horaria
import descricao from '../assets/images/descricao.png'; // descricao

const schemaDisciplina = z.object({
    nome: z.string()
        .min(1, 'Informe um nome')
        .max(100, 'Informe no maximo 100 caracteres'),

    curso: z.string()
        .min(1, 'Informe o curso')
        .max(100, 'Informe no maximo 100 caracteres'),

    ch: z.number(
        {invalid_type_error: 'Informe a carga horaria do curso.'})
        .int("Digite um valor inteiro por favor")
        .min(1, 'Informe um valor')
        .max(200, 'A carga horaria maxima é de 200 horas'),

    desc: z.string()
        .min(1, 'Informe a descrição da disciplina')
        .max(255, 'Informe o maximo de 255 caracteres na descrição'),

    professor: z.number(
        {invalid_type_error: 'Selecione um professor'})
            .min(1, 'Selecione um professor')

});

export function DisciplinaCadastrar(){
    const [professores, setProfessores] = useState([]);
    const navigate = useNavigate();

    //fazer valer o zod
    const{
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm ({
        resolver: zodResolver(schemaDisciplina)
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
        buscarProfessores(); //chamando minha função para chamar professores
    }, [])

    //retornando os dados para API
    async function obterDadosFormulario(data) {
        console.log("Dados do formulario", data);

        try{
            const token = localStorage.getItem('access_token');
            const  response = await axios.post(
                'http://127.0.0.1:8000/api/disciplinas/',
                data,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Disciplina cadastrada com sucesso");
            reset();
            navigate('/inicial/disciplina/') // voltar para a tela de listar disciplinas

        }catch(error){
            console.log("erro", error)
            alert("Erro ao cadastrar")
        }
        
    }

    return(
        <div className={estilos.conteiner}>
            
        <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={estilos.titulo}>Cadastro de Disciplina</h2>

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
            

                <div className={estilos.campo}>
                    <label className ={estilos.icone}>
                        <img src={curso} />
                    </label>
                    <input
                        className={estilos.inputField}
                        {...register('curso')}
                        placeholder="Curso"
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
                    {...register('ch', { valueAsNumber: true })}
                    placeholder="75"
                    />
                </div>
                {errors.cargaHoraria &&
                <p className={estilos.error}>
                    {errors.ch.message}
                </p>}
            
                <div className={estilos.campo}>

                <label className ={estilos.icone}>
                    <img src={descricao} />
                </label>

                <textarea
                    className={estilos.inputField}
                    {...register('desc')}
                    placeholder="Descreva o curso com até 2000 caracteres"
                    rows={5}
                    />
                </div>
                {errors.desc && <p className={estilos.error}>{errors.desc.message}</p>}
            
                <div className={estilos.campo}>

                    {/* icone que vai dentro do input pro usuario digitar */}
                    <label className ={estilos.icone}>
                        <img src={person1} />
                    </label>

                    <select className={estilos.inputField}
                    {...register('professor', { valueAsNumber: true })}>
                        <option>Selecione um professor</option>
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
                    Cadastrar
                </button>
            </div>
        </form>
    </div>
    );
}

