import estilos from './BarraNavegacao.module.css'

export function BarraNavegacao(){
    return(
        <nav className={estilos.conteiner}>
            <ul>
                <li>Home</li>
                <li>Professores</li>
                <li>Disciplinas</li>
                <li>Reservas de Ambiente</li>
            </ul>
        </nav>

    )

}