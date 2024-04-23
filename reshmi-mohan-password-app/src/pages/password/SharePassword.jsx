import { useContext, useState } from 'react';
import './SharePassword.css'
import { userNameContext } from '../../App';
import axios from 'axios';

const userNameIdentifier = "userName";
export default function SharePassword(){
    const [userName, setUserName] = useContext(userNameContext)
    const [errorMsg, setErrorMsg] = useState('');

    async function onSubmit(e){
        // Prevent the browser from reloading the page
        e.preventDefault();

        setErrorMsg('')

        // Read the form data
        const formData = new FormData(e.target);

        //logic to check if username is valid
        let userNameVal = formData.get(userNameIdentifier);
        if(userNameVal === userName){
            setErrorMsg('Please choose a username different from your own name.')
            return;
        }

        //logic to check if username exists
        try{
            const resp = await axios.get('/api/users/userExists/'+userNameVal)
            //user does not exist
            if(resp.data.length === 0){
                setErrorMsg("The username you have entered is not valid");
                return;
            }
        }catch (error){
            console.log('Error in get user: '+error)
            return;
        }

        //logic to save the share request
        try{
            const resp = await axios.post('/api/shareRequests/create', {
                requester: userName,
                requestee: userNameVal
            })
        }catch (error){
            console.log('Error in saving share request: '+error)
            return;
        } 
        alert('Request to share password has been submitted.')
        e.target.reset()
    }

    return (
        <>
        <div className="sharePswd">
            <h3>Share Passwords</h3>
            <form className="shareForm" onSubmit={onSubmit}>
                <label className='shareVal'>User Name </label>
                <input name={userNameIdentifier} className='shareVal shareInput' placeholder="user name" required={true}></input>
                <button className="shareSubmit">Submit</button>
            </form>
            {errorMsg && <f className="errorMsg">{errorMsg}</f>}
        </div>
        </>
    )
}