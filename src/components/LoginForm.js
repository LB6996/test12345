import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    Button,
    Label,
    Input,
    Col
} from 'reactstrap';
import styled from 'styled-components';
import Axios from 'axios';

const StyledButton = styled(Button)`
margin: 20px 10px 0 0;
`
const LoginForm = ({ loginInUser,toggleModal }) => {

    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })

    // const { username, password } = userInfo

    const handleInput = (e) => {
        setUserInfo({
            username: userInfo.username,
            password: userInfo.password,
            [e.target.name]: e.target.value

            // ...userInfo,
            // [name]: value
        })
    }

    const handleSubmit = (e) => {
        console.log(userInfo)
        e.preventDefault()
        loginInUser(userInfo)
        toggleModal()
    }

    const notEmpty = 
    userInfo.username.length > 0 &&
    userInfo.password.length > 0

    return (
        <Form>
            <FormGroup row>
                <Label sm={3}>Username</Label>
                <Col sm={9}>
                    <Input type='text' name="username" value={userInfo.username} onChange={handleInput}></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={3}>Password</Label>
                <Col sm={9}>
                    <Input type='password' name="password" value={userInfo.password} onChange={handleInput}></Input>
                </Col>
            </FormGroup>
            <StyledButton disabled={!notEmpty} color="primary" onClick={handleSubmit}>Login</StyledButton>
            <StyledButton onClick={toggleModal}>Cancel</StyledButton>
        </Form>
    )
}

export default LoginForm