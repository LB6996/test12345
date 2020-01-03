import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Button
} from 'reactstrap';
import styled from 'styled-components'
import { Link } from "react-router-dom"
import AuthModal from '../containers/AuthModal';
import logo1 from '../Images/logo1.png'
import { toast } from 'react-toastify';
import Axios from 'axios';

const StyledNavbarBrand = styled(NavbarBrand)`
background-image: src(logo1);  // HOW?!
`


const Navigator = () => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('jwt'))
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    const loginInUser = (userInfo) => {
        Axios.post('https://insta.nextacademy.com/api/v1/login', {
            username: userInfo.username,
            password: userInfo.password
        }).then(result => {
            console.log(result.data)
            localStorage.setItem("jwt", result.data.auth_token)
            localStorage.setItem("user", JSON.stringify(result.data.user))
            toast.success('You have successfully logged into your account.')
            setIsLogin(true)
            setCurrentUser(result.data.user)
        }).catch(error => {
            console.log(error)
            toast.error('the Username or Password you have entered are invalid!')
        })
    }
    const logOutUser = () => {
        localStorage.clear()

    }
    return (
        <>
            <Navbar color='light' light expand='md' className='bg-white border-bottom px-5 py-3'>
                <StyledNavbarBrand href="/">Nextagram</StyledNavbarBrand>
                <Nav className='ml-auto' navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>Menu</DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={Link} to="/">Home</DropdownItem>
                            <DropdownItem divider />
                            {
                                isLogin ?
                                    <>
                                        <DropdownItem tag={Link} to="/users/1">MyProfile</DropdownItem>
                                        <DropdownItem onClick={logOutUser}>Logout</DropdownItem>
                                    </>
                                    :
                                    <AuthModal loginInUser={loginInUser} />
                            }
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
            <h1>hello</h1>
        </>
    )
}

export default Navigator
