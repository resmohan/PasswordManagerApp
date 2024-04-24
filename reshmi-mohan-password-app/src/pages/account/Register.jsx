import './Register.css'
import '../common/Common.css'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userNameContext } from "../../App";
import DefaultNavbar from '../common/DefaultNavbar';

const userNameIdentifier = "userName";
const passwordIdentifier = "password";
const confirmPasswordIdentifier = "confirmPassword";

export default function Register(){
    const [userName, setUserName] = useContext(userNameContext)
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    async function isUserLoggedIn(){  
        try{            
            const resp = await axios.get('/api/users/loggedIn')
            //user already logged in; redirect to password manager page
            if(resp.data.username){
                navigate('/manage')
            }
        }catch (error){
        }
    }

    //check if user already logged in; if so redirect to home page
    useEffect(() => {
        isUserLoggedIn()
    },[])
    
    async function handleSubmit(e){
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        setErrorMsg('')
    
        // Read the form data
        const formData = new FormData(e.target)

        //logic to check if passwords match
        let passwordVal = formData.get(passwordIdentifier);
        let confirmPasswordVal = formData.get(confirmPasswordIdentifier);
        if(passwordVal !== confirmPasswordVal){
            setErrorMsg("Passwords do not match. Please try again.");
            return;
        }

        //logic to check if username is unique
        let userNameVal = formData.get(userNameIdentifier);
        try{
            const resp = await axios.get('/api/users/userExists/'+userNameVal)
            //user exists with same name
            if(resp.data.length !== 0){
                setErrorMsg("Username already taken. Please choose a unique username.");
                return;
            }
        }catch (error){
        }
        
        //logic to save the user details
        try{
            const resp = await axios.post('/api/users/register', {
                username: userNameVal,
                password: passwordVal
            })
            setUserName(userNameVal) 
            navigate('/manage')
        }catch (error){
            console.log('Error in saving user: '+error)
            return;
        }              
    }

    return(
        <>
        <div className="pageOutline">
            <DefaultNavbar></DefaultNavbar>
            <div className="register">
                <h1>Register</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label className="label">User Name</label>
                    <input name={userNameIdentifier} placeholder="user name" required={true}></input>
                    <label className="label">Password</label>
                    <input name={passwordIdentifier} placeholder="password" required={true}></input>
                    <label className="label">Confirm Password</label>
                    <input name={confirmPasswordIdentifier} placeholder="confirm password" required={true}></input> 
                    {errorMsg && <f className="errorMsg">{errorMsg}</f>}                  
                    <button className="submit" type="submit">Submit</button>
                </form>
           </div>
        </div>
        </>
    )
}