import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { authenticated_user, login, logout, register, NewCompany } from '../api/endpoints';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    const get_authenticated_user = async () => {
        try {
            const user = await authenticated_user();
            setUser(user);
        } catch (error) {
            setUser(null); // If the request fails, set the user to null
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };

    const loginUser = async (username, password) => {
        setLoading(true);
        try {
            const user = await login(username, password);
            setUser(user);
            nav('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Incorrect username or password');
            } else {
                alert('Error logging in');
            }
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        await logout();
        nav('/login')
    }

    const registerCompany = async (companyName, companyEmail, companyPassword, companyPasswordConfirm) => {
        try {
            if (companyPassword === companyPasswordConfirm) {
                await NewCompany(companyName, companyEmail, companyPassword)
                alert('Company successfully registered')
                nav('/login')
            }
        } catch {
            alert('error registering company')
        }
    }

    const registerUser = async (username, email, password, confirm_password) => {
        try {
            if (password === confirm_password) {
                await register(username, email, password)
                alert('User successfully registered')
                nav('/login')
            }
        } catch {
            alert('error registering user')
        }
    }

    useEffect(() => {
        get_authenticated_user();
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser, registerCompany }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};