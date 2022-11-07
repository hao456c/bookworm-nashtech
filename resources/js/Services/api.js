
import axios from 'axios';

var token = '';
if(sessionStorage.getItem('userLogin')){
    token = sessionStorage.getItem('token');
}

const api = axios.create({
baseURL: process.env.MIX_BASE_URL,
headers: {
'content-type': 'application/json',
"Authorization": `Bearer ${token}`
},
});
api.interceptors.request.use(async (config) => {
// Handle token here ...
return config;
})
api.interceptors.response.use((response) => {
if (response && response.data) {
   
return response.data;
}
return response;
}, (error) => {
// Handle errors
throw error;
});
export default api;