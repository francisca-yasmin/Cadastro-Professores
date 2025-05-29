import axios from 'axios'; //requisições http
import { useNavigate } from 'react-router-dom'; //direciona o user para outra página
import estilos from './Login.module.css';
//as 3 bibliotecas faz a validação do form, um depende do outro
import { useForm } from "react-hook-form"; //validação daquilo que foi importado -> antes de mandar pro back
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import professor from '.././assets/professor.svg';
import senha from '.././assets/senha.svg';
import pixell from '.././assets/pixell.png';
 
const schemaLogin = z.object({
    username: z.string()
        .min(1, 'Informe um nome')
        .max(25, 'Informe no máximo 25 caracteres'),
    password: z.string()
        .min(1, 'Informe uma senha')
        .max(15, 'Informe no máximo 15 caracteres')
});
 
export function Login() {
    const navigate = useNavigate(); //quero que seja direcionado para algum lugar
 
    const {
        //registra as (todas) informações que são dadas pelo user e tenta resover de acordo com os schema
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    });
 
    async function obterDadosFormulario(data) {
        console.log(`Dados: ${data}`)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: data.username,
                password: data.password
            });
 
             //quando eu bater nessa porta, vou querer de retorno essas três respostas
            const { access, refresh, user } = response.data;
 
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('tipo', user.tipo);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('username', user.username); //nome do professor
 
            console.log('Login bem-sucedido!');          
            navigate('/inicial');
         
 
        } catch (error) {
            console.error('Erro de autenticação', error);
            alert("Dados Inválidos, por favor verifique suas credenciais");
        }
    }
 
    return (
        <div className={estilos.conteiner}>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.loginForm}>
                <img src={pixell} />
                <h1 className={estilos.titulo}> Login </h1>
                <img src={professor} />
                <input
                    {...register('username')}
                    placeholder='francisca yasmin'
                    className={estilos.inputField}
                />
                {errors.username && <p className={estilos.error}>{errors.username.message}</p>}
 
                <img src={senha} />
                <input
                    {...register('password')}  //registrando a senha do usuário e checando 
                    placeholder='Senha'
                    type="password"
                    className={estilos.inputField}
                />
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>} {/*mensagem de erro caso dê errado a autenticação*/}
                
                <div className={estilos.botao}>
                    <button type="submit" className={estilos.submitButton}>Entrar</button>
                </div>
            </form>
        </div>
    );
}
 
 