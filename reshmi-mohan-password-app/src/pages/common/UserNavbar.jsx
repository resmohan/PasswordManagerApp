import { NavLink } from "react-router-dom"
import './Navbar.css'
import { useContext } from "react"
import { userNameContext } from "../../App"
import profileImage from '../../images/ProfileImage.png'
import axios from "axios"

export default function UserNavbar(){
    const [userName, setUserName] = useContext(userNameContext)

    async function logoutUser(){
        //logic to logut user
        try{
            await axios.post('/api/users/logout')
        }catch (error){
            console.log('Error in logging out: '+error)
            return;
        } 
        setUserName('')
    }

    return(
        <>
        <div className="navArea">
        </div>
        <div className="navLinks">
            <NavLink className='link' to={'/'}>Home</NavLink>
            <NavLink className='link' to={'/manage'}>Manage Passwords</NavLink>
            <NavLink className='link' to={'/logout'} onClick={logoutUser}>Logout</NavLink>
            <img className="image" src={profileImage} alt={userName} title={userName}></img>
        </div>
        </>
    )
}