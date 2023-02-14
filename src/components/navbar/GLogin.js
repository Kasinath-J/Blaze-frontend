import React,{ useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {NavDropdown,ToastContainer,Toast} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { axiosInstance } from '../axios/loggedoutAxios';

// https://www.npmjs.com/package/@react-oauth/google

export function GLogin(){

    const [isLogged,setIsLogged] = useState(localStorage.getItem("credential")!==null);
    const [failure,setFailure] = useState(null);
    
    const [toast, setToast] = useState(true);
    const toggleToast = () => setToast(!toast);
    return(
        <>
        {
            isLogged===false ?
          
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID}>
                    <GoogleLogin
                        size="medium"
                        text="signin"
                        onSuccess={(credentialResponse) => {
                            
                            setIsLogged((prev)=>{
                                axiosInstance.post(`users/verifyemail/`,{
                                    "credential":credentialResponse.credential
                                })
                                .then(resp => resp.data)
                                .then(resp => {
                                    if(resp===true )
                                    {
                                        if(jwt_decode(credentialResponse.credential)['email_verified']===true)
                                        {
                                            localStorage.setItem("credential",credentialResponse.credential);
                                            localStorage.setItem("photo",jwt_decode(credentialResponse.credential)['picture']);
                                            localStorage.setItem("email",jwt_decode(credentialResponse.credential)['email']);
                                            localStorage.setItem("name",jwt_decode(credentialResponse.credential)['name']);
                                            window.location.reload();
                                            return true;
                                        }
                                        else{
                                            setFailure("Login Failure");
                                            setToast(true);
                                        }
                                    }
                                    else
                                    {
                                        setFailure("Not authorized to login, contact admin");
                                        setToast(true);
                                    }
                                })
                                return false;
                            });

                          }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    {
                        failure!==null&& <ToastContainer className="p-3" position="top-center">
                                <Toast show={toast} onClose={toggleToast} delay={2000} autohide>
                                    <Toast.Header>
                                        <strong className="me-auto">{failure}</strong>
                                    </Toast.Header>
                                </Toast>
                            </ToastContainer>
                        
                    }
            </GoogleOAuthProvider>

            :
            
            <div >
                
                    <NavDropdown title={
                        <img src={localStorage.getItem("photo")} alt="logged in" height="28px" style={{margin:"0px",padding:"0px",borderRadius:"28px"}} />
                    } id="navbarScrollingDropdown" >
                        <LinkContainer to={"/user/"+localStorage.getItem("email")}>
                            <NavDropdown.Item >View Portfolio</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/updateProfile">
                            <NavDropdown.Item >
                                Update Portfolio
                            </NavDropdown.Item>
                        </LinkContainer>
                        
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={
                            ()=>{
                                localStorage.removeItem("credential");
                                localStorage.removeItem("photo");
                                localStorage.removeItem("email");
                                localStorage.removeItem("name");
                                setIsLogged(false);
                                window.location.reload();
                            }
                        }>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                
            </div>

          }
        </>
        
    );
}


