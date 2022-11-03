import './home.css';
import serviceForHome from '../../Services/serviceForHome';
import { Button } from 'reactstrap';
import Image from "../../../assets";
import defaultBookCover from '../../../assets/bookcover/defaultbook.png';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css';

import axios from 'axios';


const Home = () => {

  const [onSaleBooks, setOnSaleBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [defaultBooks, setDefaultBooks] = useState([]);
  const [recommended, setRecommended] = useState(true);
  useEffect(() => {
    const fetchProductList = async () => {
      const onSaleBooks = await serviceForHome.getBookOnSale();
      const recommendedBooks = await serviceForHome.getBookRecommended();
      const popularBooks = await serviceForHome.getBookPopular();
      setOnSaleBooks(onSaleBooks);
      setRecommendedBooks(recommendedBooks); 
      setPopularBooks(popularBooks);  
      setDefaultBooks(recommendedBooks);
    };
  fetchProductList();
  }, []);
  const recommendedBookClick = () => {
    setDefaultBooks(recommendedBooks);
    setRecommended(true);
  };
  const popularBookClick = () => {
    setDefaultBooks(popularBooks);
    setRecommended(false);
  };

    return (
      <section className="home-page flex-grow-1">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-lg-6">
              <p>On Sale</p>
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
              <Button color="secondary" size="sm">
                <Link to="/shop">
                View All &nbsp; <i className="fas fa-angle-right"></i>
                </Link>
              </Button>
            </div>
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={4}
            navigation={true}
            loop={true}
            loopFillGroupWithBlank={true}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false
            }}>
            {onSaleBooks.map((book, idx) => {
              return (
                <SwiperSlide key={idx} className="carousel">
                  <div className="card h-100">
                    <img
                      className="card-img-top img-fluid"
                      src={book.book_cover_photo ? Image[book.book_cover_photo]:Image[bookDefault]}
                      alt="Books"
                    />
                    <div className="card-body d-flex flex-column">
                      <p className="book-title font-18px flex-grow-1">{book.book_title}</p>
                      <p className="book-author font-14px mt-3">{book.author_name}</p>
                    </div>
                    <div className="card-footer text-muted font-14px">
                      <strike>{book.book_price != book.finalprice ? "$" + book.book_price:""}</strike> <strong>${book.finalprice}</strong>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="book-list">
            <div className="text-center">
              <p className="section-title font-20px mb-3">Featured Books</p>
              <div className="mb-4">
                <Button
                  color={recommended ? 'secondary' : 'link'}
                  onClick={recommendedBookClick}>
                  Recommended
                </Button>

                <Button
                  color={recommended ? 'link' : 'secondary'}
                  onClick={popularBookClick}>
                  Popular
                </Button>
              </div>
            </div>
            <div id="mainRow" className="row">
              {defaultBooks.map((book) => {
                return (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 mb-4 align-items-stretch"
                    key={book.id}>
                    <div className="card h-100">
                      <img
                        className="card-img-top img-fluid"
                        src={book.book_cover_photo ? Image[book.book_cover_photo]:Image[bookDefault]}
                        alt="Books"
                      />
                      <div className="card-body d-flex flex-column">
                        <p className="book-title font-18px flex-grow-1">{book.book_title}</p>
                        <p className="book-author font-14px mt-3">{book.author_name}</p>
                      </div>
                      <div className="card-footer text-muted font-14px">${book.finalprice}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
export default Home;