import axios from 'axios'

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: '319d699ffe91e2d8a369718c45d12edc',
        language: "pt-BR",
        include_adult: false
    }
})