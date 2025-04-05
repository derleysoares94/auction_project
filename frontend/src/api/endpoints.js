import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/'
const LOGIN_URL = `${BASE_URL}users/token/`
const REFRESH_URL = `${BASE_URL}users/token/refresh/`
const AUCTIONS_URL = `${BASE_URL}auction/auctions/`
const LOGOUT_URL = `${BASE_URL}users/logout/`
const AUTHENTICATED_URL = `${BASE_URL}users/authenticated/`
const REGISTER_URL = `${BASE_URL}users/register/`


export const login = async (username, password) => {
    try {
        const response = await axios.post(LOGIN_URL,
            { username:username, password:password },   
            { withCredentials: true }  // Ensures cookies are included
        );

        return response.data.success
    } catch (error) {
        console.error("Login failed:", error);
        return false; 
    }
}

export const refresh_token = async () => {
    try {
        await axios.post(REFRESH_URL,
            {},
            { withCredentials: true }
        )
        return true
    } catch (error) {
        return false
    }
}

const call_refresh = async (error, func) => {
    if (error.response && error.response.status === 401) {
        const tokenRefreshed = await refresh_token();
        if (tokenRefreshed) {
            const retryResponse = await func();
            return retryResponse.data
        }
    }
    return false
}

export const logout = async () => {
    try {
        await axios.post(LOGOUT_URL,
            {},
            { withCredentials: true }
        )
        return true
    } catch (error) {
        return false
    }
}

export const authenticated_user = async () => {
    try {
        const response = await axios.post(AUTHENTICATED_URL, {}, { withCredentials: true });

        return response.data
    } catch {
        return false
    }
}

export const register = async (username, email, password, user_type) => {
    try {
        const response = await axios.post(REGISTER_URL,
            { username, email, password, user_type },
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        return false; 
    }

}

export const new_auction = async (formData) => {
    try {
        const response = await axios.post(AUCTIONS_URL, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        return call_refresh(error, axios.get(AUCTIONS_URL, { withCredentials: true }));
    }
}

export const get_auctions = async () => {
    try {
        const response = await axios.get(AUCTIONS_URL,
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.get(AUCTIONS_URL, { withCredentials: true }))
    }
}