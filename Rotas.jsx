import {Routes, Route, Router} from 'react-router-dom';
import { Login } from '../Pages/Login'; 
import { Inicial } from '../Pages/Inicial';
import { Menu } from '../Componentes/Menu'; 
import { DisciplinaP } from '../Pages/DisciplinasP';
import { Disciplina } from '../Pages/Disciplina';
import { DisciplinaEditar } from '../Pages/DisciplinaEditar';
import { DisciplinaCadastrar } from '../Pages/DisciplinaCadastrar';
import { Ambiente } from '../Pages/Ambiente/Ambiente';
import { AmbienteCadastrar } from '../Pages/Ambiente/AmbienteCadastrar';
import { AmbienteEditar } from '../Pages/Ambiente/AmbienteEditar';
import { Professores } from '../Pages/Professores/Professores';
import { ProfessoresEditar } from '../Pages/Professores/ProfessoresEditar';
import { ProfessoresCadastrar } from '../Pages/Professores/ProfessoresCadastrar';


export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>

            <Route path='/inicial' element={<Inicial/>}>
                <Route index element={<Menu/>}/>
                <Route path = 'discprofessor' element ={<DisciplinaP/>}/>
                <Route path = 'editar/:id' element ={<DisciplinaEditar/>}/>
                <Route path = 'disciplina' element = {<Disciplina/>} />
                <Route path = 'cadastrar' element = {<DisciplinaCadastrar/>}/>

                <Route path = 'ambiente' element = {<Ambiente/>}/>
                <Route path = 'cadastroAmbiente' element = {<AmbienteCadastrar/>}/>
                <Route path = 'editAmbiente/:id' element={<AmbienteEditar />} />

                <Route path = 'professor' element ={<Professores/>}/>
                <Route path = 'profedit/:id' element ={<ProfessoresEditar/>}/>
                <Route path = 'cadastrarProfessor' element = {<ProfessoresCadastrar/>}/>

            </Route>
        </Routes>


    )
}