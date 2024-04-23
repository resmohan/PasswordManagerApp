import { useContext, useEffect, useState } from 'react'
import './PasswordNotification.css'
import axios from 'axios'
import { passwordListContext } from './PasswordManager'

export default function PasswordNotification(){
    const [notifications, setNotifications] = useState('')
    const [statusChange, setStatusChange] = useState(false)
    const [passwordList, setPasswordList] = useContext(passwordListContext)

    //retrieve all user notifications
    async function findAllNotifications(){
        try{
            const resp = await axios.get('/api/shareRequests')
            setNotifications(resp.data)
        }catch (error){
            console.log('Error in get user password: '+error)
            return;
        }
    }

    useEffect(() => {
        findAllNotifications();
    },[statusChange]);

    //update the status of notification
    async function updateStatus(id, status){
        try{
            const resp = await axios.put('/api/shareRequests/'+id, {
                status: status
            })
        }catch (error){
            console.log('Error in updateStatus: '+error)
            return;
        }    
    }

    //once a request is approved, refresh the password page
    async function refreshPasswords(requester){
        //retrieve the user passwords of requester
        const resp = await axios.get('/api/userPasswords/'+requester);
        let responseList = resp.data;
        setPasswordList([...passwordList, ...responseList])
    }

    //function to handle approve logic
    function handleApprove(id, requester){
        updateStatus(id, 'approved')
        setStatusChange(!statusChange)
        refreshPasswords(requester)
        alert('Request to share passwords has been approved')
    }

    //function to handle reject logic
    function handleReject(id){
        updateStatus(id, 'rejected')
        setStatusChange(!statusChange)
        alert('Request to share passwords has been rejected')
    }

    const notifData = [];
    for(let i=0;i<notifications.length;i++){
        notifData.push(
            <div className='shareNotifDiv'>
                Password sharing request received from {notifications[i].requester}
                <button className='notifButton' onClick={() => handleApprove(notifications[i]._id, notifications[i].requester)}>Approve</button>
                <button className='notifButton' onClick={() => handleReject(notifications[i]._id)}>Reject</button>
            </div>
        );
    }

    return (
        <>
        <div className='pswdNotification'>
            <h3>Share Password Notifications</h3>
            {notifData}
        </div>
        </>
    )
}