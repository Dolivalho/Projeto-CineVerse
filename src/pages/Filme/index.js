import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

//CSS do react toastify
import 'react-toastify/dist/ReactToastify.css';


//Com o useParams conseguimos acessar os parametros, nesse caso o parametro definido
//no arquivo routes.js na route Filme foi id, onde ele vai pegar o filme e depois o id
//especifico dele para que consiga acessar e mostrar o filme buscado em questão.


//O useEffect vai montar o componente e chamamos ele para mostrar alguma coisa,
//enquanto esse componente está sendo montado, que no caso é buscar uma requisição.

function Filme(){
    const { id } = useParams();
    //Abaixo ele deu o nome de navigate para a const que vai usar o Hook useNavigate 
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "aef154650ec51e00068acdcf422db636",
                    language: "pt-BR",
                }
            })
            //Se o filme for encontrado, ele vai cair dentro do .then
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            //Caso o filme não seja encontrado ele vai cair no .catch
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO :(")
                //Abaixo no navigate (nome da const que vai usar o useNavigation) ele indicou através do "" que ele quer que o usuário seja direcionado para a página Home (/)
                //E utilizando o {replace:true} ele redireciona o usuário para página de Home
                //Depois ele usa o return para parar a execução do código.
                navigate("/", {replace: true})
                return;
            })
        }
        loadFilme();


        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigate, id])



        //Na function abaixo criamos uma const chamada minhaLista que vai armazenar
        //e pegar um item dessa lista.
        function salvarFilme(){
            const minhaLista = localStorage.getItem("@cineverse");
            //Depois verificamos se essa lista existe, e se não existir chamamos um array vazio.
            //O JSON.parse serve converter pra uma lista dnv, pois quando ela é enviada ela precisa ser enviada em formato de string.
            //Logo depois passamos um ou (||) para que caso essa lista não exista ainda, seja inicializada como uma array vazia.
            let filmesSalvos = JSON.parse(minhaLista) || [];

            //Criamos uma const chamada hasFilme para verificar se o filme já está salvo na lista
            //filmesSalvos através do método JS .some(), que verifica se dentro da sua lista tem pelo menos 1 item com a comparação que você fizer.
            //Passamos uma função anonima para ele receber uma comparação, nesse caso estamos dizendo que se algum filme salvo na sua lista filmesSalvos
            //tiver id igual ao id da página, quer dizer já tem esse filme salvo, e se não tiver ele deixa salvar, e assim o .some() nos devolve um true ou false.
            const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

            if(hasFilme){
                toast.warn("Esse filme já está na sua lista!");
                return;
                //return; para parar a execução do nosso código.
            }

            //Acessamos a variável filmesSalvos e usamos o .push() para colocarmos mais um item no nosso array, que nesse caso é o nosso filme 
            //que é item que está no objeto useState. 
            filmesSalvos.push(filme);
            //Depois pego o localStorage que é onde estamos armazenando esse filmes, e atráves do setItem passo a chave que defini, e uso o JSON.stringfy para transformar
            //para uma string pois não é possivel salvar como array. Por último passo o (filmesSalvos) que é onde estamos armazendo os filmes.
            localStorage.setItem("@cineverse", JSON.stringify(filmesSalvos));
            toast.success("Filme salvo com sucesso!");
        }



    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
        
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
        
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}
//Acima no nosso return ao utilizar o target="blank" no anchor do trailer fazemos com que o youtube com a pesquisa seja aberto em outra aba. Sem o _ antes o blank não funciona
//E ao colocar rel="external" informamos ao navegador que esse é um link externo (não temos controle sobre ele).

export default Filme;