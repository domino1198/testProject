import React, {useEffect, useState} from "react";
import {Form} from "../components/form";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {getToken} from "../redux/action";
import {getStatusErrorSelector, getTokenSelector} from "../redux/selectors";


export type authData = { login: string, password: string }


export const AuthPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<authData>({login: '', password: ''})
    const [error, setError] = useState<string>('')
    const dispatch = useAppDispatch()
    const err = useAppSelector(getStatusErrorSelector)
    const token = useAppSelector(getTokenSelector)

    const Auth = async () => {
        try {
            setError("")
            await dispatch(getToken(formData))
        } catch (e) {

        }
    }

    useEffect(() => {
        token ? navigate('/contacts') : err === 'failed' && setError('Неверное имя пользователя или пароль')
    }, [err, token, navigate])

    return (<Form auth={Auth} error={error} controls={[formData, setFormData]}/>)
}
