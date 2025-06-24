import estilos from './Cabecalho.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Cabecalho(){

    const navigate = useNavigate();

    // Verifica o tipo de usuário para ajustar as rotas do menu
    const tipo = localStorage.getItem('tipo');

    // Verifica qual o tipo de usuário para direcionar a rota
    const linkDisciplina = tipo === 'P' ? 'discprofessor' : 'disciplina'
    const linkAmbiente = tipo === 'P' ? 'ambiprofessor' : 'ambiente'

    // Será usado para mostrar o nome do usuário
    const nome = localStorage.getItem('username')

    // Método para limpar tudo que está no localStorage e fazer logout
    function handleLogout(){
        localStorage.clear();
        navigate('/');
    }

    return(
        <header>
            
            <nav className={estilos.container}>
                <Link to = '/inicial'>
                    
                </Link>
                <ul>

                    <Link to = {linkDisciplina} className={estilos.linkMenu}>
                        <li>Disciplinas</li>
                    </Link>
                    
                    <Link to = {linkAmbiente} className={estilos.linkMenu}>
                        <li>Reservas</li>
                    </Link>

                    {/* Links exclusivos para gestores */}
                    {tipo === 'G' && (
                        <>
                            <Link to = 'professor' className={estilos.linkMenu}>
                                <li>Professores</li>
                            </Link>
                            
                            <Link to = 'gestor' className={estilos.linkMenu}>
                                <li>Gestores</li>
                            </Link>

                            <Link to = 'sala' className={estilos.linkMenu}>
                                <li>Salas</li>
                            </Link>
                            
                        </>
                    )}

                    <li className={estilos.usuarioNome}>Olá, {nome}!</li>

                    {/* Botão para realizar logout */}
                 
                    
                </ul>
            </nav>

        </header>
    );
}