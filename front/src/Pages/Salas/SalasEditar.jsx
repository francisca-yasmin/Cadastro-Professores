import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import estilos from '../Cadastrar.module.css'; 
import { useEffect } from 'react';
// imagens que são utilizadas na página
import salas from '../../assets/images/salas.png';
import capacidade from '../../assets/images/capacidade.png';


// Campos que estão no back-end para carregar no formulario
const schemaSalas = z.object({
    nome: z.string()
        .min(1, 'Informe o nome da sala')
        .max(255, 'Máximo de 255 caracteres'),

    capacidade: z.number(
        {invalid_type_error: 'Informe uma capacidade'})
        .int("Digite um valor inteiro")
        .min(1, 'Informe um valor')
        .max(60, 'A capacidade máxima é 60'),
})

export function SalasEditar(){
    const { id } = useParams();
    const navigate = useNavigate();

    const{
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: zodResolver(schemaSalas)
    });

    useEffect(() => {

        // função
        async function carregarSala() {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://127.0.0.1:8000/api/sala/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Preenche os campos do formulário com os dados da sala
            reset(response.data);

        } catch (error) {
            console.error("Erro ao carregar dados da sala", error);
            alert("Erro ao carregar os dados da sala");
        }
    }

    carregarSala();
}, [id, reset]);
 

    // Validar os dados informados
    async function obterDadosFormulario(data) {
        console.log("dados do formulário ", data);

        try{
            const token = localStorage.getItem('access_token');
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/sala/${id}/`,
                data,
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Sala editada com sucesso!', response.data);
            alert('Sala editada com sucesso!');
            reset();
            navigate('/inicial/salas/');
       
        } catch (error) {
              console.error('Erro ao editar sala', error);
              alert("Erro ao editar sala");
        }
    }
       
    return (
        <div className={estilos.container}>
            
            {/* Formulário de preenchimento dos dados da sala */}
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                
                <h2 className={estilos.titulo}>Cadastro de Sala</h2>

                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                        <img src={salas} alt="" />
                    </label>

                    <input type="text" 
                        className={estilos.inputField}
                        {...register('nome')}
                        placeholder="Nome da sala"
                    />
                </div>
                {errors.nome && <p className={estilos.error}> {errors.nome.message}</p>}

                <div className={estilos.campo}>
                    <label className={estilos.icone}>
                        <img src={capacidade} alt="capacidade da sala" />
                    </label>

                    <input type="text"
                        className={estilos.inputField}
                        {...register('capacidade', { valueAsNumber: true })}
                        placeholder="capacidade da sala"
                />
                </div>
                {errors.capacidade && <p className={estilos.error}> {errors.capacidade.message}</p>}

                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Editar sala
                    </button>
                </div>
            </form>
        </div>
    );
}

