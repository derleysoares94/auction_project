import { createContext, use, useContext, useEffect, useState } from 'react';

import { authenticated_user } from '../api/endpoints';

import { login } from '../api/endpoints';

import { register } from '../api/endpoints';

import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    const get_authenticated_user = async () => {
        try {
            const success = await authenticated_user();
            setIsAuthenticated(success)
        } catch {
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }   
    }

    const login_user = async (username, password) => {
        try {
            const success = await login(username, password);
            if (success) {
                setIsAuthenticated(true)
                nav('/')
            }
        } catch {
            setIsAuthenticated(false)
        }
    }

    const register_user = async (username, email, password, passwordConfirm, userType) => {
        if (password === passwordConfirm) {
            const success = await register(username, email, password, userType);
            alert('User registered')
            nav('/login')
        }else {
            alert('Passwords do not match')
        }
    }

    useEffect(() => {
        get_authenticated_user()
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login_user, register_user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);