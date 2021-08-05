import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from './styles'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import { Pagination } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

const Fiel = () => {
    const classes = useStyles();
    const [fieis, setFieis] = useState([]);
    const [igrejaId, setIgreja] = useState(null);
    const [fielId, setFiel] = useState(null);
    const [open, setOpen] = useState(false);
    const [eventos, setEvetenos] = useState([]);
    const [respostas, setRespostas] = useState([]);
    const [pagination, setPaginatione] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalPages: null
    });
    const [comentarios, setComentarios] = useState([]);
    const [idComentario, setIdComentario] = useState(null);
    const [comentario, setComentario] = useState({});


    const handleChange = (event) => {
        setIgreja(event.target.value.idIgreja);
        setFiel(event.target.value.idFiel);
    };

    const changePage = (_, pageValue) => {
        setPaginatione((prevState) => ({
            ...prevState,
            pageIndex: pageValue
        }));
        getEvents(pageValue);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const fieisList = () => {
        return fieis.map((p, index) =>
            <MenuItem key={index} value={{ idIgreja: p.idIgreja, idFiel: p.idFiel }}>{p.nomeFiel}</MenuItem>
        )
    }

    const comemntHandle = (coment, postId) => {
        let comentarioObj = {
            comentario: coment,
            idPost: postId,
            idUser: fielId,
            idComentarioParent: idComentario
        };

        setComentario(comentarioObj)
    }

    const submitComentario = (keyIndex) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('https://localhost:44329/api/cadastro/comentario', {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify(comentario),
        })
            .then((data) => {
                document.getElementById(`text-id-${keyIndex}`).value = '';
                setComentario(null)
                setIdComentario(null);
                getEvents(pagination.pageIndex);
            })
            .catch((error) => {
                console.log(error);
                document.getElementById(`text-id-${keyIndex}`).value = '';
                setComentario(null)
                setIdComentario(null);
            });
    }

    useEffect(async () => {
        getEvents();
    }, [igrejaId])

    useEffect(async () => {
        await fetch('https://localhost:44329/api/fieis')
            .then((resp) => resp.json())
            .then((data) => {
                setFieis(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const getEvents = async (pageValue = 1) => {
        if (igrejaId) {
            await fetch(`https://localhost:44329/api/postsByUser?id=${igrejaId}&page=${pageValue ?? pagination.pageIndex}&pageSize=${pagination.pageSize}`)
                .then((resp) => resp.json())
                .then((data) => {
                    setEvetenos(data.itens);
                    setPaginatione({
                        pageIndex: data.pageIndex,
                        pageSize: data.pageSize,
                        totalPages: data.totalPages
                    })

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const adicionarComentarioId = (idComentario) => {
        setIdComentario(idComentario)
    }

    const verifyComents = (item, index) => {
        if (item.qtdComentario > 0) {
            getComentarios(item)
            return (<Grid item xs={12}>
                {comentarios.map(comentario => {
                    if (item.id === comentario.idPost) {
                        return (
                            <Grid className={classes.center} container >
                                <Grid item xs={12}>{`@${comentario.nomeFiel}: ${comentario.comentario}`}</Grid>
                                <Grid onClick={() => getRespostas(comentario)} item xs={12}>
                                    {comentario.qtdComentario != 0 && (<span className={classes.resposta} size="small"><strong>
                                        Visualizar {comentario.qtdComentario} respostas(s)
                                    </strong>
                                    </span>)
                                    }

                                    {respostas?.map(resposta => {
                                        if (resposta.idComentarioParent === comentario.idComentario) {
                                            return (<Grid className={classes.center} container >
                                                <Grid item xs={12}>{resposta.comentario}</Grid>
                                            </Grid>)
                                        }
                                    })}
                                </Grid>

                                <Grid item xs={12}><strong>
                                    <span className={classes.responder}>
                                        <a href={`#text-id-${index}`} onClick={(data) => { adicionarComentarioId(comentario.idComentario) }}>Responder</a>
                                    </span>
                                </strong></Grid>
                            </Grid>)
                    }
                }

                )}


            </Grid>)
        }

    }

    const getComentarios = async (item) => {
        await fetch(`https://localhost:44329/api/cometarios/${item.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setComentarios(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getRespostas = async (item) => {
        await fetch(`https://localhost:44329/api/respostas/${item.idComentario}`)
            .then((resp) => resp.json())
            .then((data) => {
                setRespostas(data.itens);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const listByEvent = () => {
        return eventos?.map((item, index) => {
            Moment.locale('pt');
            var dt = item.dataCadastro;

            return (
                <Grid item key={index}>
                    <Card className={classes.teste} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {Moment(dt).format('DD/MM/YYYY')}
                            </Typography>
                            <Typography variant="h6" component="h2">
                                {item.post}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.center}>
                            <Grid className={classes.center} container spacing={3}>
                                {verifyComents(item, index)}

                                <Grid item xs={8}>
                                    <TextField
                                        id={`text-id-${index}`}
                                        label="Insira um comentário"
                                        type="text"
                                        onChange={(data) => comemntHandle(data.target.value, item.id)}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Button className={classes.margemTop} size="small" onClick={() => submitComentario(index)} >Publicar</Button>
                                </Grid>
                            </Grid>

                        </CardActions>
                    </Card>
                </Grid >
            )
        })
    }


    return (
        <React.Fragment>
            <div className={classes.center}>
                Selecione o Fiel
            </div>

            <FormControl className={classes.formControl}>
                <InputLabel id='demo-controlled-open-select-label'>Fieis</InputLabel>
                <Select
                    labelId='demo-controlled-open-select-label'
                    id='demo-controlled-open-select'
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={{ idIgreja: igrejaId, idFiel: fielId }}
                    onChange={handleChange}
                >
                    {fieisList()}
                </Select>
            </FormControl>

            <Grid className={classes.center} container spacing={3}>
                {eventos ? listByEvent() : null}
            </Grid>

            {eventos.length > 0 ? <div className={classes.center}>
                <Pagination count={pagination.totalPages ?? 0} page={pagination.pageIndex} onChange={(data, val) => changePage(data, val)} />
            </div> : null}

        </React.Fragment>
    )
}

export default Fiel;