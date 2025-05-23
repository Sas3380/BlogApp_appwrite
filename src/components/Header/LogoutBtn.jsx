import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/config'
import {logout} from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()//usedispatch is a hook that allows you to dispatch actions to the redux store
    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())//that the code dispatches a logout() action to the redux store
        }).catch(()=>{})//TODO:
        //logout is promise
    }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        Logout
    </button>
  )
}

export default LogoutBtn