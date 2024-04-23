import { useContext } from 'react'
import './Home.css'
import './common/Common.css'
import { userNameContext } from '../App'
import UserNavbar from './common/UserNavbar'
import DefaultNavbar from './common/DefaultNavbar'

export default function Home(){
    const [userName, setUserName] = useContext(userNameContext)

    return(
    <>
    <div className="pageOutline">
        {userName && <UserNavbar/>}  
        {!userName && <DefaultNavbar/>}
        <div className="home">
            <div className="homeContent">            
                <h1 className="header">SecurePassHub</h1>
                <div className="description">
                    <p>SecurePassHub is a robust password management platform designed to simplify your digital life. With SecurePassHub, users can securely track, create, and organize their passwords—all in one place.</p>
                    <p>Here is what it offers:</p>
                    <ul>
                        <li>Centralized Password Storage: Easily manage all your login credentials within our intuitive interface. No more struggling to remember multiple passwords!</li>
                        <li>Customizable Password Creation: Create new passwords effortlessly. If you provide a password, we will use it; otherwise, our smart algorithms will generate a strong, unique password for you.</li>
                        <li>Emergency Sharing: Share passwords with trusted contacts in case of urgent situations. Whether it's for family members, colleagues, or close friends, SecurePassHub ensures seamless collaboration.</li>
                        <li>User-Friendly Interface: Upon visiting the website, users are greeted with a clean home screen, offering login and account creation options.</li>
                    </ul>           
                    <p>Stay secure and organized with SecurePassHub—your ultimate password companion!</p>
                </div>
                <div className="credits">
                    <p>Credits: Reshmi Mohan</p>
                </div>
            </div>
        </div>
    </div>
    </>
    )    
}