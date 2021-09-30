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
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide';

import firebase from '../Firebase/fire'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField'
import Database from '../Database/Database'


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: { minWidth: "800px", maxWidth: "800px" },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide(props) {

  const classes = useStyles();
  var { onClose, selectedValueAlert, openAlert,setOpenAlert, file} = props;



  const handleCloseAlert = () => {
    onClose(selectedValueAlert);

  };

  const handleCloseAlertYes = async () => {
    onClose(selectedValueAlert);
    await file.delete()

  };

  const handleClickOpenAlert = () => {
  setOpenAlert(true);

};


  return (
    <div>
      <Dialog
        open={handleClickOpenAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAlert}
        aria-describedby="alert-dialog-slide-description"
        open={openAlert}
      >
        <DialogTitle>{"Are you sure you want to delete it?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>No</Button>
          <Button onClick={handleCloseAlertYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default function SimpleDialogViewOrder(props) {

  const db = firebase.database();
  const storage = firebase.storage();

  const classes = useStyles();
  var { onClose, selectedValueViewOrder, openViewOrder, currentRowNamePlacedOrder, currentRowDatePlacedOrder, currentRowPricePlacedOrder,
            currentRowProductPlacedOrder, currentRowAditionalPlacedOrder, currentRowDepartmentPlacedOrder, currentRowKeyPlacedOrder, currency, urgency} = props;

  const dateAcceptedOrder = currentRowDatePlacedOrder
  const nameAcceptedOrder = currentRowNamePlacedOrder
  const departmentAcceptedOrder = currentRowDepartmentPlacedOrder
  const productAcceptedOrder = currentRowProductPlacedOrder
  const priceAcceptedOrder = currentRowPricePlacedOrder
  const aditionalAcceptedOrder = currentRowAditionalPlacedOrder
  const pdfKey = currentRowKeyPlacedOrder
  const [extractingFiles, setExtractingFiles] = React.useState([]);
  const [pdfFile, setPdfFile] = useState([]);
  const [currentFile, setCurrentFile] = useState('')

  const [openAlert, setOpenAlert] = React.useState(false);
  const [selectedValueAlert, setSelectedValueAlert] = React.useState('');

  var key = currentRowKeyPlacedOrder

  useEffect(() => {
      var files = [];
      storage.ref("pdf").child(pdfKey).listAll().then( folder => {

        folder.items.forEach( (file) => {
          files.push(file);
        });
        setExtractingFiles(files);
  });

});

const uploadPdfFile = async(key) => {
  if(pdfFile == null)
    return;
  const promises = [];
  const uploadPromises = pdfFile.forEach((file) => {
    promises.push(storage.ref(`pdf/${key}/${file.name}`).put(file));
  });

  await Promise.all(promises).then(tasks => {window.location.reload();});
}

  const handleCloseViewOrder = async () => {
    onClose(selectedValueViewOrder)
   db.ref('Placed Orders').child(currentRowKeyPlacedOrder).update({aditionalPlacedOrder: currentRowAditionalPlacedOrder});
   await uploadPdfFile(pdfKey)
   window.location.reload()
  };

  const handleAcceptViewOrder = () => {


    onClose(selectedValueViewOrder);
    const newOrder = db.ref('Accepted Orders');
    const newOrderAccepted = newOrder.push();
    key = newOrderAccepted.getKey();
    newOrderAccepted.set({
      aditionalAcceptedOrder,
      dateAcceptedOrder,
      departmentAcceptedOrder,
      key,
      nameAcceptedOrder,
      priceAcceptedOrder,
      productAcceptedOrder,
      pdfKey,
      currency,
      urgency
    })

    db.ref('Placed Orders').child(currentRowKeyPlacedOrder).remove();
    window.location.reload()

  };
  const handleClickOpenAlert = () => {
    setOpenAlert(true);

  };
  const handleCloseAlert = (value) => {
    setOpenAlert(false);
    setSelectedValueAlert(value);

  };


  return (
    <form>

    <Dialog onClose={handleCloseViewOrder} aria-labelledby="simple-dialog-title" open={openViewOrder}  classes={{ paper: classes.paper}} fullWidth={true}>
      <DialogTitle id="simple-dialog-title"><h1>View order</h1></DialogTitle>
      <List>

                <ListItem FormControl className={classes.formControl} >
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Name:</h2>
                  </InputLabel>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>{currentRowNamePlacedOrder}</h2>
                  </InputLabel>
                </ListItem>


                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Departament:</h2>
                  </InputLabel>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>{currentRowDepartmentPlacedOrder}</h2>
                  </InputLabel>

                </ListItem>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Product name:</h2>
                  </InputLabel>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>{currentRowProductPlacedOrder}</h2>
                  </InputLabel>

                </ListItem>


                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Estimative price:</h2>
                  </InputLabel>

                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>{currentRowPricePlacedOrder + ' ' + currency}</h2>
                  </InputLabel>

                </ListItem>

                <ListItem /> <ListItem/> <ListItem/>

                <ListItem FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    <h2>Aditional info:</h2>
                  </InputLabel>
                </ListItem>
                <ListItem >
                  <TextField variant='outlined' margin='outlined' multiline name='aditionalPlacedOrder' defaultValue={currentRowAditionalPlacedOrder} onChange={(e) => {currentRowAditionalPlacedOrder = (e.target.value)}}/>

                </ListItem>



                <ListItem /> <ListItem/> <ListItem/>

            <div>
            {
              extractingFiles.map( file =>(
               <Button>
                 <ListItemAvatar>
                   <Avatar>
                     <FolderIcon />
                   </Avatar>
                 </ListItemAvatar>
                  <Button onClick={() => {file.getDownloadURL().then(url => {window.open(url)})}}>{file.name} </Button>

                 <IconButton edge="end" aria-label="delete">
                   <DeleteIcon onClick={() => {handleClickOpenAlert();
                                                setCurrentFile(file) }} />
                    <AlertDialogSlide onClose={handleCloseAlert} file={currentFile} openAlert={openAlert}  setOpenAlert={setOpenAlert} selectedValueAlert={selectedValueAlert}/>
                 </IconButton>

              </Button>
            ))
            }
            </div>
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


              <ListItem /> <ListItem/> <ListItem/> <ListItem /> <ListItem/> <ListItem/>
            <Button color='primary' variant='contained' type='submit' onClick={handleAcceptViewOrder} style={{'marginLeft':'80%'}}>Accept Order
            </Button>

      </List>
    </Dialog>
    </form>
  );
}
