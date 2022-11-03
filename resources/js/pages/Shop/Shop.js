import React,{ useEffect,useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './shop.css';
import Image from "../../../assets";
import {Col} from 'react-bootstrap';
import serviceForShop from '../../Services/serviceForShop';
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import queryString from 'query-string';


const Shop = () => {
  const Navigate = useNavigate();   
  const [allBooks, setAllBooks] = useState([]);
  const [allAuthors,setAllAuthors] = useState([]);
  const [allCategories,setAllCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [finalPage, setFinalPage] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const queryString = {
      sortby: 1,
      author: "",
      category: "",
      rating: "",
      limit: 15,
      page: 1,
  };

 useEffect(() => {
  const fetchDataShop = async () => {
        const resultBooks = await serviceForShop.getBookShop("","","",1,limitSelect,CurrentPage);
        const resultAuthors = await serviceForShop.getAuthor();
        const resultCategories = await serviceForShop.getCategory();
        const allBooks = resultBooks.data;
        const total = resultBooks.meta.total;
        const finalPage = resultBooks.meta.last_page;
        const from = resultBooks.meta.from;
        const to = resultBooks.meta.to;
        const allAuthors = resultAuthors.data;
        const allCategories = resultCategories.data;
        allBooks.map((book) => (
            Object.keys(book).forEach((key) => {
                if (key === 'book_title'){
                  book[key] = book[key].substr(0,25)+"...";
                }
            })
        ))
        setAllBooks(allBooks);
        setAllAuthors(allAuthors);
        setAllCategories(allCategories);
        setFinalPage(finalPage);
        setFrom(from);
        setTo(to);
        setTotal(total);
  }
  fetchDataShop();
}, []);


  return (
      <section className="shop-page flex-grow-1">
        <div className="container">
          <div className="title-page">
            <p>
              Books <span>(Filtered by Category #1)</span>
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
                          <div className="filter__body">{category.category_name}</div>
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
                          <div className={author.author_name == authorSelect ? "filter__body:active":"filter__body"}>{author.author_name}</div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>

                  {/*
                        <!-- Rating --> */}
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Rating</Accordion.Header>
                    <Accordion.Body>
                      <div className="filter__body">1 Star</div>
                      <div className="filter__body">2 Star</div>
                      <div className="filter__body">3 Star</div>
                      <div className="filter__body">4 Star</div>
                      <div className="filter__body">5 Star</div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="row mb-4">
                  <div className="col-lg-6">
                    <p className="bl-showing font-14px">{"showing "+from+"-"+to+" of "+total}</p>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-end">
                    <div className="row">
                      <Col xs lg={1} style={{width:"auto"}}>
                    <button className="btn btn-secondary dropdown-toggle mx-auto" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort by on sale
                    </button>
                    </Col>
                    <Col xs lg={1}>
                    <button className="btn btn-secondary dropdown-toggle mx-auto" type="button" id="dropdownShowButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Show 20
                    </button>
                    </Col>
                    </div>
                  </div>
                </div>

                <div id="mainRow" className="row">
                  {allBooks.map((book) => {
                      return (
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={book}>
                      
                        <div className="card" onClick={()=>{Navigate("/shop/1")}}>
                          <img className="card-img-top img-fluid" src={book.book_cover_photo ? Image[book.book_cover_photo]:Image[defaultBook]} alt="Books" />
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
                        onPageChange={async (event) =>{
                            console.log(currentPage);
                            const response = await setCurrentPage(event.selected);
                            console.log(currentPage);
                           
                        }}
                        pageRangeDisplayed={3}
                        
                        pageCount={finalPage}
                        initialPage={parseInt(currentPage)-1}
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