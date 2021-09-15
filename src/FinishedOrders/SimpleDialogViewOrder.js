import React , {useState , useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import LinkUi from '@material-ui/core/Link'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';
import firebase from '../Firebase/fire'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
import Database from '../Database/Database'

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function SimpleDialogViewOrder(props) {

  const db = firebase.database();
  const classes = useStyles();
  var { onClose, selectedValueViewOrder, openViewOrder, currentRowNameFinishedOrder, currentRowDateFinishedOrder, currentRowPriceFinishedOrder,
            currentRowProductFinishedOrder, currentRowAditionalFinishedOrder, currentRowDepartmentFinishedOrder, currentRowKeyFinishedOrder} = props;

  const handleCloseViewOrder = () => {
    onClose(selectedValueViewOrder);

    db.ref('Finished Orders').child(currentRowKeyFinishedOrder).update({aditionalFinishedOrder: currentRowAditionalFinishedOrder});
    window.location.reload();
    console.log(currentRowAditionalFinishedOrder);

  };

  const handleListItemClick = (value) => {
    onClose(value);
  };



  return (
    <form  >

    <Dialog onClose={handleCloseViewOrder} aria-labelledby="simple-dialog-title" open={openViewOrder} >
      <DialogTitle id="simple-dialog-title"><h1>View order</h1></DialogTitle>
      <List>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Name:</h2>
                  </InputLabel>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>{currentRowNameFinishedOrder}</h2>
                  </InputLabel>
                </ListItem>


                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Departament:</h2>
                  </InputLabel>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>{currentRowDepartmentFinishedOrder}</h2>
                  </InputLabel>

                </ListItem>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Product name:</h2>
                  </InputLabel>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>{currentRowProductFinishedOrder}</h2>
                  </InputLabel>

                </ListItem>


                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Estimative price:</h2>
                  </InputLabel>

                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>{currentRowPriceFinishedOrder}</h2>
                  </InputLabel>

                </ListItem>

                <ListItem /> <ListItem/> <ListItem/>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Aditional info:</h2>
                  </InputLabel>
                </ListItem>
                <ListItem>
                  <TextField variant='outlined' margin='outlined' multiline name='aditionalFinishedOrder' defaultValue={currentRowAditionalFinishedOrder} onChange = {(e) => {currentRowAditionalFinishedOrder = e.target.value}}/>

                </ListItem>


                <Button color='primary' variant='contained' type='submit' onClick={handleCloseViewOrder}>Finish Order
                </Button>

      </List>
    </Dialog>
    </form>
  );
}
