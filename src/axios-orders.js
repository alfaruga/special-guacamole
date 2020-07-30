import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-mi-hamburguesa-d56ea.firebaseio.com/'
});

export default instance;