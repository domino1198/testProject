import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, TextField, IconButton} from "@mui/material";
import PlusOneIcon from '@mui/icons-material/PlusOne';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {Contact} from "../../redux/slice";

interface IContact {
    add?: number,
    data?: Contact
    CRUD: (type: 'edit' | 'add' | 'delete', item: Contact) => void,
}

export const ContactComponent = ({add, CRUD, data}: IContact) => {

    const [change, setChange] = useState(false);
    const [name, setName] = useState(data ? data.name : '')
    const [phone, setPhone] = useState(data ? data.phone : '')

    const handleChange = () => {
        if (data) {
            setPhone(data.phone)
            setName(data.name)
        }
        setChange(true)
    }

    const ChangeData = () => {
        data && CRUD('edit', {name, phone, id: data.id})
        setChange(false)
    }

    const AddItem = () => {
        add !== undefined && CRUD('add', {name, phone, id: add})
        setPhone('')
        setName('')
    }

    const DeleteItem = () => data && CRUD('delete', data)

    return (
        <Card sx={{maxWidth: 370, marginBlock: 6}}>
            <CardContent>
                {add !== undefined || change ?
                    <Box style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                        <Box style={{display: 'flex', flexDirection: 'column'}}>
                            <TextField onChange={(e) => e.target.value.length < 30 && setName(e.target.value)}
                                       value={name}
                                       id="name"
                                       label="Name"
                                       variant="standard"/>
                            <TextField onChange={(e) => e.target.value.length < 14 && setPhone(e.target.value)}
                                       value={phone}
                                       type="tel"
                                       id="phone"
                                       label="Phone"
                                       variant="standard"/>
                        </Box>
                        {add !== undefined ?
                            <IconButton onClick={AddItem}
                                        style={{width: 50, height: 50}} color="primary"
                                        disabled={phone.split(' ').join('').length === 0 ||
                                            name.split(' ').join('').length === 0 ||
                                            phone.replace(/^(\s*)?(\+)?([-()+]?\d[-()+]?){10,14}(\s*)?$/, "") !== ""}
                                        component="label">
                                <PlusOneIcon/>
                            </IconButton> : data ?
                                <Box style={{display: 'flex'}}>
                                    <IconButton onClick={ChangeData}
                                                style={{width: 40, height: 40}}
                                                color="primary"
                                                disabled={phone.split(' ').join('').length === 0 ||
                                                    name.split(' ').join('').length === 0 ||
                                                    phone.replace(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, "") !== ""}>
                                        <DoneIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => setChange(false)} style={{width: 40, height: 40}}
                                                color="primary">
                                        <CloseIcon/>
                                    </IconButton>
                                </Box> : null
                        }
                    </Box> :
                    data ? <Box style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                        <Box style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {data.name}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {data.phone}
                            </Typography>
                        </Box>
                        <Box style={{display: 'flex'}}>
                            <IconButton onClick={handleChange} style={{width: 50, height: 50}} color="primary"
                                        component="label">
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={DeleteItem}
                                        style={{width: 50, height: 50}}
                                        color="primary" component="label">
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                    </Box> : null}


            </CardContent>
        </Card>
    )
}
