import api from "./api";

const serviceForCart = {
    createOrder: (data) => {
        const url = "api/order";
        
        return api.post(url, data);
    },

}

export default serviceForCart;