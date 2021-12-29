import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./orderType.css";

interface getMyOrder {
  myOrder: Function
}
const OrderType = (props: getMyOrder) => {
    let [orderType,setOrderType] = useState("Order");
    let getOrderTypeValue = (e: {target: {value: string | any}}) => {
        props.myOrder(e.target.value);
        setOrderType(e.target.value);
    }
    return(
        <FormControl variant="outlined" id = "orderType">
        <Select
          native
          value={orderType}
          onChange={getOrderTypeValue}
          label="Order Type"
          inputProps={{
            name: 'OrderType',
            id: 'orderMe',
          }}
        >
          <option value={"Order Type"}>Order Type</option>
          <option value={"Standard"}>Standard</option>
          <option value={"SaleOrder"}>Sale Order</option>
          <option value={"PurchaseOrder"}>Purchase Order</option>
          <option value={"TransferOrder"}>Transfer Order</option>
          <option value={"ReturnOrder"}>Return Order</option>
        </Select>
      </FormControl>
    )
}

export default OrderType;