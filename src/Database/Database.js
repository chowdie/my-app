import React , {useState, useEffect} from 'react'
import TableCell from '@material-ui/core/TableCell';
import firebase from '../Firebase/fire'


export default function Databse(){
  const [dbList, setDbList] = useState()

  useEffect(() => {
    const dbPlacedRef = firebase.database().ref('PlacedOrders')
    dbPlacedRef.on('value', (snapshot) => {
      const dbValue = snapshot.val()
      console.log(dbValue);
      const dbList = []
      for(let id in dbValue) {
        dbList.push(dbValue[id])


      }
      setDbList(dbList)
    })
  }, [])

  return (dbList.title)
}
