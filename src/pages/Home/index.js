import {useEffect, useState} from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css';

//URL da API: https://api.themoviedb.org/3/movie/550?api_key=aef154650ec51e00068acdcf422db636

function Home(){
    const [filmes, setFilmes] = useState ([]);
    const [loading, setLoading] = useState(true);



    //O useEffect está sendo usado para que toda vez que o usuário abrir a aplicação, nós chamamos o
    //useEffect, fazemos uma requisição no endereço da api, busca os dados e coloca dentro do console.log
    useEffect(()=> {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "aef154650ec51e00068acdcf422db636",
                    language: "pt-BR",
                    page:1,
                }
            })
            //O await é para esperar essa requisição .get para que ele possa passar para linha debaixo que é
            //onde será mostrado o nosso resultado através do console.log

            //console.log(response.data.results.slice(0,10));
            //O comando .slice(x,x) serve para determinar da onde até aonde você quer que a informação seja puxada.
            setFilmes(response.data.results.slice(0,10))
            setLoading(false);


        }
        


        loadFilmes();
    }, [])


    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        //Quando estamos utilizando o map e renderizando algo, precisamos sempre passar uma key para 
                        //o primeiro item (nesse caso o article), para o react entender.
                        //Ao utilizar `` que é chamado de template string, podemos concatenar uma variável com texto,
                        //como foi utilizado na <img/> abaixo.
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;