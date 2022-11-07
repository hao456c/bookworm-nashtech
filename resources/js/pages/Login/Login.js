import './login.scss';
import { Modal, Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import serviceForLogin from '../../Services/serviceForLogin';
function Login(props){
    const [isShow, setIsShow] = useState(false);
    const show = props.show || false;
    useEffect(() => {
        setIsShow(show);
    }, [show]);
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        const signIn = async () => {
            try {
                const response = await serviceForLogin.login(data);
                console.log(response.access_token);
                console.log(response);
                    sessionStorage.setItem('userLogin', response.last_name+" "+response.first_name);
                    sessionStorage.setItem('token', response.access_token);
                    sessionStorage.setItem('isLogin', true);
                    setIsShow(false);
                    window.location.reload();
            } catch (error) {
                if(error.response.status === 422){
                  alert(error.response.data);
                }
                if(error.response.status === 401){
                    alert(error.response.data);
                }
            }
        }
        signIn();
    }
return(
        <React.Fragment>
            <span onClick={()=>setIsShow(true)}>{props.text}</span>
            <Modal show={isShow} onHide={() => setIsShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input {...register('email')} type="email" className="form-control"/>
                            <small className="form-text text-danger">{errors.email?.message}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input {...register('password')} type="password" className="form-control"/>
                            <small className="form-text text-danger">{errors.password?.message}</small>
                        </div>
                        <input onClick={handleSubmit(onSubmit)} type="submit" className="signin_button w-100" value="Sign In" />
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
);
}
export default Login;