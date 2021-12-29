import React, {useState} from "react";
import { useSelector } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./Customer.css";

interface selectedCustomer {
    getCustomer: Function
}
const Customer = (props: selectedCustomer) => {
    let currentCustomers = useSelector((state: {order: {order: string | any}}) => state.order.order);

    //all the customers saved in the database
    let getCurrentCustomer = () => {
        //removing all the duplicate customers
        let customerOnly: string[] = [];
        currentCustomers.forEach((customer: {customerName: string}, index: number) => {
            customerOnly[index] = customer.customerName;
        })
        customerOnly = customerOnly.filter((item: string, pos: number) => {
            return customerOnly.indexOf(item) === pos;
        })
        return(
            customerOnly.map((customer: string) => {
                return(
                    <option value = {customer}>{customer}</option>
                )
            })
        )
    }

    let [customer, setCustomer] = useState("Customer");
    let getCustomerValue = (e: {target: {value: string | any}}) => {
        props.getCustomer(e.target.value);
        setCustomer(e.target.value);
    }
    return(
        <FormControl variant = "outlined" id = "customer">
            <Select
                native 
                value = {customer}
                onChange = {getCustomerValue}
                label = "Customer"
                inputProps = {{
                    name: "Customer",
                    id: "outlined-age-native-simple"
                }}>
                    <option value = "">Customer</option>
                    {getCurrentCustomer()}
                </Select>
                
        </FormControl>
    )
}

export default Customer;