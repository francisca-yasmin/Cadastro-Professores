import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import estilos from './Cadastrar.module.css'; 

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
        console.log("dados do formulario", data);

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
            alert("disciplina cadastrada com sucesso");
            reset();
        }catch(error){
            console.log("erro", error)
            alert("Erro ao cadastrar")
        }
        
    }

    return(
        <div className={estilos.conteiner}>
            
        <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={estilos.titulo}>Cadastro de Disciplina</h2>
                <label className ={estilos.nomeCampo} >Nome da Disciplina</label>
                <input                        
                    className={estilos.inputField}
                    {...register('nome')}
                    placeholder="Materia"
                />
                {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
            

                <label className ={estilos.nomeCampo}>Nome do curso</label>
                <input
                    className={estilos.inputField}
                    {...register('curso')}
                    placeholder="Desenvolvimento de Sistema"
                />
                {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
            

                <label className ={estilos.nomeCampo}>Carga horária</label>
                <input
                type="number"

                    className={estilos.inputField}
                    {...register('ch', { valueAsNumber: true })}
                    placeholder="75"
                />
                {errors.cargaHoraria &&
                <p className={estilos.error}>
                    {errors.ch.message}
                </p>}
            

            <label className ={estilos.nomeCampo}>Descrição</label>
            <textarea
                className={estilos.inputField}
                {...register('desc')}
                placeholder="Descreva o curso com até 2000 caracteres"
                rows={5}
                />
                {errors.desc && <p className={estilos.error}>{errors.desc.message}</p>}
            
                <label className ={estilos.nomeCampo}>Professor</label>
                <select className={estilos.inputField}
                {...register('professor', { valueAsNumber: true })}>
                    <option  value="">Selecione um professor</option>
                    {professores.map((prof) => (
                        <option className={estilos.inputField} key={prof.id} value={prof.id}>
                            {prof.first_name} {prof.last_name}
                        </option>
                    ))}
                </select>
                {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
            

            <div className={estilos.icones}>
                <button className={estilos.submitButton} type="submit">
                    Cadastrar
                </button>
            </div>
        </form>
    </div>
    );
}

