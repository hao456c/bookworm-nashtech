import "./cart.scss";
import React from 'react';
import { Card, Row, Col } from "react-bootstrap";
import Image from '../../../assets';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../Login/Login";
import serviceForCart from "../../Services/serviceForCart";
function Cart(){
  const [cart,setCart] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if(sessionStorage.getItem('item_cart')){
      setCart(JSON.parse(sessionStorage.getItem('item_cart')));
    }
  },[]);
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
        total += item.book.final_price * item.quantity;
    });
    setTotal(total);
  },[cart]);
 
  const handleAddQuantity = (id) => {
    cart.map((item)=>{
      if(item.id==id){
          if(item.quantity<8)item.quantity++;
          sessionStorage.setItem("item_cart",JSON.stringify(cart));
          
      }
    });
    setCart(JSON.parse(sessionStorage.getItem('item_cart')));
  }
  const handleRemoveQuantity = (id) => {
    let flag = 0;
    cart.map((item)=>{
      if(item.id==id){
        if(item.quantity==1){
          if (confirm("Are you sure to delete this book ?") == true) {
              cart.splice(flag,1);
          }
        }
          if(item.quantity>1)item.quantity--;
          sessionStorage.setItem("item_cart",JSON.stringify(cart));
      }
      flag++;
    });
    setCart(JSON.parse(sessionStorage.getItem('item_cart')));
  }

  const handleClick = (book) => {
    navigate(`/shop/${book.id}`);
  }

  const handlePlaceOrder = () => {
    if(!sessionStorage.getItem('isLogin')){
      setIsShow(true);
    }
      else {
        if(cart.length === 0){
            alert('Cart is empty');
        }else{
            let confirm = window.confirm("Are you sure to place order?");
            if(confirm){
                const itemOrder = cart.map((item) => {
                    return {
                        book_id: item.id,
                        quantity: item.quantity
                    }
                });
                const order = async () => {
                    try {
                        const response = await serviceForCart.createOrder({itemOrder: itemOrder});
                        sessionStorage.removeItem('item_cart');
                        setCart([]);
                        alert("Successfully");
                        window.location.reload();
                    } catch (error) {
                        if(error.response.status === 422){
                            let listIdBook = [];
                            if(error.response.data.errors.book_id){
                                error.response.data.errors.book_id.forEach((item) => {
                                    if(item[0].includes('Exists:')){
                                        const itemId = item[0].match(/\d+/)[0];
                                        listIdBook.push(itemId);
                                    }
                                });
                            }
                            if(listIdBook){
                                dispatch(removeFromCart(listIdBook));
                            }
                        }
                    }
                }
                order();
            }
        }
    }
  };


    return(
        <section className="cart-page flex-grow-1">
    <div className="container">
      <div className="title-section">
        <p className="title-page font-22px">Your cart: {Object.keys(cart).length > 1 ? Object.keys(cart).length +" items":Object.keys(cart).length +" item"}</p>
      </div>

      <div>
        <div className="row">
        <Login show={isShow} onHide={() => setIsShow(false)} />
          <Col>
          <Card>
            <Card.Header>
                <Row className="cart__header">
                    <Col md={12} lg={5}>
                        <h6>Product</h6>
                    </Col>
                    <Col md={12} lg={2}>
                        <h6>Price</h6>
                    </Col>
                    <Col md={12} lg={3}>
                        <h6>Quantity</h6>
                    </Col>
                    <Col md={12} lg={2}>
                        <h6>Total</h6>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {
                    cart.length == 0 ? (
                        <div className="cart__empty p-2">
                            <h5>Your cart is empty</h5>
                        </div>
                    ) : (
                        cart.map((item, index) => {
                            return (
                                <Row key={index}>
                                    <Col xs={12} md={12} lg={5}>
                                        <div className="cart__booktitle d-flex">
                                            <img onClick={() => handleClick(item.book)} style={{width:150}} className="cart__image" src={item.book.book_cover_photo ? Image[item.book.book_cover_photo]: Image['bookDefault']} alt="book" />
                                            <div className='ms-3 d-flex justify-content-center flex-column'>
                                                <h6>{item.book.book_title}</h6>
                                                <p>{item.book.book_author_name}</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={12} lg={2} className="d-flex justify-content-center flex-column">
                                        {
                                            item.book.book_price === item.book.final_price ? (
                                                <h6>${item.book.final_price}</h6>
                                            ) : (
                                                <React.Fragment>
                                                    <h6 className="cart__price__final">${item.book.final_price}</h6>
                                                    <h6 className="cart__price__discount">${item.book.book_price}</h6>
                                                </React.Fragment>
                                            )
                                        }
                                    </Col>
                                    <Col xs={12} md={12} lg={3} className="d-flex justify-content-center flex-column"> 
                                        <div className="cart__quantity">
                                            <button className="cart__quantity__button" onClick={() => handleRemoveQuantity(item.book.id)}>-</button>
                                            <h6 className="cart__quantity__number">{item.quantity}</h6>
                                            <button className="cart__quantity__button" onClick={() => handleAddQuantity(item.book.id)}>+</button>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={12} lg={2} className="d-flex justify-content-center flex-column">
                                        <h3 className="cart__price__final">${(item.book.final_price * item.quantity).toFixed(2)}</h3>
                                    </Col>
                                    <hr className="mt-3"/>
                                </Row>
                            );
                        }
                    ))
                }
            </Card.Body>
        </Card>
          </Col>
          <Col lg={4}>
            <Card>
                <Card.Header className='d-flex justify-content-center'>
                    <h6>Cart Total</h6>
                </Card.Header>
                <Card.Body className="cart_total">
                    <h3>${total.toFixed(2)}</h3>
                    <button onClick={handlePlaceOrder}>
                        Place order
                    </button>
                </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  </section>
    );
}

export default Cart;
