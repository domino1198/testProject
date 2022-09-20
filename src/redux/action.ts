import {createAsyncThunk} from "@reduxjs/toolkit";
import {authData} from "../pages/auth";

type responseServer = {
    token: string
}


export const getToken = createAsyncThunk(
    'users/auth',
    async (formData: authData) => {
        try{
            const response: responseServer = await fetch('/auth', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({login: formData.login, password: formData.password})
            }).then(res => res.json())
            localStorage.setItem('token', JSON.stringify(response.token))
            return !!response.token
        } catch (err) {
            throw err;
        }

    }
)
