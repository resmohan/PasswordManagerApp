import { useContext, useState } from 'react';
import './CreatePassword.css'
import { userNameContext } from '../../App';
import axios from 'axios';
import { passwordListContext } from './PasswordManager';

const urlValueIdentifier = "urlValue";
const passwordIdentifier = "password";
const lengthIdentifier = "length";
const alphabetIdentifier = "alphabet";
const numeralIdentifier = "numeral";
const symbolIdentifier = "symbol";
export default function CreatePassword(){
    const [userName, setUserName] = useContext(userNameContext)
    const [errorMsg, setErrorMsg] = useState('');
    const [passwordList, setPasswordList] = useContext(passwordListContext)

    function generatePassword(length, alphabet, numeral, symbol){
        let charSet = '', password = '';
        if(alphabet){
            charSet += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            password += charSet.charAt(getRandomNumber(0,51))
        }
        if(numeral){
            charSet += '0123456789'
            password += '0123456789'.charAt(getRandomNumber(0,9))
        }
        if(symbol){
            charSet += '!@#$'
            password += '!@#$'.charAt(getRandomNumber(0,3))
        }
        length -= password.length;
        while(length > 0){
            password += charSet.charAt(getRandomNumber(0,charSet.length-1))
            length--
        }
        return password
    }

    function getRandomNumber(minVal, maxVal){
        return (Math.floor(Math.random() * (maxVal-minVal+1) + minVal));
    }

    async function onCreateSubmit(e){
        // Prevent the browser from reloading the page
        e.preventDefault();

        setErrorMsg('')
    
        // Read the form data
        const formData = new FormData(e.target);

        let password = formData.get(passwordIdentifier);
        //check if password is provided; if not check other validations
        if(!password){
            const length = formData.get(lengthIdentifier);
            const alphabet = formData.get(alphabetIdentifier);
            const numeral = formData.get(numeralIdentifier);
            const symbol = formData.get(symbolIdentifier);
            if(alphabet || numeral || symbol){
                //generate password
                password = generatePassword(length, alphabet, numeral, symbol)
            }
            else{
                setErrorMsg('Please select at least one of the checkboxes.')
                return;
            }
        }

        //logic to create the user password
        try{
            const resp = await axios.post('/api/userPasswords/create', {
                urlValue: formData.get(urlValueIdentifier),
                password: password,
                username: userName
            })
            setPasswordList([...passwordList, resp.data])
        }catch (error){
            console.log('Error in creating user password: '+error)
            return;
        }  
        e.target.reset()
    }

    return(
        <>
        <div className="createPswd">
            <h3>Create Password</h3>
            <form className="createForm" onSubmit={onCreateSubmit}>
                <div>
                    <label className="createLabel">Url Value </label>
                    <input name={urlValueIdentifier} className="createInput createText" placeholder="url value" required={true}></input>
                </div>
                <div>
                    <label className="createLabel">Password</label>
                    <input name={passwordIdentifier} className="createInput createText" placeholder="password"></input> 
                </div>
                <div>
                    <label className="createLabel">Length</label>
                    <input name={lengthIdentifier} className="createInput createLengthField" type='number' placeholder="length" min={4} max={50} width={5} defaultValue={8}></input>
                    <input name={alphabetIdentifier} className="createInput" type='checkbox' defaultChecked={true}></input>
                    <label className="createLabel">Alphabets</label> 
                    <input name={numeralIdentifier} className="createInput" type='checkbox' defaultChecked={true}></input>
                    <label className="createLabel">Numerals</label>                    
                    <input name={symbolIdentifier} className="createInput" type='checkbox' defaultChecked={true}></input>
                    <label className="createLabel">Symbols</label>
                </div>  
                {errorMsg && <f className="errorMsg">{errorMsg}</f>}               
                <button className="createSubmit">Submit</button>
            </form>
        </div>
        </>
    );
}