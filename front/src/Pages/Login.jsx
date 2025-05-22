import axios from 'axios'; //requisições http
//as 3 bibliotecas faz a validação do form, um depende do outro
import { useForm } from 'react-hook-form'; //validação daquilo que foi importado -> antes de mandar pro back
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import estilos from './Login.module.css';

const schemaLogin = z.object({
    username: z.string
    .min(1, 'informe o seu usuário') //minimo do tamanho da entrada do usuario
    .max(255, 'Informe no maximo 30 caracteres'), //maximo de tamanho

    password: z.string
    .min(1, 'Informe ao menos um caracter')
    .max(15, 'Informe no maximo 15 caracteres')
})

export function Login(){
    //registra as (todas) informações que são dadas pelo user e tenta resover de acordo com os shema
    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm(
        {resolver: zodResolver(schemaLogin)}
    ); //fim do useForm
    async function ObterDados(data) {
        console.log(`Dados ${data}`)

        try{
            const response = await axios.post('http://127.0.0.1.8000/api/login/', {
                username: data.username,
                password: data.password
            });

            //quando eu baater nessa porta, vou querer de retorno essas três respostas
            const {access, refresh, user} = response.data;

            localStorage.setitem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            localStorage.setItem('tipo', user.tipo) //tipo: gestor ou professor
            localStorage.setItem('username', username) //nome do professor

            console.log("login efetuado com sucesso")
        } catch(error){
            console.error('deu ruim', error);
            alert("dados invalidos")
        }

    return(
        <div className={estilos.conteiner}> 
            <form onSubmit={handleSubmit(ObterDados)} className={estilos.loginForm}>
                <h2 className={estilos.titulo}>Login</h2>

                <label className={estilos.label}> Usuário</label>
                <input className={estilos.inputField}
                {...register('username')} //registrar o nome do usuario
                placeholder='francisca yasmin'
                />
                {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

                <label className={estilos.label}>Senha:</label>
                <input
                    {...register('password')} //registrando a senha do usuário e checando 
                    placeholder='senha'
                    type="password"
                />
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>} {/*mensagem de erro caso dê errado a autenticação*/}

                <button type='submit' className={estilos.submitButton}>Login</button>

            </form>
        </div>
    )
    }//fim do async function
}