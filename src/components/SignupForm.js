import React, { useState } from 'react';
import {
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
import Axios from 'axios';
import { postSignUp } from '../constants/api'
import styled from 'styled-components';

import { toast } from 'react-toastify';

const StyledButton = styled(Button)`
margin: 20px 10px 0 0;
`

const SignupForm = ({ toggleModal }) => {

    //     const [username, setUsername] = useState('')
    //     const [email, setEmail] = useState('')
    //     const [password, setPassword] = useState('')
    //     const [confirmPassword, setConfirmPassword] = useState('')

    //     const handleUserName = (e) => {
    //         setUsername(e.target.value)
    //     }
    //     console.log(username)
    //     const handleEmail = (e) => {
    //         setEmail(e.target.value)
    //     }
    //     console.log(email)
    //     const handlePassword = (e) => {
    //         setPassword(e.target.value)
    //     }
    //     console.log(password)
    //     const handleConfirmedPassword = (e) => {
    //         setConfirmPassword(e.target.value)
    //     }
    //     console.log(confirmPassword)





    // const [validUser, setValidUser] = useState(null)
    // const displayHelperMessage = () => {
    //     if (validUser = true) {
    //     if (validUser === 'valid') {
    //         return <p className="text-success"> Username is available!! </p>
    //     } else {
    //         return <p className="text-danger">Username is not available!</p>
    //     }
    // } else {
    //     return null
    // }
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(null)
    const [validUser, setValidUser] = useState(null)
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const { username, email, password, confirmPassword } = userInfo

    const displayHelperMessage = () => {
        if (validUser) {
            if (validUser === 'valid') {
                return <p className="text-success py-1">This username is available.</p>
            } else {
                return <p className="text-danger py-1">This username is not available!</p>
            }
        } else {
            return null
        }
    }

    const confirmPasswordMessage = () => {
        if (
            userInfo.confirmPassword != 0 &&
            userInfo.password !== userInfo.confirmPassword) {
            return <p className="text-danger py-1">Your confirmation password is not matching!</p>
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target

        // if typing in 'username' field
        if (name === 'username') {
            setValidUser(null) // to clear info message
            clearTimeout(timer) // reset timer

            const newTimer = setTimeout(() => {
                // make api call to check if username is valid
                Axios.get(
                    `https://insta.nextacademy.com/api/v1/users/check_name?username=${value}`
                ).then(response => {
                    console.log(response)
                    setValidUser(response.data.valid ? 'valid' : 'invalid')
                })
            }, 500)
            setTimer(newTimer)
        }

        setUserInfo({
            ...userInfo,
            // username: userInfo.username,
            // email: userInfo.email,
            // password: userInfo.password,
            // confirmPassword: '',
            [name]: value
            // [e.target.name]:e.target.value
        })


    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        Axios.post(postSignUp, {
            username,
            email,
            password,
            // username: userInfo.username,
            // email: userInfo.email,
            // password: userInfo.password,
        })
            .then(result => {
                setLoading(false)
                console.log(result)
                localStorage.setItem("jwt",result.data.auth_token)
                localStorage.setItem("user",JSON.stringify(result.data.user))
                //toast not working
                toast.success(result.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                })
                toggleModal()
            })
            .catch(error => {
                setLoading(false)
                console.log(error.response)
                error.response.data.message.forEach(msg => toast.error(msg, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                }))
            })

    }

    const notEmpty =
        username.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword
    // userInfo.username.length > 0 &&
    // userInfo.email.length > 0 &&
    // userInfo. password.length > 0 &&
    // userInfo. confirmPassword.length > 0


    //How to set toggleModal only after succesful posting of API?
    return (
        <Form>
            <FormGroup>
                <Label>Username</Label>
                <Input type="text" name="username" value={username} placeholder="Set your Username here." onChange={handleInput} />
                {displayHelperMessage()}
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" value={email} placeholder="Enter your email here." onChange={handleInput} />
            </FormGroup>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password" value={password} placeholder="Set your password here." onChange={handleInput} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Confirm Password</Label>
                        <Input type="password" name="confirmPassword" value={confirmPassword} placeholder="Please confirm password." onChange={handleInput} />
                        {confirmPasswordMessage()}
                    </FormGroup>
                </Col>
            </Row>
            <StyledButton disabled={!notEmpty} onClick={handleSubmit} color="primary">{loading ? 'Signing Up...' : 'Sign Up'}</StyledButton>
            <StyledButton onClick={toggleModal}>Cancel</StyledButton>
        </Form>
    )
}

export default SignupForm