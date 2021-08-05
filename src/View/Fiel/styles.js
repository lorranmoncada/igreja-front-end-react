import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  center: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  }, teste: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margemTop: {
    marginTop: 18
  },
  responder: {
    color: '#3c3c3cce',
    fontSize: 14
  },
  resposta: {
    color: '#505050ce',
    fontSize: 12
  }
}));

export default useStyles;