import api from "./api";

const serviceForLogin = {
   login: (data) => {
        const url = "/api/session";
        console.log(data);
        return api.post(url,data);
   },
   logout: () =>{
        const url = "/api/session";
        return api.delete(url);
   }
}

export default serviceForLogin;