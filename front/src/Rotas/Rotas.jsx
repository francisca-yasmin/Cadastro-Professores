
import {Routes, Route} from 'react-router-dom';
import { Login } from '../Pages/Login';
import { Inicial } from '../Pages/Inicial';
import { Menu } from '../Componentes/Menu'

export function Rotas(){
    return(
        <>
            <Routes>
                <Route path='/' element={<Login/>}/> {/* caminho para a pagina login */}
                <Route path='/inicial' element={<Inicial/>}/>
                {/* a inicial tem um espaço vazio */}
                    <Route index element={<Menu/>}/>
            </Routes>
        </>
    )
}
    