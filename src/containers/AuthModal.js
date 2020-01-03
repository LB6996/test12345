import React, { useState } from 'react';
import styled from 'styled-components';
import {
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const StyledModal = styled(Modal)`
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
`
//How to set size of Modal to be responsive with different form??

const AuthModal = ({loginInUser}) => {
    const [showModal, setShowModal] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    const toggleModal = () => setShowModal(!showModal)
    const toggleForm = () => setIsLogin(!isLogin)

    return (
        <>
            <DropdownItem onClick={toggleModal}>Login</DropdownItem>
            <StyledModal isOpen={showModal} toggle={toggleModal} >
                <ModalHeader>
                    {isLogin ? 'Login Form' : 'Signup Form'}
                </ModalHeader>
                <ModalBody>
                    {isLogin ? <LoginForm loginInUser={loginInUser} toggleModal={toggleModal} /> : <SignupForm toggleModal={toggleModal}/>}
                    <br></br>
                    <a onClick={toggleForm} href='#'>
                        {isLogin ? 'Not a member? Click here to sign up!' : 'Already a member? Click here to log in!'}
                    </a>
                    
                </ModalBody>
                {/* <ModalFooter>
                    <Button color='primary'>
                        {isLogin ? 'Log in' : 'Sign up'}
                    </Button>
                    <Button color='secondary' onClick={toggleModal}>Cancel</Button>
                </ModalFooter> */}
            </StyledModal>
        </>
            )
        }
        
export default AuthModal