import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from './pages/Favoritos'

import Erro from './pages/Erro';

import Header from './components/Header';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/filme/:id" element={ <Filme/> } />
                <Route path="/favoritos" element={ <Favoritos/> } />
            
                <Route path="*" element={ <Erro/> }/>
            </Routes>
        </BrowserRouter>
    )
}

//Para página Home (ou página inicial) ser a primeira a aparecer para o usuário
//utiliza-se o "/" no path.
//Para página de not found se utilza no path o *.

export default RoutesApp;