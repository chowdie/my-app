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

export default function SimpleDialogNewOrder(props) {

  const db = firebase.database();
  const classes = useStyles();
  const { onClose, selectedValueNewOrder, open } = props;

  const storage = firebase.storage();




  const handleCloseNewOrder = async () => {


    onClose(selectedValueNewOrder);
    if(datePlacedOrder != "datePlacedOrder" && namePlacedOrder != "namePlacedOrder" && departmentPlacedOrder != "departmentPlacedOrder" &&
        productPlacedOrder != "productPlacedOrder" && pricePlacedOrder != "pricePlacedOrder" && pdfFile != null){
    const newOrder = db.ref('Placed Orders')
    const newOrderPlaced = newOrder.push();
    newOrderPlaced.set({
      key,
      datePlacedOrder,
      namePlacedOrder,
      departmentPlacedOrder,
      productPlacedOrder,
      pricePlacedOrder,
      aditionalPlacedOrder
    })
    uploadPdfFile();
    window.location.reload();
}


  };

  const uploadPdfFile = () => {
    if(pdfFile == null)
      return;
    storage.ref(`pdf/${key}/${pdfFile.name}`).put(pdfFile);
  }


  const [datePlacedOrder, setDatePlacedOrder] = useState('datePlacedOrder')
  const [namePlacedOrder, setNamePlacedOrder] = useState('namePlacedOrder')
  const [departmentPlacedOrder, setDepartmentPlacedOrder] = useState('departmentPlacedOrder')
  const [productPlacedOrder, setProductPlacedOrder] = useState('productPlacedOrder')
  const [pricePlacedOrder, setPricePlacedOrder] = useState('pricePlacedOrder')
  const [aditionalPlacedOrder, setAditionalPlacedOrder] = useState('aditionalPlacedOrder')
  const [key, setKey] = useState('key');
  const [pdfFile, setPdfFile] = useState('');


  return (
    <form  >
    <Dialog onClose={handleCloseNewOrder} aria-labelledby="simple-dialog-title" open={open} >
      <DialogTitle id="simple-dialog-title"><h1>Place new order</h1></DialogTitle>
      <List>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Name:</h2>
                  </InputLabel>

                  <TextField variant='outlined' margin='outlined' name='namePlacedOrder' onChange={(e) => {
                    setNamePlacedOrder(e.target.value)
                    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

                    setDatePlacedOrder(monthName[new Date().getMonth()] + ' ' + new Date().getDate() + ' ' + new Date().getFullYear());
                  }

                }/>

                </ListItem>


                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Departament</h2>
                  </InputLabel>
                  <Select onChange={(e) => setDepartmentPlacedOrder(e.target.value)}
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    name='departmentPlacedOrder'
                  >
                    <MenuItem value={'Powertrain'}>Powertrain</MenuItem>
                    <MenuItem value={'Electronics'}>Electronics</MenuItem>
                    <MenuItem value={'Body'}>Body</MenuItem>
                  </Select>

                </ListItem>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Product name:</h2>
                  </InputLabel>
                  <TextField variant='outlined' margin='outlined' name='productPlacedOrder' onChange={(e) => setProductPlacedOrder(e.target.value)}/>

                </ListItem>


                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Estimative price:</h2>
                  </InputLabel>

                  <TextField variant='outlined' margin='outlined' name='pricePlacedOrder' onChange={(e) => setPricePlacedOrder(e.target.value)}/>

                </ListItem>

                <ListItem /> <ListItem/> <ListItem/>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Aditional info:</h2>
                  </InputLabel>
                </ListItem>
                <ListItem>
                  <TextField variant='outlined' margin='outlined' multiline name='aditionalPlacedOrder' onChange={(e) => setAditionalPlacedOrder(e.target.value)}/>

                </ListItem>

                <ListItem>
          			<input type="file" name="file" multiple onChange = { (e) => {setPdfFile(e.target.files[0])}  }/>
		            </ListItem>


                <Button color='primary' variant='contained' type='submit' onClick={handleCloseNewOrder}>Place Order
                </Button>
      </List>
    </Dialog>
    </form>
  );
}
