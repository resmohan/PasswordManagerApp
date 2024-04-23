import { useContext, useState } from 'react';
import './EditPassword.css'
import axios from 'axios';
import { editingModeContext, urlPasswordContext } from './PasswordManager';

const urlValueIdentifier = "urlValue";
const passwordIdentifier = "password";
export default function EditPassword(){
    const [editingMode, setEditingMode] = useContext(editingModeContext)
    const [urlPassword, setUrlPassword] = useContext(urlPasswordContext)

    async function onEditSubmit(e){
        // Prevent the browser from reloading the page
        e.preventDefault();
        setEditingMode(false)

        // Read the form data
        const formData = new FormData(e.target);

        updateUserPassword(formData.get(urlValueIdentifier), formData.get(passwordIdentifier))
    }

    async function updateUserPassword(urlValue, password){
        try{
            const resp = await axios.put('/api/userPasswords/'+urlPassword.id, {
                urlValue: urlValue,
                password: password,
            })
        }catch (error){
            console.log('Error in editing user password: '+error)
        }  
    }

    function onCancel(){
        setEditingMode(false)
    }

    return(
        <>
        <div className="editPswd">
            <h3>Edit Url Password</h3>
            <form className="editForm" onSubmit={onEditSubmit}>
                <div>
                    <label className="editLabel">Url Value </label>
                    <input name={urlValueIdentifier} className="editInput editText" required={true} defaultValue={urlPassword.urlValue}></input>
                </div>
                <div>
                    <label className="editLabel">Password</label>
                    <input name={passwordIdentifier} className="editInput editText" required={true} defaultValue={urlPassword.password}></input> 
                </div>  
                <div className='buttonDiv'>
                    <button type='submit' className="editSubmit">Submit</button>
                    <button type='button' className="editSubmit" onClick={onCancel}>Cancel</button>
                </div>            
            </form>
        </div>
        </>
    );
}