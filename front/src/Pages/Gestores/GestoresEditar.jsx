import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import estilos from '../Cadastrar.module.css'; 
import person1 from '../../assets/images/person1.png';
import email from '../../assets/images/email.png';
import telefone from '../../assets/images/telefone.png';
import ni from '../../assets/images/ni.png';
import primeiro_nome from '../../assets/images/primeiro_nome.png';

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

export function GestoresEditar(){
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
           telefone: '',
           nascimento: '',
           data_contratacao: ''
        }
    });

     useEffect(() => {


        async function carregarGestor() {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Preenche os campos do formulário com os dados de professor
            reset(response.data);

        } catch (error) {
            console.error("Erro ao carregar dados do gestor", error);
            alert("Erro ao carregar os dados do gestor");
        }
    }

    carregarGestor();
}, [id, reset]);

    //retornando os dados para API
    async function obterDadosFormulario(data) {
        console.log("Função chamada com dados:", data);
        console.log("Dados do formulario", data);

        try{
            const token = localStorage.getItem('access_token');
            await axios.patch(
                `http://127.0.0.1:8000/api/usuario/${id}/`,
                data,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Gestor editado com sucesso");
            reset();
            navigate('/inicial/gestores/');

        }catch(error){
            console.log("erro", error);
            alert("Erro ao editar");
        }
        
    }

    return(
        <div className={estilos.conteiner}>
            
        <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={estilos.titulo}>Editar Gestor</h2>

                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                        <img src={primeiro_nome} alt="" />
                    </label>

                    <input type="text"
                        className={estilos.inputField}
                        {...register('first_name')}
                        placeholder="Primeiro nome"
                    />
                </div>
                {errors.first_name && <p className={estilos.error}>{errors.first_name.message}</p>}

                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                        <img src={person1} alt="o username do usuario na aplicacao" />
                    </label>

                    <input type="text" 
                        className={estilos.inputField}
                        {...register('username')}
                        placeholder="Nome de usuário"
                    />
                </div>
                {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                        <img src={email} alt="email do usuario" />
                    </label>

                    <input type="email"
                        className={estilos.inputField}
                        {...register('email')}
                        placeholder="Digite seu email"
                    />
                </div>
                {errors.email && <p className={estilos.error}>{errors.email.message}</p>}

                    <input
                        type="hidden"
                        value="P"
                        {...register('tipo')}
                    />

                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                        <img src={ni} alt="ni do gestor" />
                    </label>

                    <input type="number"
                        className={estilos.inputField}
                        {...register('ni', { valueAsNumber: true })}
                        placeholder="Digite o NI"
                    />
                </div>
                    {errors.ni && <p className={estilos.error}>{errors.ni.message}</p>}
                
                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                        <img src={telefone} alt="telefone do gestor" />
                    </label>

                    <input
                        className={estilos.inputField}
                        {...register('telefone')}
                        placeholder="Digite seu telefone"
                    />
                </div>
                {errors.telefone && <p className={estilos.error}>{errors.telefone.message}</p>}

                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                        
                    </label>

                    <input type="date"
                        className={estilos.inputField}
                        {...register('nascimento')}
                    />
                </div>
                {errors.nascimento && <p className={estilos.error}>{errors.nascimento.message}</p>}
                
                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                       
                    </label>

                    <input type="date"
                        className={estilos.inputField}
                        {...register('data_contratacao')}
                    />
                </div>
                {errors.data_contratacao && <p className={estilos.error}>{errors.data_contratacao.message}</p>}
                

                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Editar
                    </button>
                </div>
        </form>
    </div>
    );
}


