import api from "./api";

const serviceForShop = {
    getBookShop: (filter) => {
        const url="/api/book/shop?"+filter;

        return api.get(url);
    },


    getCategory: () => {
        const url = "/api/category";
        return api.get(url);
    },


    getAuthor: () => {
        const url = "/api/author";
        return api.get(url);
    },
}

export default serviceForShop;