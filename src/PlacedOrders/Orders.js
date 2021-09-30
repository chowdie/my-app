import React , {useState , useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
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
import SimpleDialogNewOrder from './SimpleDialogNewOrder';
import SimpleDialogViewOrder from './SimpleDialogViewOrder';
import Database from '../Database/Database'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function Orders() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openViewOrder, setOpenViewOrder] = React.useState(false);

  const [data, setData] = React.useState([]);
  const [dataReady, setDataReady] = React.useState(false)

  const [selectedValueNewOrder, setSelectedValueNewOrder] = React.useState('');
  const [selectedValueViewOrder, setSelectedValueViewOrder] = React.useState('');

  const [currentRowNamePlacedOrder, setCurrentRowNamePlacedOrder] = React.useState('');
  const [currentRowDepartmentPlacedOrder, setCurrentRowDepartmentPlacedOrder] = React.useState('');
  const [currentRowDatePlacedOrder, setCurrentRowDatePlacedOrder] = React.useState('');
  const [currentRowProductPlacedOrder, setCurrentRowProductPlacedOrder] = React.useState('');
  const [currentRowPricePlacedOrder, setCurrentRowPricePlacedOrder] = React.useState('');
  const [currentRowAditionalPlacedOrder, setCurrentRowAditionalPlacedOrder] = React.useState('');
  const [currentRowKeyPlacedOrder, setCurrentRowKeyPlacedOrder] = React.useState('');
  const [currency, setCurrency] = React.useState('')
  const [urgency, setUrgency] = React.useState('')

  const database = firebase.database().ref('Placed Orders');
  const fetchData = () =>{
      const dbPlacedRef = firebase.database().ref('Placed Orders')

      dbPlacedRef.on('value', async snapshot => {
         await snapshot.forEach((childSub) => {

          const dbValue = childSub.val()
          dbValue.key = childSub.key;

          if(data.indexOf(dbValue) == -1){data.push(dbValue)}



        });
        setDataReady(true);
        setData(data)
    })

  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleClickOpenNewOrder = () => {
    setOpen(true);
  };
  const handleCloseNewOrder = (value) => {
    setOpen(false);
    setSelectedValueNewOrder(value);

  };

  const handleClickOpenViewOrder = () => {
    setOpenViewOrder(true);

  };
  const handleCloseViewOrder = (value) => {
    setOpenViewOrder(false);
    setSelectedValueViewOrder(value);

  };

  return (
    <div>
{ dataReady==true? (

    <React.Fragment>
      <Title>Placed Orders</Title>
      <Table size="medium" >
        <TableHead>
          <TableRow>
            <TableCell><b></b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Department</b></TableCell>
            <TableCell><b>Product</b></TableCell>

            <TableCell align="right"><b>Estimative Price</b></TableCell>
            <TableCell/>

          </TableRow>
        </TableHead>

        <TableBody>
          {
            data.map((row ) => (

            <TableRow key={row.key} >
              <TableCell style={{'borderWidth':'1px', 'background':(row.urgency == null ? '#FFFFFF' :( row.urgency == 'HIGH'? '#ff4d4d' :
                (row.urgency == 'MEDIUM' ? '#ff9900' : '#009900')) )}}></TableCell>
              <TableCell>{row.datePlacedOrder}</TableCell>
              <TableCell>{row.namePlacedOrder}</TableCell>
              <TableCell>{row.departmentPlacedOrder}</TableCell>
              <TableCell>{row.productPlacedOrder}</TableCell>

              <TableCell align="right">{row.pricePlacedOrder + ' ' + row.currency}</TableCell>
              <TableCell><Button color = 'primary' onClick={() => {
                handleClickOpenViewOrder();
                setCurrentRowNamePlacedOrder(row.namePlacedOrder)
                setCurrentRowDatePlacedOrder(row.datePlacedOrder)
                setCurrentRowPricePlacedOrder(row.pricePlacedOrder)
                setCurrentRowProductPlacedOrder(row.productPlacedOrder)
                setCurrentRowAditionalPlacedOrder(row.aditionalPlacedOrder)
                setCurrentRowDepartmentPlacedOrder(row.departmentPlacedOrder)
                setCurrentRowKeyPlacedOrder(row.key)
                setCurrency(row.currency)
                setUrgency(row.urgency)
                                  }}>View</Button>
              </TableCell>
            </TableRow>

          ))
        }
        </TableBody>
      </Table>
      <br/>

      <br/> <br/>
      <Fab color="primary" aria-label="add" style={{position:'fixed', right: 50 , bottom: 50, left: 'auto', top:'auto'}} onClick={handleClickOpenNewOrder}>
        <AddIcon />
      </Fab>
      <SimpleDialogNewOrder selectedValueNewOrder={selectedValueNewOrder} open={open} onClose={handleCloseNewOrder} dataReady={dataReady} onDataReadyChange={setDataReady}/>
      <SimpleDialogViewOrder selectedValueViewOrder={selectedValueViewOrder} openViewOrder={openViewOrder} onClose={handleCloseViewOrder} currentRowNamePlacedOrder={currentRowNamePlacedOrder}
                              currentRowDatePlacedOrder={currentRowDatePlacedOrder} currentRowDepartmentPlacedOrder={currentRowDepartmentPlacedOrder} currentRowProductPlacedOrder={currentRowProductPlacedOrder}
                              currentRowPricePlacedOrder={currentRowPricePlacedOrder} currentRowAditionalPlacedOrder={currentRowAditionalPlacedOrder} currentRowKeyPlacedOrder={currentRowKeyPlacedOrder} currency={currency}
                              urgency={urgency}/>
    </React.Fragment>
) : (

  <div>Loading...</div>
)

}
</div>
  );
}
