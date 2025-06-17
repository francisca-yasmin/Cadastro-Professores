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

const schemaProfessor = z.object({
    username: z.string()
        .min(1, ' Informe o nome do usuário')
        .max(150, 'Informe no maximo 150 caracteres'),

    first_name: z.string()
        .min(1, 'Informe o primeiro nome')
        .max(150, 'Informe no maximo 150 caracteres'),
    
    email: z.string()
        .email('Email inválido'),

    tipo: z.enum(['G', 'P'], {
        required_error: 'Informe o tipo de usuário',
        invalid_type_error: 'Tipo inválido',
    }),

    ni: z.number({
        required_error: 'Informe o NI',
        invalid_type_error: 'O NI deve ser um número',
    })
    .int('O NI deve ser um número inteiro'),

    telefone: z.string()
        .min(8, 'Informe um número válido')
        .max(20, 'Informe no maximo 20 caracteres')
        .nullable()
        .optional(),
    
        nascimento: z.string()
        .regex(dateRegex, 'Data de nascimento deve estar no formato YYYY-MM-DD'),

    data_contratacao: z.string()
        .regex(dateRegex, 'Data de contratação deve estar no formato YYYY-MM-DD'),
});

export function ProfessoresEditar(){
    const { id } = useParams();
    const navigate = useNavigate();

   
    //fazer valer o zod
    const{
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm ({
        resolver: zodResolver(schemaProfessor),
        defaultValues: {
           ni: 0,
           telefone: 0,
           nascimento: '',
           data_contratacao: ''
        }
    });

    //retornando os dados para API
    async function obterDadosFormulario(data) {
        console.log("Dados do formulario", data);

        try{
            const token = localStorage.getItem('access_token');
            await axios.put(
                `http://127.0.0.1:8000/api/usuario/${id}/`,
                data,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Professor editado com sucesso");
            reset();
            navigate('/inicial/usuario/');

        }catch(error){
            console.log("erro", error)
            alert("Erro ao cadastrar professor")
        }
        
    }

    return(
        <div className={estilos.conteiner}>
            
        <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={estilos.titulo}>Editar Professor</h2>

                      <label className ={estilos.nomeCampo}>Primeiro nome:</label>
                <input
                    className={estilos.inputField}
                    {...register('first_name')}
                    placeholder="Primeiro nome"
                />
                {errors.first_name && 
                <p className={estilos.error}>
                    {errors.first_name.message}
                </p>}

                <label className ={estilos.nomeCampo}>Último nome:</label>
                <input
                    className={estilos.inputField}
                    {...register('last_name')}
                    placeholder="Último nome"
                />
                {errors.last_name && 
                <p className={estilos.error}>
                    {errors.last_name.message}
                </p>}

                
                <label className={estilos.nomeCampo}>Nome de usuário:</label>
                <input
                    className={estilos.inputField}
                    {...register('username')}
                    placeholder="Nome de usuário"
                />
                {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

                <label className={estilos.nomeCampo}>Email:</label>
                <input
                    className={estilos.inputField}
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                />
                {errors.email && <p className={estilos.error}>{errors.email.message}</p>}

                <input
                    type="hidden"
                    value="P"
                    {...register('tipo')}
                />

                <label className={estilos.nomeCampo}>NI:</label>
                <input
                    className={estilos.inputField}
                    type="number"
                    {...register('ni', { valueAsNumber: true })}
                    placeholder="Número de Identificação"
                />
                {errors.ni && <p className={estilos.error}>{errors.ni.message}</p>}

                <label className={estilos.nomeCampo}>Telefone:</label>
                <input
                    className={estilos.inputField}
                    {...register('telefone')}
                    placeholder="Telefone"
                />
                {errors.telefone && <p className={estilos.error}>{errors.telefone.message}</p>}

                <label className={estilos.nomeCampo}>Data de nascimento:</label>
                <input
                    className={estilos.inputField}
                    type="date"
                    {...register('data_nascimento')}
                />
                {errors.data_nascimento && <p className={estilos.error}>{errors.data_nascimento.message}</p>}

                <label className={estilos.nomeCampo}>Data de contratação:</label>
                <input
                    className={estilos.inputField}
                    type="date"
                    {...register('data_contratacao')}
                />
                {errors.data_contratacao && <p className={estilos.error}>{errors.data_contratacao.message}</p>}
            

            <div>
                <button className={estilos.submitButton} type="submit">
                    Editar
                </button>
            </div>
        </form>
    </div>
    );
}


