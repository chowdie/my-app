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
import {dataReady, setDataReady} from './Orders.js'


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: { minWidth: "800px", maxWidth: "800px" },
}));

export default function SimpleDialogNewOrder(props) {

  const db = firebase.database();
  const classes = useStyles();
  const { onClose, selectedValueNewOrder, open, dataReady, onDataReadyChange } = props;

  const storage = firebase.storage();


  const handleCloseNewOrder = async () => {


    onClose(selectedValueNewOrder);
    if(datePlacedOrder != "datePlacedOrder" && namePlacedOrder != "namePlacedOrder" && departmentPlacedOrder != "departmentPlacedOrder" &&
        productPlacedOrder != "productPlacedOrder" && pricePlacedOrder != "pricePlacedOrder" && pdfFile != null && currency != ''){
    const newOrder = db.ref('Placed Orders')
    const newOrderPlaced = newOrder.push();

    setKey(newOrderPlaced.key);
    newOrderPlaced.set({
      key,
      datePlacedOrder,
      namePlacedOrder,
      departmentPlacedOrder,
      productPlacedOrder,
      pricePlacedOrder,
      aditionalPlacedOrder,
      currency,
      urgency
    })

    onDataReadyChange(false);
    await uploadPdfFile(newOrderPlaced.key);


}



  };

  const uploadPdfFile = async(key) => {
    console.log(pdfFile);
    if(pdfFile == null)
      return;
    const promises = [];
    const uploadPromises = pdfFile.forEach((file) => {
      promises.push(storage.ref(`pdf/${key}/${file.name}`).put(file));
    });

    await Promise.all(promises).then(tasks => {window.location.reload(); onDataReadyChange(true)});
  }


  const [datePlacedOrder, setDatePlacedOrder] = useState('datePlacedOrder')
  const [namePlacedOrder, setNamePlacedOrder] = useState('namePlacedOrder')
  const [departmentPlacedOrder, setDepartmentPlacedOrder] = useState('departmentPlacedOrder')
  const [productPlacedOrder, setProductPlacedOrder] = useState('productPlacedOrder')
  const [pricePlacedOrder, setPricePlacedOrder] = useState('pricePlacedOrder')
  const [aditionalPlacedOrder, setAditionalPlacedOrder] = useState('')
  const [currency, setCurrency] = useState('')
  const [urgency, setUrgency] = useState('')
  const [key, setKey] = useState('key');
  const [pdfFile, setPdfFile] = useState([]);


  return (
    <form fullWidth={true}>
    <Dialog onClose={handleCloseNewOrder} aria-labelledby="simple-dialog-title" open={open} classes={{ paper: classes.paper}} fullWidth={true}>
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
                    name='departmentPlacedOrder'  >

                    <MenuItem value={'Body'}>Body</MenuItem>
                    <MenuItem value={'Braking'}>Braking</MenuItem>
                    <MenuItem value={'Chasis'}>Chasis</MenuItem>
                    <MenuItem value={'Electronics'}>Electronics</MenuItem>
                    <MenuItem value={'Finances and Marketing'}>Finances and Marketing</MenuItem>
                    <MenuItem value={'Powertrain'}>Powertrain</MenuItem>
                    <MenuItem value={'Simulations'}>Simulations</MenuItem>
                    <MenuItem value={'Steering'}>Steering</MenuItem>
                    <MenuItem value={'Suspension'}>Suspension</MenuItem>


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

                  <Select onChange={(e) => setCurrency(e.target.value)}
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    name='departmentPlacedOrder'  >

                    <MenuItem value={'RON'}>RON</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>


                  </Select>

                </ListItem>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Level of urgency:</h2>
                  </InputLabel>


                  <Select onChange={(e) => setUrgency(e.target.value)}
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    name='departmentPlacedOrder'  >

                    <MenuItem value={'LOW'}>LOW</MenuItem>
                    <MenuItem value={'MEDIUM'}>MEDIUM</MenuItem>
                    <MenuItem value={'HIGH'}>HIGH</MenuItem>


                  </Select>

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

                <ListItem/><ListItem/>
                <ListItem>

                <input id="contained-button-file" type="file" name="file" style={{display:'none'}} multiple onChange = { (e) => {
                  let pdfs = [];
                  for(var i = 0; i < e.target.files.length; i++)
                  {
                    pdfs.push(e.target.files[i]);
                  }
                  setPdfFile(pdfs);
                }}/>
                <label htmlFor="contained-button-file">
                <Button color="primary" component="span">
                    Upload
                </Button>
                {
                pdfFile.map((file, i) => {

                  return (<p key = {file.name}>{file.name}</p>)
                })
                }
                </label>
		            </ListItem>

                <ListItem/><ListItem/><ListItem/><ListItem/><ListItem/><ListItem/>

                <Button color='primary' variant='contained' type='submit' onClick={handleCloseNewOrder} style={{'marginLeft':'80%'}}>Place Order
                </Button>
      </List>
    </Dialog>
    </form>
  );
}
