import axios from 'axios';

const GetReportes = async () => {  
const token = localStorage.getItem('access-token');
const tokenBearer = 'Bearer ' + token;
  const response = await axios.get('http://localhost:8000/api/reportes2/', {
    headers: {
      'Authorization': tokenBearer,
    }
  });
  return response.data;
}

export default GetReportes;
