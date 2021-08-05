import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import useStyles from './styles'
import Grid from '@material-ui/core/Grid';

const Home = () => {
    const classes = useStyles();
    const [pastores, setPastores] = useState([]);
    const [pastorId, setPastor] = useState(null);
    const [open, setOpen] = useState(false);
    const [evento, setEveteno] = useState({});

    const handleChange = (event) => {
        setPastor(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const PartoresList = () => {
        return pastores.map((p, index) =>
            <MenuItem key={index} value={p.id}>{p.login}</MenuItem>
        )
    }

    const submitEvent = () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        fetch('https://localhost:44329/api/cadastro/post', {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify(evento),
        })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const eventHandle = (evento) => {
        setEveteno({ idUserProprietario: pastorId, post: evento })
    }

    useEffect(async () => {
        await fetch('https://localhost:44329/api/proprietarios')
            .then((resp) => resp.json())
            .then(function (data) {
                return setPastores(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const isPastorSelected = () => {
        if (pastorId) {
            return (
                <Button onClick={submitEvent}>
                   Postar
                </Button>
            )
        }
        return null;
    }

    const comentario = pastorId !== null ?
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <label>Evento</label>
                </Grid>
                <Grid item xs={12}>
                    <textarea onChange={(data) => eventHandle(data.target.value)} rows={10} cols={60} />
                </Grid>
            </Grid>
        </React.Fragment> : null;

    return (
        <React.Fragment>
            <div className={classes.center}>
                Selecione o Pastor
            </div>

            <FormControl className={classes.formControl}>
                <InputLabel id='demo-controlled-open-select-label'>Pastores</InputLabel>
                <Select
                    labelId='demo-controlled-open-select-label'
                    id='demo-controlled-open-select'
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={pastorId}
                    onChange={handleChange}
                >
                    {PartoresList()}
                </Select>
            </FormControl>

            {comentario}


            {isPastorSelected()}


        </React.Fragment>
    )
}

export default Home;