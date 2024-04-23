import '../common/Common.css'
import './PasswordManager.css'
import CreatePassword from "./CreatePassword";
import SharePassword from "./SharePassword";
import PasswordNotification from "./PasswordNotification";
import ListPassword from "./ListPassword";
import { createContext, useContext, useState } from "react";
import { userNameContext } from "../../App";
import UserNavbar from '../common/UserNavbar'
import DefaultNavbar from '../common/DefaultNavbar'
import EditPassword from "./EditPassword";

export const passwordListContext = createContext();
export const editingModeContext = createContext();
export const urlPasswordContext = createContext();

export default function PasswordManager(){
    const [userName, setUserName] = useContext(userNameContext)
    const [editingMode, setEditingMode] = useState(false);
    const [passwordList, setPasswordList] = useState('')
    const [urlPassword, setUrlPassword] = useState({id:'', urlValue:'', password: ''})

    return (
        <>
        <div className="pageOutline">
            {userName && <UserNavbar/>}  
            {!userName && <DefaultNavbar/>}
            <div className="pswdManager">
                <passwordListContext.Provider value={[passwordList, setPasswordList]}>
                <editingModeContext.Provider value={[editingMode, setEditingMode]}>
                    <CreatePassword/>
                    <SharePassword/>
                    <PasswordNotification/>
                    <urlPasswordContext.Provider value={[urlPassword, setUrlPassword]}>
                        {editingMode && <div className="editPswd"><EditPassword/></div>}
                        {!editingMode && <div className="listPswds"><ListPassword/></div>}
                    </urlPasswordContext.Provider> 
                </editingModeContext.Provider>
                </passwordListContext.Provider>
            </div>
        </div>
        </>
    );
}