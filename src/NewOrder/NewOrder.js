import React , {useState , useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import LinkUi from '@material-ui/core/Link'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import AppBar from '@material-ui/core/AppBar';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../PlacedOrders/Title';
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
import {dataReady, setDataReady} from '../PlacedOrders/Orders.js'
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import { mainListItems, secondaryListItems } from './listItems';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Login from '../Login/Login'
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(2),
  },
  paper: { minWidth: "800px", maxWidth: "800px" },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 6,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function SimpleDialogNewOrder(props) {

  const db = firebase.database();
  const classes = useStyles();
  const history = useHistory();
  const { onClose, selectedValueNewOrder, open, dataReady, onDataReadyChange } = props;

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const storage = firebase.storage();

  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


  const handleCloseNewOrder = async () => {


    //onClose(selectedValueNewOrder);
    if(datePlacedOrder != "datePlacedOrder" && namePlacedOrder != "namePlacedOrder" && departmentPlacedOrder != "departmentPlacedOrder" &&
        productPlacedOrder != "productPlacedOrder" && pricePlacedOrder != "pricePlacedOrder" && currency != ''){
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


    await uploadPdfFile(newOrderPlaced.key);
    await firebase.database().ref('Completed Orders').on('value', async snapshot => {
       await snapshot.forEach(async (childSub) =>{

        const dbValue = childSub.val()
        const date = dbValue.dateCompletedOrder.split(' ')[0];
        const currentMonth = new Date.getMonth()


        const obj = {
          'January' : 1,
          'February': 2,
          'March': 3,
          'April': 4,
          'May': 5,
          'June': 6,
          'July': 7,
          'August': 8,
          'September': 9,
          'October': 10,
          'November': 11,
          'December': 12
        }

        var diff = obj[currentMonth] - obj[date];
        if(diff < 0) diff = diff + 12
        if(diff >= 0)
          firebase.database().ref('Completed Orders').child(dbValue.key).remove();

        console.log(dbValue);





      });

  })


}



  };

  const uploadPdfFile = async(key) => {

    if(pdfFile == null)
      return;
    const promises = [];
    const uploadPromises = pdfFile.forEach((file) => {
      promises.push(storage.ref(`pdf/${key}/${file.name}`).put(file));
    });

    await Promise.all(promises).then(tasks => {window.location.reload(); onDataReadyChange(true)});
  }

  const requestLogin = () => {

      history.push('/login')
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
    <div>
    <CssBaseline />
    <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>

        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Place order
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
        >
          <Button variant='text' color='inherit' onClick={requestLogin}> Login </Button>
        </IconButton>
      </Toolbar>
    </AppBar>

    <main className={classes.content}>
    <Container maxWidth="lg" className={classes.container}>
    <Grid container spacing={3}>
    <Grid item xs={12}>
    <Paper className={classes.paper}>
    <form fullWidth={true}>

      <DialogTitle id="simple-dialog-title"><h1>Order</h1></DialogTitle>
      <List>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Name:</h2>
                  </InputLabel>

                  <TextField variant='outlined' required margin='outlined' name='namePlacedOrder' onChange={(e) => {
                    setNamePlacedOrder(e.target.value)
                    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

                    setDatePlacedOrder(monthName[new Date().getMonth()] + ' ' + new Date().getDate() + ' ' + new Date().getFullYear());
                  }

                }/>

                </ListItem>


                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink  id="demo-simple-select-placeholder-label-label">
                    <h2>Departament</h2>
                  </InputLabel>
                  <Select onChange={(e) => setDepartmentPlacedOrder(e.target.value)}
                    required
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
                  <TextField variant='outlined' required margin='outlined' name='productPlacedOrder' onChange={(e) => setProductPlacedOrder(e.target.value)}/>

                </ListItem>


                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink required id="demo-simple-select-placeholder-label-label">
                    <h2>Estimative price:</h2>
                  </InputLabel>

                  <TextField required variant='outlined' margin='outlined' name='pricePlacedOrder' onChange={(e) => setPricePlacedOrder(e.target.value)}/>

                  <Select onChange={(e) => setCurrency(e.target.value)}
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    name='departmentPlacedOrder'
                    required >

                    <MenuItem value={'RON'}>RON</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>


                  </Select>

                </ListItem>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel required shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Level of urgency:</h2>
                  </InputLabel>


                  <Select onChange={(e) => setUrgency(e.target.value)}
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    name='departmentPlacedOrder'
                    required >

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
    </form>
    </Paper>
    </Grid>
    </Grid>
    </Container>
    </main>
    </div>
  );
}
