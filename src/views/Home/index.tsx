import {useEffect,useState} from "react";
import Page from "../../components/Page";
import Search from "../../components/UserInput/Search";
import Order from "../../components/UserInput/Order";
import Customer from "../../components/UserInput/Customer"
import OrderType from "../../components/UserInput/OrderType";
import { addOrder } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';
import Delete from "../../components/Delete/Delete";
import axios from "axios";

//material ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Loading } from 'react-loading-dot'

import "./index.css";

export default function Home(){
    let [deleteValue,setDeleteValue]: {createdByUserName: string, createdDate: string, customerName: string, orderId: number, orderType: string}[] | any[]= useState([]);
    let [render,SetRender] = useState(false);
    let [loading,setLoading] = useState(true);
    let [search,setSearch] = useState("");
    let [customer,setCustomer] = useState("");
    let [selectOrder, setSelectOrder] = useState("");
    let [pickData, setPickData] = useState("");
    let [pick,setPick] = useState(false);
    let dispatch = useDispatch();
    let orders = useSelector((state: {order: {createdByUserName: string, createdDate: string, customerName: string, orderId: number, orderType: string}[] | any}) => state.order);

//update search

let updateSearch = (data: string) => {
    setSearch(data);
}

//select customer

let selectCustomer = (value: string) => {
    setCustomer(value);
} 

let getOrder = (value: string) => {
    if(value === "Order Type") {
        value = "";
    }
    setSelectOrder(value);
}


//create a table
let currentOrders = [];

if(pick) {
    currentOrders = [pickData];
}
else {
    currentOrders = orders.order;
}


    useEffect(() => {
            let getData =  (async () => {
                let data = await axios('https://red-candidate-web.azurewebsites.net/api/Orders', {
                        method: "GET",
                        headers: ({
                        "Content-Type": "application/json",
                        "ApiKey": "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4"
                        })}).catch(err => err.message);
                if(data.data) {
                        dispatch(addOrder(data.data));
                        setLoading(false);
                }
                
            })();
    },[render]);

    useEffect(() => {
        if(customer !== "" && selectOrder !== "") {
            setLoading(true);
            setPick(true);
            let searchData = (async () => {
                let data = await axios(`https://red-candidate-web.azurewebsites.net/api/Orders/${customer}?orderType=${selectOrder}`, {
                    method: "GET", 
                    headers: ({
                        "Content-Type": "application/json",
                        "ApiKey": "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4"
                        })}).catch(err => err.message);
                        setPickData(data.data);
                        setLoading(false);
                })();
            }
            else {
                setPick(false);
                setPickData("");
            }
    }, [customer, selectOrder, render]);


    let rows: {createdByUserName: string, createdDate: string, customerName: string, orderId: number, orderType: string} [] = [];     

    if(currentOrders) {
        if(search === "" || search === undefined) {
            currentOrders.forEach((item: {createdByUserName: string, createdDate: string, customerName: string, orderId: number, orderType: string}) => {
                rows.push(item);
            })
        }
        else {
            let searchInNum = parseInt(search);
            currentOrders.forEach((item: {createdByUserName: string, createdDate: string, customerName: string, orderId: number, orderType: string}) => {
                if(item.orderId === searchInNum) {
                    rows.push(item);
                }
            })
        }
    }

    //renderFunction

    const renderFunction = () => {
        SetRender(!render);
    }
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
        container: {
            width: '80%',
            marginTop: '15px'
        }
      });
      const classes = useStyles();

      let updateDeleteValue = () => {
          setDeleteValue("");
      }

      //checkbox function
      let getValueFromCheckBox = async (e: {target: {value: number | any, checked: boolean}}) => {
        let currentTargetValue = rows[e.target.value];
        if(!e.target.checked) {
            deleteValue.forEach((myObject: object,index: number)=>{
                if(myObject === rows[e.target.value]) {
                    setDeleteValue(()=> deleteValue.filter((data: object) => data !== myObject));
                }
            })
        }
        else {
            await setDeleteValue([...deleteValue,currentTargetValue]);
        }
   
      }

      let displayTrash = () => {
          if(deleteValue.length !== 0) {
              return (
                  <Delete renderMe = {renderFunction} updateDeleteValue = {updateDeleteValue} deleteValue = {deleteValue}/>
              )
          }
      }
      let displayTheOrders = () => {
          return(
            <TableContainer component={Paper} className = {classes.container}>
            <Table className = {classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"><b>Order ID</b></TableCell>
                        <TableCell align="left"><b>Creation Date</b></TableCell>
                        <TableCell align="left"><b>Created By</b></TableCell>
                        <TableCell align="left"><b>Order Type</b></TableCell>
                        <TableCell align="left"><b>Customer</b></TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {rows.map((row: {orderId: number, createdDate: string, createdByUserName: string, orderType: string, customerName: string}, index: number) => (
                        <TableRow key={row.orderId}>
                        <TableCell component="th" scope="row">
                        <Checkbox 
                        value = {index}
                        onChange = {getValueFromCheckBox} color = 'primary'/>{row?.orderId}
                        </TableCell>
                        <TableCell align="left">{row?.createdDate}</TableCell>
                        <TableCell align="left">{row?.createdByUserName}</TableCell>
                        <TableCell align="left">{row?.orderType}</TableCell>
                        <TableCell align="left">{row?.customerName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
          )
      }
    return (
    <Page headerTitle={"RED"}>
        <div>
            <Search searchOrder = {updateSearch}/>
            <Order renderOrder = {renderFunction} />
            <Customer getCustomer = {selectCustomer}/>
            <OrderType myOrder = {getOrder}/>
            {displayTrash()}
        </div>
        <div>
            {loading === true ? <Loading/>: displayTheOrders()}
        </div>
    </Page>
    )
}