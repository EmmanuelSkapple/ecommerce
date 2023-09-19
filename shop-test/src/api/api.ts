import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { env } from '../env/envDev';

const BASE_URL = env?.serverUrl; 

const addTokenToHeaders = async () => {
    try {
      const user = getAuth().currentUser;
      if (user) {
        const token = await user.getIdToken();
        return {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        };
      }
      throw new Error('Usuario no autenticado');
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  };

const api = async (method : string, endpoint : string, data? : any) => {
    try {
      const headersConfig = await addTokenToHeaders();
  
      const url = `${BASE_URL}${endpoint}`;
      const config = { method, url, ...headersConfig };        
      if (method === 'get' || method === 'delete') {
        return await axios(config);
      } else if (method === 'post' || method === 'put') {
        return await axios[method](url, data, config);
      }
    } catch (error : any)  {
        console.log('error',error);
        getAuth().signOut();
        return  (error);
    }
  };
  
  export default api;