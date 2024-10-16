import { useEffect, useState } from 'react'
//useEffect está sendo usado para quando a página favoritos for aberta, ele vai no localStorage buscar os itens salvos quando o componente Favoritos for montado.
//useState para colocar esse itens salvos para manipularmos dentro de um estado.
import './favoritos.css'
import { Link } from 'react-router-dom'
//import do abaixo Toastify
import { toast } from 'react-toastify';

//CSS do react toastify
import 'react-toastify/dist/ReactToastify.css';


function Favoritos(){

    //O useState é uma lista vazia [], pois será a lista dos nossos filmes favoritos
    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        //Nessa const estou dizendo que a const minhaLista vai receber o que tiver no localStorage da minha chave '@cineverse'
        const minhaLista = localStorage.getItem("@cineverse")
        //Como a informação vem como uma string é preciso converter para uma array de volta, para isso é usado o JSON.parse
        //E depois ele diz que se não houver nada na lista (usando o ou ||) ele vai criar um array vazio. 
        setFilmes(JSON.parse(minhaLista) || [])





    }, [])


    //Nessa  function ao passar excluirFilme(id) eu estou dizendo que quero retirar do nosso useState de filmes o id que eu cliquei
    //No let chamado filtroFilmes, ao acessar os filmes (onde estão todos os filmes), eu utilizo o .filter() e dentro dele eu passo uma função anonima
    //dizendo que  ele vai acessar o (item) e eu quero no return devolver todos os filmes onde o item.id for diferente do id que estou recebendo. Isso quer dizer que
    //se eu cliquei no id do filme O Corvo por exemplo, eu vou devolver todos os id's menos o id de O Corvo, que foi o que eu cliquei e assim eu retorno todos os id's
    //forem diferentes (!==) do que eu cliquei.
    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        //Aqui ele devolve todos os filmes, exceto os que eu cliquei no excluir (id que eu não quero que seja devolvido).
        setFilmes(filtroFilmes);

        //Abaixo tiramos o id que foi excluido do localStorage, e salvamos um novo localStorage com os filmes que estão de fato na lista.
        //Se isso não for feito, podemos excluir o item, mas ele irá aparecer novamente pois ele ainda vai estar no localStorage.
        //Depois passamos nossa chave e convertemos para string usando o JSON.stringify pois não podemos salvar um array, e depois passamos o (filtroFilmes) para salvar todos os
        //filmes que temos agora depois de ter deletado qualquer um.
        localStorage.setItem("@cineverse", JSON.stringify(filtroFilmes))
        toast.success("Filme removido com sucesso!")
    }


    return(
        //Abaixo é possível ver que para acessar a variável filmes, é necessário usar o .map pois ela é um array.
        //Passamos uma função anonima dentro do array, e dentro dela recebemos nosso filme (que nesse caso eu chamei de item),
        //e depois dentro das chaves damos um return() para retornamos o que queremos montar na tela.
        //Quando fazemos um map precisamos passar a key que desejamos, no caso a primeira key foi a do item. o id dele, e depois mostramos no <span> o item. title do filme.
        //Abaixo do <h1> estamos dizendo que se o length do nosso filme for igual (===) a 0, ele irá mostrar (&&) um span com a mensagem abaixo.
        <div className="meus-filmes">
            <h1>Meus filmes:</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`} >Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


export default Favoritos;