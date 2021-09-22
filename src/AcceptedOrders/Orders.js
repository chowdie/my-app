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

  const [currentRowNameAcceptedOrder, setCurrentRowNameAcceptedOrder] = React.useState('');
  const [currentRowDepartmentAcceptedOrder, setCurrentRowDepartmentAcceptedOrder] = React.useState('');
  const [currentRowDateAcceptedOrder, setCurrentRowDateAcceptedOrder] = React.useState('');
  const [currentRowProductAcceptedOrder, setCurrentRowProductAcceptedOrder] = React.useState('');
  const [currentRowPriceAcceptedOrder, setCurrentRowPriceAcceptedOrder] = React.useState('');
  const [currentRowAditionalAcceptedOrder, setCurrentRowAditionalAcceptedOrder] = React.useState('');
  const [currentRowKeyAcceptedOrder, setCurrentRowKeyAcceptedOrder] = React.useState('');
  const [pdfKey, setPdfKey] = React.useState('');

  const database = firebase.database().ref('Accepted Orders');
  const fetchData = () =>{
      const dbAcceptedRef = firebase.database().ref('Accepted Orders')
      setData([])
      dbAcceptedRef.on('value', async snapshot => {
         await snapshot.forEach((childSub) => {
          const dbValue = childSub.val()
          dbValue.key = childSub.key;
          console.log(dbValue.key);

          if(data.indexOf(dbValue) == -1){data.push(dbValue)}

        });
      setDataReady(true);
      setData(data)
    })

  }

  useEffect(() => {
    fetchData();


  }, [])



  const handleClickOpenViewOrder = () => {
    setOpenViewOrder(true);

  };
  const handleCloseViewOrder = (value) => {
    setOpenViewOrder(false);
    setSelectedValueViewOrder(value);

  };


  return (
    <div>
{ dataReady==true ? (

    <React.Fragment>
      <Title>Accepted Orders</Title>
      <Table size="medium" >
        <TableHead>
          <TableRow>
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
            <TableRow key={row.key}>
              <TableCell>{row.dateAcceptedOrder}</TableCell>
              <TableCell>{row.nameAcceptedOrder}</TableCell>
              <TableCell>{row.departmentAcceptedOrder}</TableCell>
              <TableCell>{row.productAcceptedOrder}</TableCell>
              <TableCell align="right">{row.priceAcceptedOrder}</TableCell>
              <TableCell><Button color = 'primary' onClick={() => {
                handleClickOpenViewOrder();
                setCurrentRowNameAcceptedOrder(row.nameAcceptedOrder)
                setCurrentRowDateAcceptedOrder(row.dateAcceptedOrder)
                setCurrentRowPriceAcceptedOrder(row.priceAcceptedOrder)
                setCurrentRowProductAcceptedOrder(row.productAcceptedOrder)
                setCurrentRowAditionalAcceptedOrder(row.aditionalAcceptedOrder)
                setCurrentRowDepartmentAcceptedOrder(row.departmentAcceptedOrder)
                setCurrentRowKeyAcceptedOrder(row.key)
                setPdfKey(row.pdfKey)
                                  }}>View</Button>
              </TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
      <br/>


      <br/> <br/>


      <SimpleDialogViewOrder selectedValueViewOrder={selectedValueViewOrder} openViewOrder={openViewOrder} onClose={handleCloseViewOrder} currentRowNameAcceptedOrder={currentRowNameAcceptedOrder}
                              currentRowDateAcceptedOrder={currentRowDateAcceptedOrder} currentRowDepartmentAcceptedOrder={currentRowDepartmentAcceptedOrder} currentRowProductAcceptedOrder={currentRowProductAcceptedOrder}
                              currentRowPriceAcceptedOrder={currentRowPriceAcceptedOrder} currentRowAditionalAcceptedOrder={currentRowAditionalAcceptedOrder} currentRowKeyAcceptedOrder={currentRowKeyAcceptedOrder} pdfKey={pdfKey}/>
    </React.Fragment>
) : (

  <div>Loading...</div>
)

}
</div>
  );
}
