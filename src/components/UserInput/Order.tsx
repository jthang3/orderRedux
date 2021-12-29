import Button from "@material-ui/core/Button";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import "./Order.css";
import React, { useEffect, useState  } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { MenuItem, FormControl, styled} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {saveDraft} from "../../redux/action";
function getModalStyle() {
    const top = 50 
    const left = 50 
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: '30%',
      height: '40%',
      minWidth: "455px",
      minHeight: "300px",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: "3%",
    },
    createdBy: {
      width: "80%",
    },
    firstSection: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '80%',
      marginTop: '5%',
      marginBottom: '2%',
      marginLeft: "0px"
    },
    orderTypeUI: {
      width: '120%',
      background: 'Azure',
      borderTop: '1px solid #00ff99',
      borderLeft: '1px solid #00ff99',
      borderRight: '1px solid #00ff99',
    },
    save: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    customer: {
      borderTop: '1px solid #00ff99',
      borderLeft: '1px solid #00ff99',
      borderRight: '1px solid #00ff99',
      background: 'Azure',
      width: '61.5%'
    },
    customerLabel: {
      marginLeft: '2%'
    }
  }),
);

interface orderRefresh {
  renderOrder: Function
}
const Order = (prop: orderRefresh) => {
  let [createdBy, setCreatedBy] = useState("");
  let [orderType,setOrderType] = useState("");
  let [customer,setCustomer] = useState("");
  let [savedData, setSavedData]: {order: string, customer: string, createdBy: string}[] | any[] = useState([]);



  let [createField, setCreateField] = useState(false);
  let [orderField, setOrderField] = useState(false);
  let [customerField, setCustomerField] = useState(false);
  let [draftLists, setDraftLists] = useState(false);

    //redux stores
  let dispatch = useDispatch();
  let orders = useSelector((state: {saveDraft: {order: any}}) => state.saveDraft);
  useEffect(() => {
    dispatch(saveDraft(savedData));
  },[savedData])



    const classes = useStyles();
        // getModalStyle is not a pure function, we roll the style only on the first render
        const [modalStyle] = useState(getModalStyle);
        const [open, setOpen] = useState(false);


        //clear all values
        let clearValues = () => {
          setCreatedBy("");
          setOrderType("");
          setCustomer("")
          setCreateField(false);
          setOrderField(false);
          setCustomerField(false);
        }
      
        const orderOpen = () => {
          setOpen(true);
        };
      
        const orderClose = () => {
          setOpen(false);
          clearValues();

        };

        //get values from user
        let getCreatedBy = (value: string) => {
          setCreatedBy(value);
        }

        let getOrderType = (value: {target: {value: string | any}}) => {
          setOrderType(value.target.value);
        }

        let getCustomer = (value: string) => {
          setCustomer(value);
        }


        let createOrder = (async () => {
          if(createdBy && orderType && customer) {
            setCreateField(false);
            setOrderField(false);
            setCustomerField(false);
            let addedOrder = await axios('https://red-candidate-web.azurewebsites.net/api/Orders', {
              method: "POST",
              data:({
                orderType: orderType,
                customerName: customer,
                createdByUserName: createdBy
              }),
              headers: ({
              "Content-Type": "application/json",
              "ApiKey": "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4"
              })}).catch(err => err.message);
              orderClose();
              await prop.renderOrder();
          }
          else {
            if(createdBy === "") {
              setCreateField(true);
              if(customer === "") {
                setCustomerField(true);
                if(orderType === "") {
                setOrderField(true);
                }
                else setOrderField(false);
              }
              else {
                setCustomerField(false);
                if(orderType === "") {
                  setOrderField(true);
                  }
                else {
                  setOrderField(false);
                }
              }
            }
            else {
              setCreateField(false);
              if(customer === "") {
                setCustomerField(true);
                if(orderType === "") {
                  setOrderField(true);
                }
                else {
                  setOrderField(false);
                }
              }
              else {
                setCustomerField(false);
                if(orderType === "") {
                  setOrderField(true);
                }
                else {
                  setOrderField(false);
                }
              }
            }
          }
    
        });

        let saveDraftFunction = (order:string, customer:string, createdBy:string) => {
          if(!createdBy && !orderType && !customer) {
            setCreateField(true);
            setOrderField(true);
            setCustomerField(true);
        }
        else {
          setCreateField(false);
          setOrderField(false);
          setCustomerField(false);
          let newSavedDraft = {order: order, customer: customer, createdBy: createdBy} 
          setSavedData([
            ...savedData,
            newSavedDraft
          ]);
            clearValues();
        }
        }

        let resultDrafts = (order: {order: string, customer: string, createdBy: string}) => {
          setDraftLists(false);
          setOrderType(order.order);
          setCreatedBy(order.createdBy);
          setCustomer(order.customer);
        }

        let showLists = () => {
          return(
            <div className="listOfDrafts">
              {orders.order.map((order: {order: string, customer: string, createdBy: string}, index: number) => {
                return(
                  <MenuItem onClick = {() => {resultDrafts(order)}}>Order Number: {index + 1}</MenuItem>
                )
              })}
            </div>
          )
        }



        //saved drafts display
        let savedDraft = () => {
          if(orders.order.length > 0) {
            return (
              <>
                <span id = "saved" onClick = {() => {setDraftLists(true)}}>Saved Drafts</span>
                <span id = "notification">{orders.order.length}</span>
                {draftLists === true ? showLists(): null}
              </>
            )
          }
        }

        const closeDraftLists = () => {
          setDraftLists(false);
        }

        const body = (
          <div style={modalStyle} className = {classes.paper}>
            <form>
              <div className = "extraSpaces" id = "marginAbove">
                <label><b>Created by: </b></label>
                <TextField onClick = {closeDraftLists} className = {classes.createdBy} value = {createdBy} onChange = {(e) => {
                  getCreatedBy(e.target.value);
                }}type = "text" variant="outlined" />
                {!createField ? null: <span style = {{position: "fixed", right: "50%", top: "75px", color: "red"}}>This field is required</span>}
              </div>
              <div className = "extraSpaces">
                <label id = "customerField"><b>Customer: </b></label>
                <TextField onClick = {closeDraftLists} className = {classes.createdBy} value = {customer} onChange = {(e) => {
                  getCustomer(e.target.value);
                }} type = "text" variant="outlined" />
                {!customerField ? null: <span style = {{position: "fixed", right: "50%", top: "145px", color: "red"}}>This field is required</span>}
              </div>
              <div className = "extraSpaces">
                <label id = "orderType22"><b>Order Type: </b></label>
                  <FormControl id = "formControl" onClick = {closeDraftLists}>
                    <Select id = "selection" value = {orderType} onChange={getOrderType}>
                      <MenuItem  value={"Standard"}>Standard</MenuItem>
                      <MenuItem  value={"SaleOrder"}>Sale Order</MenuItem>
                      <MenuItem  value={"PurchaseOrder"}>Purchase Order</MenuItem>
                      <MenuItem  value={"TransferOrder"}>Transfer Order</MenuItem>
                      <MenuItem  value={"ReturnOrder"}>Return Order</MenuItem>
                    </Select>
                  </FormControl>
                  {!orderField ? null: <span style = {{position: "fixed", right: "50%", top: "220px", color: "red"}}>This field is required</span>}
              </div>
                  <Button variant="contained" onClick = {createOrder} color="primary" id = "submit">
                    CREATE
                  </Button>

                  <div className = {classes.save}>
                    <p className = "saveDraft" onClick = {() => {
                      saveDraftFunction(orderType, customer, createdBy);
                    }}>
                      Save Draft
                    </p>
                    <p>
                      {savedDraft()}
                    </p>
                  </div>
            </form>
          </div>
        );
    return(
        <>
        <Button variant="contained" color="primary" id = "order" onClick = {orderOpen}>
                <AddIcon/> CREATE ORDER
            </Button>
            <Modal
              open={open}
              onClose={orderClose}
            >
              {body}
            </Modal>
        </>
    )
}

export default Order;