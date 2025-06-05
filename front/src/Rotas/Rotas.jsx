import {Routes, Route, Router} from 'react-router-dom';
import { Login } from '../Pages/Login'; 
import { Inicial } from '../Pages/Inicial';
import { Menu } from '../Componentes/Menu'; 
import { DisciplinaP } from '../Pages/DisciplinasP';
import { Disciplina } from '../Pages/Disciplina';

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>

            <Route path='/inicial' element={<Inicial/>}>
                <Route index element={<Menu/>}/>
                <Route path = 'discprofessor' element ={<DisciplinaP/>}/>
                <Route path = 'disciplina' element = {<Disciplina/>} />
            </Route>
        </Routes>


    )
}