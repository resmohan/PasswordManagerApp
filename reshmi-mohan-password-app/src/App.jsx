import './App.css'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/account/Login'
import Register from './pages/account/Register'
import PasswordManager from './pages/password/PasswordManager'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Logout from './pages/account/Logout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/manage',
    element: <PasswordManager/>
  },
  {
    path: '/logout',
    element: <Logout/>
  }
])

export const userNameContext = createContext();

export default function App() {
  const [userName, setUserName] = useState('');

  useEffect( () => {
    isUserLoggedIn();
  },[]);

  async function isUserLoggedIn(){
    try{
      const resp = await axios.get('/api/users/loggedIn')
      if(resp.data.username){
          setUserName(resp.data.username);
      }
    }catch (error){
      console.log('Error in logged in check: '+error)
    }
  }

  return (
    <>
    <div className='appContainer'>
      <userNameContext.Provider value={[userName, setUserName]}>
        <RouterProvider router={router}></RouterProvider>
      </userNameContext.Provider>
    </div> 
    </>
  )
}
