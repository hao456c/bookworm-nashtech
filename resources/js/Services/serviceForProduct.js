import api from "./api";

const serviceForProduct = {
    getBook: (id) => {
        const url="/api/book/detail?id="+id;
        return api.get(url);
    },


    getReview: (data) => {
        const url = "/api/review?"+data;
        console.log(url);
        return api.get(url);
    },


    getRating: (id) => {
        const url = "/api/review/rating?book_id="+id;
        return api.get(url);
    },

    submitReview: (data) => {
        const url = "/api/review/create";
        console.log(data);
        return api.post(url,data);
    } 
}

export default serviceForProduct;