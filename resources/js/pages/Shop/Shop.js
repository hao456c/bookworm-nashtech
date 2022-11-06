import React,{ useEffect,useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './shop.css';
import Image from "../../../assets";
import {Col} from 'react-bootstrap';
import serviceForShop from '../../Services/serviceForShop';
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { Dropdown } from 'react-bootstrap';



  
  
  
const Shop = () => {
  const Navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [finalPage, setFinalPage] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [allBooks, setAllBooks] = useState([]);
  const [allAuthors,setAllAuthors] = useState([]);
  const [allCategories,setAllCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);   
  const [showing, setShowing] = useState({});
  const [filter,setFilter] = useState({
    sort: 1,
    page: 1,
    limit: 15,
});
const sortby = {
    "1": "On Sale",
    "2": "Popularity",
    "3": "Price: low to high",
    "4": "Price: high to low"
};
const limit = {
    "5": "5",
    "15": "15",
    "20": "20",
    "25": "25"
};


 useEffect(() => {
  const fetchDataShop = async () => {

        const resultBooks = await serviceForShop.getBookShop(queryString.stringify(filter));
        const allBooks = resultBooks.data;
        const total = resultBooks.meta.total;
        const finalPage = resultBooks.meta.last_page;
        const from = resultBooks.meta.from;
        const to = resultBooks.meta.to;
        allBooks.map((book) => (
            Object.keys(book).forEach((key) => {
                if (key === 'book_title'){
                  book[key] = book[key].substr(0,25)+"...";
                }
            })
        ))
        setAllBooks(allBooks);
      
        setFinalPage(finalPage);
        setFrom(from);
        setTo(to);
        setTotal(total);
  }
  fetchDataShop();
}, [filter]);
useEffect(() => {
    const fetchFilterList = async () => {
      const resultAuthors = await serviceForShop.getAuthor();
      const resultCategories = await serviceForShop.getCategory();
      const allAuthors = resultAuthors.data;
      const allCategories = resultCategories.data;
      setAllCategories(allCategories);
      setAllAuthors(allAuthors);
    }
    fetchFilterList();
},[]);

const handleshowing = () => {
    let string = "";
    let flag = 0;
    Object.keys(showing).forEach((key) => {
          if(flag==1)string+="| ";
          string+=key+":"+showing[key]+"  ";
          flag = 1; 
    });
    return string;
}
const handlesorting = (sortby) => {
  setFilter({
    ...filter,
    sort: sortby,
    page: 1,
  })
  setCurrentPage(1);
};

const handlelimit = (limit) => {
  setFilter({
    ...filter,
    limit: limit
  })
};

const handlepage = (page) => {

  page+=1;
  setCurrentPage(page);
  setFilter({
    ...filter,
    page: page
  })
  // window.scrollTo(0, 0);
};

const handleFilter = (value,name,key) => {
      switch(key){
        case 1:if(filter.category != value){
                  setFilter({
                  ...filter,
                  category: value,
                  page: 1,
                  });
                  setShowing({
                    ...showing,
                    category: name
                  })
                }
                else {
                  delete filter['category'];
                  setFilter({...filter});
                  delete showing['category'];
                }
                break;
        case 2: if(filter.author != value){
                  setFilter({
                  ...filter,
                  author: value,
                  page: 1,
                  });
                  setShowing({
                    ...showing,
                    author: name,
                  })
                }
                else{
                  delete filter['author'];
                  setFilter({...filter});
                  delete showing['author'];
                }
                break;
        case 3: if(filter.rating != value){
                setFilter({
                ...filter,
                rating: value,
                page: 1,
                });
                  setShowing({
                    ...showing,
                    rating: name,
                  });
                }
                else{
                  delete filter['rating'];
                  setFilter({...filter});
                  delete showing['rating'];
                }
                break;
        default: break;    
      }
    setCurrentPage(1);
}
  return (
      <section className="shop-page flex-grow-1">
        <div className="container">
          <div className="title-page">
            <p>
              Books <span>(Filtered by {handleshowing()})</span>
            </p>
          </div>

          <div className="book-list">
            <div className="row">
              <div className="col-lg-3">
                <p className="bl-filter">Filter by</p>

                <div className="bl-main-filter">
                <Accordion>
                  {/*
                        <!-- Category --> */}
                  <Accordion.Item eventKey="0" c>
                    <Accordion.Header>Category</Accordion.Header>
                    <Accordion.Body>
                      {allCategories.map((category) =>{
                        return(
                          <div className="filter__body" onClick={() => handleFilter(category.id,category.category_name,1)}>{category.category_name}</div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>

                  {/*
                        <!-- Author --> */}
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Author</Accordion.Header>
                    <Accordion.Body>
                    {allAuthors.map((author) =>{
                        return(
                          <div className="filter__body" onClick={() => handleFilter(author.id,author.author_name,2)}>{author.author_name}</div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>

                  {/*
                        <!-- Rating --> */}
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Rating</Accordion.Header>
                    <Accordion.Body>
                      <div className="filter__body" onClick={() => handleFilter(1,1,3)}>1 Star</div>
                      <div className="filter__body" onClick={() => handleFilter(2,2,3)}>2 Star</div>
                      <div className="filter__body" onClick={() => handleFilter(3,3,3)}>3 Star</div>
                      <div className="filter__body" onClick={() => handleFilter(4,4,3)}>4 Star</div>
                      <div className="filter__body" onClick={() => handleFilter(5,5,3)}>5 Star</div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="row mb-4">
                  <div className="col-lg-6">
                    <p className="bl-showing font-14px">{total > 0 ? "showing " +from+"-"+to+" of "+total: "showing " +0+"-"+0+" of "+total}</p>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-end">
                    <div className="row">
                      <Col xs lg={1} style={{width:"auto"}}>
                    <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                          Sort By {sortby[filter.sort]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>handlesorting(1)} eventKey="1">Sort By On Sale</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handlesorting(2)} eventKey="2">Sort By Popularity</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handlesorting(3)} eventKey="3">Sort By Price: low to high</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handlesorting(4)} eventKey="4">Sort By Price: high to low</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                    <Col xs lg={1}>
                    <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                          Show {limit[filter.limit]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>handlelimit(5)} eventKey="1">5</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handlelimit(15)} eventKey="2">15</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handlelimit(20)} eventKey="3">20</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handlelimit(25)} eventKey="4">25</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                    </div>
                  </div>
                </div>

                <div id="mainRow" className="row">
                  {allBooks.map((book) => {
                      return (
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={book.id}>
                      
                        <div className="card" onClick={()=>{Navigate(`/shop/${book.id}`)}}>
                          <img className="card-img-top img-fluid" src={book.book_cover_photo ? Image[book.book_cover_photo]:Image['defaultBook']} alt="Books" />
                            <div className="card-body">
                            <p className="book-title ">{book.book_title}</p>
                            <p className="book-author">{book.author_name}</p>
                            </div>
                          <div className="card-footer text-muted font-14px">${book.final_price}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="row">
                  <div className="col-12 d-flex justify-content-center">
                  {(
                      <ReactPaginate
                    
                        breakLabel="..."
                        nextLabel="Next"
                        className="pagination"
                        previousClassName="px-4 py-2"
                        nextClassName="px-4 py-2"
                        breakClassName="px-4 py2"
                        pageClassName="page-item px-4 py-2 cursor-pointer"
                        activeClassName="bg-secondary"
                        onPageChange={(event) =>{
                            handlepage(event.selected);   
                        }}
                        pageRangeDisplayed={3}
                        
                        pageCount={finalPage}
                        forcePage={parseInt(currentPage)-1}
                        previousLabel="Previous"
                        renderOnZeroPageCount={null}
                      />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
export default Shop;