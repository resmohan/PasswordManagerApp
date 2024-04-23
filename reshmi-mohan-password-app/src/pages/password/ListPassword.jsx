import { useContext, useEffect } from 'react'
import './ListPassword.css'
import { userNameContext } from '../../App'
import axios from 'axios'
import { editingModeContext, passwordListContext, urlPasswordContext } from './PasswordManager'
import { useNavigate } from 'react-router-dom'
import editIcon from '../../images/EditIcon.png'
import deleteIcon from '../../images/DeleteIcon.png'

export default function ListPassword(){
    const [passwordList, setPasswordList] = useContext(passwordListContext)
    const [userName, setUserName] = useContext(userNameContext)
    const [editingMode, setEditingMode] = useContext(editingModeContext)
    const [urlPassword, setUrlPassword] = useContext(urlPasswordContext)
    const navigate = useNavigate();

    //check if user is logged in; if not redirect to main page
    async function isUserLoggedIn(){  
        try{
            const resp = await axios.get('/api/users/loggedIn')
            setUserName(resp.data.username)
        }catch (error){
            console.log('Error in logged in check: '+error)
            navigate('/')
        }
    }

    //get the user password details of the current user and shared ones
    async function findUserPasswords(){
        try{
            const resp = await axios.get('/api/userPasswords/');
            await setPasswordList(resp.data)
        }catch (error){
            console.log('Error in get user password: '+error)
            return;
        }
    }

    useEffect(() => {
        isUserLoggedIn().then(() => {
            findUserPasswords();
        })    
    }, [])

    function handleEdit(id, urlValue, password){
        setEditingMode(true)
        setUrlPassword({id:id, urlValue:urlValue, password:password})
    }

    async function deleteAndRefreshPassword(id){
        try{
            const resp = await axios.delete('/api/userPasswords/'+id)
        }catch (error){
            console.log('Error in deleting user password: '+error)
        }  
        findUserPasswords()
    }

    function handleDelete(id){
        deleteAndRefreshPassword(id)  
    }

    function addUrlPswdDetails(urlPswdValues, passwordListVal){
        urlPswdValues.push(<tr>
            <td align='center' className='tableData'>{passwordListVal.urlValue}</td>
            <td align='center' className='tableData'>{passwordListVal.password}</td>
            <td align='center' className='tableData'>{passwordListVal.username}</td>
            <td align='center' className='tableData'>{passwordListVal.updatedAt}</td>
            {userName === passwordListVal.username && <td align='center' className='tableData'><img  className='iconImage' src ={editIcon} onClick={() => handleEdit(passwordListVal._id, passwordListVal.urlValue, passwordListVal.password)}></img></td>}
            {userName === passwordListVal.username && <td align='center' className='tableData'><img className='iconImage' src ={deleteIcon} onClick={() => handleDelete(passwordListVal._id)}></img></td>}
        </tr>)
    }

    const selfUrlPswdValues = [];
    const otherUrlPswdValues = [];
    for(let i=0;i<passwordList.length;i++){
        if(userName === passwordList[i].username){
            addUrlPswdDetails(selfUrlPswdValues, passwordList[i])
        }
        else{
            addUrlPswdDetails(otherUrlPswdValues, passwordList[i])
        }
    }

    return (
        <>
        <div className='listPswd'>
            <h3>Url and Password Details</h3>
            <div>
                <table id="pswdDetailsTable">
                    <tr>
                        <th className='tableHeader'>Url Value</th>
                        <th className='tableHeader'>Password</th>
                        <th className='tableHeader'>Owner</th>
                        <th id="lastUpdated" className='tableHeader'>Last Updated On</th>
                        <th className='tableHeader'>Update</th>
                        <th className='tableHeader'>Delete</th>
                    </tr>  
                    {selfUrlPswdValues}
                    {otherUrlPswdValues}
                </table>
            </div>
        </div>
        </>
    )
}