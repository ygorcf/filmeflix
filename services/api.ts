import axios from 'axios'

export const baseURL = 'https://api.themoviedb.org/3'
export const apiKey = '6a0b8b07a289610a8833bd45715e5dc3'

export default axios.create({
    baseURL,
    params: {
        api_key: apiKey,
        language: 'pt-BR'
    }
})
