import './Login.css'
import '../common/Common.css'
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userNameContext } from "../../App";
import DefaultNavbar from '../common/DefaultNavbar';

const userNameIdentifier = "userName";
const passwordIdentifier = "password";
export default function Login(){
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
    }, [])

    async function handleSubmit(e){
        // Prevent the browser from reloading the page
        e.preventDefault();

        setErrorMsg('')
    
        // Read the form data
        const formData = new FormData(e.target);
        let username = formData.get(userNameIdentifier)

        //logic to verify the user details
        try{
            const resp = await axios.post('/api/users/login', {
                username: username,
                password: formData.get(passwordIdentifier)
            })
            if(resp.data.length === 0){
                setErrorMsg("Invalid login credentials. Please check your username or password.");
                return;
            }
            setUserName(username)
            navigate('/manage')
        }catch (error){
            console.log('Error in finding user: '+error)
            return;
        }               
    }

    return(
        <>
        <div className="pageOutline">
            <DefaultNavbar></DefaultNavbar>
            <div className="login">
                <h1>Login</h1>
                <form className="form"  onSubmit={handleSubmit}>
                    <label className="label">User Name</label>
                    <input name={userNameIdentifier} placeholder="user name" required={true}></input>
                    <label className="label">Password</label>
                    <input name={passwordIdentifier} placeholder="password" required={true} type="password"></input>  
                    {errorMsg && <f className="errorMsg">{errorMsg}</f>}                    
                    <button className="submit">Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}