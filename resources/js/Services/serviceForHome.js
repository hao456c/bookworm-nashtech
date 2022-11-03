import api from "./api";

const serviceForHome = {
    getBookOnSale: () => {
        const url = "api/home/onsale";
        
        return api.get(url);
    },


    getBookRecommended: () => {
        const url = "/api/home/recommended";
        return api.get(url);
    },


    getBookPopular: () => {
        const url = "/api/home/popular";
        return api.get(url);
    },
}

export default serviceForHome;