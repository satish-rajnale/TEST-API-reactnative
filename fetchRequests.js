import axios from 'axios';
import config from '../config'

export const makePost = axios({
    method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
    url: '/login',
    
  });