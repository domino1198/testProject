import React, {Dispatch, useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {authData} from "../../pages/auth";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";

interface IForm {
    controls: [authData, Dispatch<authData>],
    error: string,
    auth: () => Promise<void>
}

export const Form = ({controls: [formData, setFormData], error, auth}: IForm) => {

    const [showPass, setShowPass] = useState(false)

    const handleShowPassword = () => setShowPass(!showPass)

    return (
        <Box
            component="form"
            style={{display: 'flex', flexDirection: 'column'}}
            noValidate
            autoComplete="off">
            <Typography style={{textAlign:'center'}} variant="h4" gutterBottom>Authorization</Typography>
            <TextField
                error={error !== ''}
                id="login"
                value={formData.login}
                onChange={(e) => setFormData({...formData, login: e.target.value})}
                label="Login"
                margin="normal"
                helperText={error !== '' ? error : null}
            />
            <TextField
                error={error !== ''}
                id="password"
                margin="normal"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                value={formData.password}
                label="Password"
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                            >
                                {showPass ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                }}
                type={showPass ? 'text' : 'password'}
                helperText={error !== '' ? error : null}
            />
            <Button sx={{marginTop:2}} onClick={auth} variant="contained">Sign in</Button>
        </Box>
    )
}
