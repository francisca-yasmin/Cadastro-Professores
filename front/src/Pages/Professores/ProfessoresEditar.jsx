// importa hooks e libs para formulário, validação e navegação
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import estilos from '../Cadastrar.module.css'; 

// importa ícones para os campos do formulário
import person1 from '../../assets/images/person1.png';
import email from '../../assets/images/email.png';
import telefone from '../../assets/images/telefone.png';
import ni from '../../assets/images/ni.png';
import primeiro_nome from '../../assets/images/primeiro_nome.png';

// regex para validar datas no formato yyyy-mm-dd
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// esquema de validação com zod
const schemaProfessor = z.object({
    username: z.string()
        .min(1, ' informe o nome do usuário')
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

// componente para editar os dados do professor
export function ProfessoresEditar(){
    const { id } = useParams(); // pega o id da url
    const navigate = useNavigate(); // redireciona após editar

    // configurações do react-hook-form
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

    // carrega os dados do professor ao abrir a página
    useEffect(() => {
        async function carregarProfessor() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // preenche o formulário com os dados carregados
                reset(response.data);

            } catch (error) {
                console.error("erro ao carregar dados do professor", error);
                alert("erro ao carregar os dados do professor");
            }
        }

        carregarProfessor();
    }, [id, reset]);

    // envia os dados editados para a api
    async function obterDadosFormulario(data) {
        console.log("função chamada com dados:", data);

        try{
            const token = localStorage.getItem('access_token');
            await axios.patch(
                `http://127.0.0.1:8000/api/usuario/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("professor editado com sucesso");
            reset();
            navigate('/inicial/professor/');

        }catch(error){
            console.log("erro", error);
            alert("erro ao editar");
        }
    }

    // estrutura do formulário
    return(
        <div className={estilos.conteiner}>
        <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
            <h2 className={estilos.titulo}>Editar Professor</h2>

            {/* campo de primeiro nome */}
            <div className={estilos.campo}>
                <label className={estilos.icone}>
                    <img src={primeiro_nome} alt="" />
                </label>
                <input type="text" className={estilos.inputField} {...register('first_name')} placeholder="Primeiro nome" />
            </div>
            {errors.first_name && <p className={estilos.error}>{errors.first_name.message}</p>}

            {/* campo de username */}
            <div className={estilos.campo}>
                <label className={estilos.icone}>
                    <img src={person1} alt="o username do usuario na aplicacao" />
                </label>
                <input type="text" className={estilos.inputField} {...register('username')} placeholder="Nome de usuário" />
            </div>
            {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

            {/* campo de email */}
            <div className={estilos.campo}>
                <label className={estilos.icone}>
                    <img src={email} alt="email do usuario" />
                </label>
                <input type="email" className={estilos.inputField} {...register('email')} placeholder="Digite seu email" />
            </div>
            {errors.email && <p className={estilos.error}>{errors.email.message}</p>}

            {/* tipo é oculto e fixo como "P" */}
            <input type="hidden" value="P" {...register('tipo')} />

            {/* campo de ni */}
            <div className={estilos.campo}>
                <label className={estilos.icone}>
                    <img src={ni} alt="ni do professor" />
                </label>
                <input type="number" className={estilos.inputField} {...register('ni', { valueAsNumber: true })} placeholder="Digite o NI" />
            </div>
            {errors.ni && <p className={estilos.error}>{errors.ni.message}</p>}

            {/* campo de telefone */}
            <div className={estilos.campo}>
                <label className={estilos.icone}>
                    <img src={telefone} alt="telefone do professor" />
                </label>
                <input className={estilos.inputField} {...register('telefone')} placeholder="Digite seu telefone" />
            </div>
            {errors.telefone && <p className={estilos.error}>{errors.telefone.message}</p>}

            {/* campo de nascimento */}
            <p className={estilos.data}>Data de Nascimento</p>
            <div className={estilos.campo}>
                <input type="date" className={estilos.inputField} {...register('nascimento')} />
            </div>
            {errors.nascimento && <p className={estilos.error}>{errors.nascimento.message}</p>}

            {/* campo de contratação */}
            <p className={estilos.data}>Data de Contratação</p>
            <div className={estilos.campo}>
                <input type="date" className={estilos.inputField} {...register('data_contratacao')} />
            </div>
            {errors.data_contratacao && <p className={estilos.error}>{errors.data_contratacao.message}</p>}

            {/* botão de envio */}
            <div className={estilos.icones}>
                <button className={estilos.submitButton} type="submit">Editar</button>
            </div>
        </form>
    </div>
    );
}
