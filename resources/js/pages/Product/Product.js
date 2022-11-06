import "./product.scss";
import Image from '../../../assets';
import serviceForProduct from '../../Services/serviceForProduct';
import { Routes, Route, useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"; 
import BookReview from "./bookReview";
const Product = () =>{
    const {id} = useParams();
    const [bookDetail, setBookDetail] = useState([]);
    const [bookReview, setBookReview] = useState([]);
    const [reviewFilter, setReviewFilter] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const sortby = {
      "3": "Price: low to high",
      "4": "Price: high to low"
    };
    const limit = {
      "5": "5",
      "15": "15",
      "20": "20",
      "25": "25"
    };
    const minMaxQuantity = {
        min: 1,
        max: 8
    };
    const schema = yup.object().shape({
      review_title: yup.string().required(),
      review_details: yup.string().required(),
      rating_start: yup.number().required(),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    });
  useEffect(() => {
    const fetchBookDetail = async () => {
      const bookDetail = await serviceForProduct.getBook(id);
      setBookDetail(bookDetail);
    }
    fetchBookDetail();
  },[]);
  
  const handleAddToCart = () => {
    const dataCart = {
        id: bookDetail.id,
        quantity: quantity,
        book: bookDetail
    };
    sessionStorage.setItem("item_cart",{dataCart});
  };

  const onSubmit = (data) => {
    const newdata = {
        book_id: id,
        ...data
    };
    console.log(review);
    const submitReview = async () => {
        try {
            const result = await serviceForProduct.submitReview(newdata);
            result.book_id == id && alert("success");
        } catch (error) {
            if(error.response.status === 422){
                for (const key in error.response.data.errors) {
                    if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                        const element = error.response.data.errors[key];
                        alert(element[0])
                    }
                }
            }
        }
    }
    submitReview();
}
    return(
        <section className="detail-page flex-grow-1">
      <div className="container">
      <div className="title-section">
        <h3>{bookDetail.category_name}</h3>
      </div>

      <div>
        <div className="row">
        <Col xs={12} md={8} lg={8} className="bookworm__detail__colitem mb-2">
          <Card>
            <Row className="bookworm__detail_card">
                <Col xs={12} md={2} lg={6} className="bookworm__detail__colitem">
                    <div >
                        <img className="bookworm__detail__image__imd" src={bookDetail.book_cover_photo ? Image[bookDetail.book_cover_photo] :Image['bookDefault']}/>
                    </div>
                    <div className="bookworm__detail__author">
                        <span>By (author) <strong>{bookDetail.author_name}</strong></span>
                    </div>
                </Col>
                <Col xs={12} md={2} lg={5} className="p-4">
                    <div className="bookworm__detail__title">
                        <h3>{bookDetail.book_title}</h3>
                    </div>
                    <div className="bookworm__detail__description">
                        <p><strong>Book description</strong></p>
                        <p>{bookDetail.book_summary}</p>
                    </div>
                </Col>
            </Row>
        </Card>
          </Col>
          <Col>
          <Card>
                <Card.Header className="bookworm__detail__card__header px-4">
                    {bookDetail.book_price === bookDetail.final_price ? (
                        <div className="bookworm__detail__card__price">
                            <span className="bookworm__detail__card__price__finalprice">${bookDetail.final_price}</span>
                        </div>
                    ) : (
                        <div className="bookworm__detail__card__price">
                            <span className="bookworm__detail__card__price__bookprice">${bookDetail.book_price}</span>
                            <span className="bookworm__detail__card__price__finalprice">${bookDetail.final_price}</span>
                        </div>
                    )}
                </Card.Header>
                <Card.Body className="bookworm__detail__card__body px-4 my-4">
                    <span className="mb-0">Quantity</span>
                    <div className="bookworm__detail__card__body__quantity">
                        {quantity <= minMaxQuantity.min ? (
                            <button className="bookworm__detail__card__body__quantity__button" disabled>-</button>
                        ) : (
                            <button className="bookworm__detail__card__body__quantity__button" onClick={() => setQuantity(quantity - 1)}>-</button>
                        )}
                        <span className="bookworm__detail__card__body__quantity__number">{quantity}</span>
                        {quantity >= minMaxQuantity.max ? (
                            <button className="bookworm__detail__card__body__quantity__button" disabled>+</button>
                        ) : (
                            <button className="bookworm__detail__card__body__quantity__button" onClick={() => setQuantity(quantity + 1)}>+</button>
                        )}
                    </div>
                    <div className="bookworm__detail__card__body__addtocart">
                        <button onClick={() => handleAddToCart()}>Add to cart</button>
                    </div>
                </Card.Body>
            </Card>
          </Col>
        </div>
        <div className="row">
          <BookReview id={id} />
          <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="bookworm__review__form">
                    <Card.Header>
                        <h3>Write a review</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className="form-group mb-3">
                            <label htmlFor="reviewTitle">Add a title</label>
                            <input id="reviewTitle" {...register('review_title')}  className="form-control"/>
                            <span className="text-danger">{errors.review_title?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="review">Detail please! Your review helps other shoppers.</label>
                            <textarea className="form-control" id="review" rows="3" {...register('review_details')}></textarea>
                            <span className="text-danger">{errors.review_details?.message}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Select a rating star</label>
                            <select className="form-control" id="rating" {...register('rating_start')}>
                                <option value="1">1 Star</option>
                                <option value="2">2 Star</option>
                                <option value="3">3 Star</option>
                                <option value="4">4 Star</option>
                                <option value="5">5 Star</option>
                            </select>
                        </div>
                    </Card.Body>
                    <Card.Footer className="px-5 py-3 bookworm__detail__card__body__addtocart mt-0">
                        <button type="submit" >Submit Review</button>
                    </Card.Footer>
                </Card>
            </form>
          </Col>
        </div>
      </div>
    </div>
  </section>
    );
}

export default Product;