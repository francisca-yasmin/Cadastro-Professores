import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ca } from 'zod/v4/locales';

const schemaDisciplina = z.object({
    nome: z.string()
        .min(1, 'Informe um nome')
        .max(100, 'Informe no maximo 100 caracteres'),

    curso: z.string()
        .min(1, 'Informe o curso')
        .max(100, 'Informe no maximo 100 caracteres'),

    ch: z.ZodNumber(
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
                'http:/127.0.0.1:8000/api/disciplinas',
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
}

