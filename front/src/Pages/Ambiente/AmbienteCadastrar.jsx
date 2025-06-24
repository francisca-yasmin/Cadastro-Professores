// importa bibliotecas e recursos necessários
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import estilos from '../Cadastrar.module.css'; 
import person1 from '../../assets/images/person1.png';
import periodo from '../../assets/images/periodo.png';
import disc from '../../assets/images/disc.png';
import sala from '../../assets/images/salas.png';
import { useNavigate } from 'react-router-dom';

// regex para validar datas
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// esquema de validação com zod
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
  // verifica se a data de término é posterior à de início
  const inicio = new Date(data.dt_inicio);
  const fim = new Date(data.dt_termino);
  return inicio <= fim;
}, {
    message: 'A data de término deve ser posterior à de início'
});

export function AmbienteCadastrar(){
    const [professores, setProfessores] = useState([]); // armazena os professores
    const [disciplinas, setDisciplinas] = useState([]); // armazena as disciplinas
    const [salas, setSalas] = useState([]); // armazena as salas
    const navigate = useNavigate(); // para redirecionamento

    // conecta o react-hook-form com o zod
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaAmbiente)
    });

    // busca os dados assim que o componente monta
    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/professor/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProfessores(response.data);
            } catch(error) {
                console.error("erro", error);
            }
        }

        async function buscarDisciplinas() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/disciplinas/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setDisciplinas(response.data);
            } catch(error) {
                console.error("erro", error);
            }
        }

        async function buscarSalas() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sala/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setSalas(response.data);
            } catch(error) {
                console.error("erro", error);
            }
        }

        // executa as funções
        buscarProfessores();
        buscarDisciplinas();
        buscarSalas();
    }, [])

    // envia os dados preenchidos para a API
    async function obterDadosFormulario(data) {
        console.log("Dados do formulario", data);

        try {
            console.log("Dados enviados:", data);
            const token = localStorage.getItem('access_token');

            await axios.post('http://127.0.0.1:8000/api/ambiente/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert("Ambiente cadastrado com sucesso");
            reset(); // limpa os campos
            navigate('/inicial/ambiente/'); // redireciona

        } catch(error) {
            console.log("erro", error);
            alert("Erro ao cadastrar");
        }
    }

    return (
        <div className={estilos.conteiner}>
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={estilos.titulo}>Cadastro de Ambiente</h2>

                {/* data de início */}
                <div className={estilos.campo}>
                    <label className={estilos.icone}></label>
                    <input className={estilos.inputField} {...register('dt_inicio')} type='date' />
                </div>
                {errors.nome && <p className={estilos.error}>{errors.dt_inicio?.message}</p>}

                {/* data de término */}
                <div className={estilos.campo}>
                    <label className={estilos.icone}></label>
                    <input className={estilos.inputField} {...register('dt_termino')} type='date' />
                </div>
                {errors.nome && <p className={estilos.error}>{errors.dt_termino?.message}</p>}

                {/* período */}
                <div className={estilos.campo}>
                    <label className={estilos.icone}><img src={periodo} /></label>
                    <select className={estilos.inputField} {...register('periodo')}>
                        <option value="">Selecione o período</option>
                        <option value="M">Manhã</option>
                        <option value="T">Tarde</option>
                        <option value="N">Noite</option>
                    </select>
                </div>
                {errors.periodo && <p className={estilos.error}>{errors.periodo.message}</p>}

                {/* disciplina */}
                <div className={estilos.campo}>
                    <label className={estilos.icone}><img src={disc} /></label>
                    <select className={estilos.inputField} {...register('disciplina', { valueAsNumber: true })}>
                        <option value="">Selecione uma disciplina</option>
                        {disciplinas.map((disc) => (
                            <option key={disc.id} value={disc.id}>{disc.nome}</option>
                        ))}
                    </select>
                </div>
                {errors.disciplina && <p className={estilos.error}>{errors.disciplina.message}</p>}

                {/* sala */}
                <div className={estilos.campo}>
                    <label className={estilos.icone}><img src={sala} /></label>
                    <select className={estilos.inputField} {...register('reserva', { valueAsNumber: true })}>
                        <option value="">Selecione uma sala</option>
                        {salas.map((sala) => (
                            <option key={sala.id} value={sala.id}>{sala.nome}</option>
                        ))}
                    </select>
                </div>
                {errors.reserva && <p className={estilos.error}>{errors.reserva.message}</p>}

                {/* professor */}
                <div className={estilos.campo}>
                    <label className={estilos.icone}><img src={person1} /></label>
                    <select className={estilos.inputField} {...register('professor', { valueAsNumber: true })}>
                        <option value="">Selecione um professor</option>
                        {professores.map((prof) => (
                            <option key={prof.id} value={prof.id}>
                                {prof.first_name} {prof.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}

                {/* botão de submit */}
                {errors?.root && (<p className={estilos.error}>{errors.root.message}</p>)}
                <div>
                    <button className={estilos.submitButton} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}
