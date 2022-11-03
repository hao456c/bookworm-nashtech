import api from "./api";

const serviceForShop = {
    getBookShop: (category, author, rating, sortby, limit, page) => {
        if(category!="")category = "&category=" + category;
        if(author!="")author = "&author=" + author;
        if(rating!="")rating = "&rating=" +rating;
        if(sortby <=4 && sortby >=1)sortby = "&sort=" + sortby;
            else sortby = "&sort=1"; 
        if(limit == 5 || limit == 15 || limit == 20 || limit == 25)limit="limit="+limit;
            else limit = "limit=15";
        if(page>1)page="&page="+page;
            else page = ""; 
        const url = "api/book/shop"+"?"+limit+author+category+rating+sortby+page;
        console.log(url);
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