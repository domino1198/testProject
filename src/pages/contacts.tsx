import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {getContactSelector, getTokenSelector} from "../redux/selectors";
import {useNavigate} from "react-router-dom";
import {Box, Button, InputBase} from "@mui/material";
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import {ContactComponent} from "../components/contact";
import {changeContact, changeToken, Contact} from "../redux/slice";


export const ContactsPage = () => {

    const navigate = useNavigate();

    const token = useAppSelector(getTokenSelector);
    const contacts = useAppSelector(getContactSelector);
    const dispatch = useAppDispatch()

    const [search, setSearch] = useState('')

    const CRUD = (type: 'edit' | 'add' | 'delete', item: Contact) => {
        if (type === 'edit') EditContact(item.id, item)
        else if (type === 'add') AddContact(item)
        else if (type === 'delete') DeleteContact(item.id)
    }

    const AddContact = (item: Contact) => dispatch(changeContact(contacts.concat(item)))

    const EditContact = (id: number, item: Contact) => {
        dispatch(changeContact(contacts.filter((item) => item.id !== id).concat(item).sort((a, b) => {
            if (a.id > b.id) return 1
            if (a.id < b.id) return -1
            return 0
        })))
    }
    const DeleteContact = (id: number) => dispatch(changeContact(contacts.filter((item) => item.id !== id)))

    useEffect(() => {
        !token && navigate('/')
    })

    const LogOut = () => {
        localStorage.removeItem('token')
        dispatch(changeToken(false))
        navigate('/')
    }

    return (
        <Box style={{flex: '1 0 auto', marginTop: 60}}>
            <Button variant={'contained'} style={{position: "absolute", top: '5%', right: '3%'}} onClick={LogOut}>
                Log out
            </Button>
            <Paper
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 360, marginTop: '10%'}}
            >
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    inputProps={{'aria-label': 'search'}}
                />
                <Box sx={{p: '10px'}}>
                    <SearchIcon/>
                </Box>
            </Paper>
            <ContactComponent CRUD={CRUD} add={contacts.length}/>
            <Box>
                {contacts.map((item, index) => item.name.toLowerCase().includes(search.toLowerCase())
                || item.phone.toLowerCase().includes(search.toLowerCase())
                || search.length === 0 ? (
                    <ContactComponent data={item} key={index} CRUD={CRUD}/>
                ) : null)}

            </Box>

        </Box>
    )
}
