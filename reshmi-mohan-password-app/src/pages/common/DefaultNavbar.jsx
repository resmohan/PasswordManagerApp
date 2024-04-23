import { NavLink } from "react-router-dom"
import './Navbar.css'

export default function DefaultNavbar(){
    return(
    <>
    <div className="navArea"></div>
    <div className="navLinks">
        <NavLink className='link' to={'/'}>Home</NavLink>
        <NavLink className='link' to={'/login'}>Login</NavLink>
        <NavLink className='link' to={'/register'}>SignUp</NavLink>
    </div>
    </>
    )   
}