import {Routes, Route, Router} from 'react-router-dom';
import { Login } from '../Pages/Login'; 
import { Inicial } from '../Pages/Inicial';
import { Menu } from '../Componentes/Menu'; 
//url das paginas de disciplina
import { DisciplinaP } from '../Pages/DisciplinasP';
import { Disciplina } from '../Pages/Disciplina';
import { DisciplinaEditar } from '../Pages/DisciplinaEditar';
import { DisciplinaCadastrar } from '../Pages/DisciplinaCadastrar';
//url das paginas de ambiente
import { Ambiente } from '../Pages/Ambiente/Ambiente';
import { AmbienteCadastrar } from '../Pages/Ambiente/AmbienteCadastrar';
import { AmbienteEditar } from '../Pages/Ambiente/AmbienteEditar';
import { AmbienteProfessor } from '../Pages/Ambiente/AmbienteProfessor.jsx';
// urls de professores
import { Professores } from '../Pages/Professores/Professores';
import { ProfessoresEditar } from '../Pages/Professores/ProfessoresEditar';
import { ProfessoresCadastrar } from '../Pages/Professores/ProfessoresCadastrar';
//url das paginas de gestores
import { Gestores } from '../Pages/Gestores/Gestores';
import { GestoresCadastrar } from  '../Pages/Gestores/GestoresCadastrar.jsx';
import { GestoresEditar } from '../Pages/Gestores/GestoresEditar.jsx';
// url de salas
import { Salas } from '../Pages/Salas/Salas.jsx';
import { SalaCadastrar } from '../Pages/Salas/SalasCadastrar.jsx';
import { SalasEditar } from '../Pages/Salas/SalasEditar.jsx';


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
                <Route path = 'ambienteProfessor' element={<AmbienteProfessor/>}/>

                <Route path = 'professor' element ={<Professores/>}/>
                <Route path = 'profedit/:id' element ={<ProfessoresEditar/>}/>
                <Route path = 'cadastrarP' element = {<ProfessoresCadastrar/>}/>

                <Route path = 'gestores' element = {<Gestores/>}/>
                <Route path = 'cadastrarGestor' element = {<GestoresCadastrar/>}/>
                <Route path = 'editGestor/:id' element = {<GestoresEditar/>}/>

                <Route path = 'salas' element = {<Salas/>}/>
                <Route path = 'salacadastrar' element = {<SalaCadastrar/>}/>
                <Route path = 'salaeditar/:id' element = {<SalasEditar/>}/>

            </Route>
        </Routes>


    )
}