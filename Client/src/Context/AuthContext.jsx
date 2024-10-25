import axios from 'axios';
import React, { createContext} from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext()

function AuthProvider(props) {
    const [isLogin,setIsLogin] = useState(false)
    const [token,setToken] = useState(false)
    const [user,setUser] = useState(false)

    let logoutHandler = async ()=>{
        if(window.confirm(`Are you sure to logout`)){
            await axios.get(`/api/auth/logout`)
                    .then(res =>{
                        toast.success(res.data.msg)
                        setIsLogin(false)
                        setToken(false)
                        window.location.reload()
                    })
                    .catch(err => toast.error(err.response.data.msg))

        }
    }
    return (
        <AuthContext.Provider value={{isLogin, user, setIsLogin, setUser, token, setToken,logoutHandler}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
