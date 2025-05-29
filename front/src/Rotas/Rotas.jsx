import {Routes, Route} from 'react-router-dom';
import { Login } from '../Pages/Login'; 
import { Inicial } from '../Pages/Inicial';
import { Menu } from '../Componentes/Menu'; 
import { DisciplinaP } from '../Pages/DisciplinasP';

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>

            <Route path='/inicial' element={<Inicial/>}>
                <Route index element={<Menu/>}/>
                <Route path = 'discprofessor' element ={<DisciplinaP/>}/>
            </Route>
        </Routes>


    )
}