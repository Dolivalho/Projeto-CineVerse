import axios from "axios";


//A base da URL nunca vai mudar, agora o restante sim (posso pegar rotas, algum detalhe e etc.)
//Base da URL: https://api.themoviedb.org/3/

//URL da API: https://api.themoviedb.org/3/movie/550?api_key=aef154650ec51e00068acdcf422db636

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;









