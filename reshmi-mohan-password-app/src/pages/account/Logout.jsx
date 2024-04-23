import DefaultNavbar from '../common/DefaultNavbar'
import './Logout.css'
import '../common/Common.css'

export default function Logout(){
    return (
        <>
        <div className="pageOutline">
            <DefaultNavbar/>
            <div className='logout'>
                <h2>You have been successfully logged out.</h2>
            </div>
        </div>
        </>
    )
}