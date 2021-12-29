import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';
import "./Search.css";

interface searchOrById {
    searchOrder: Function
  }
const Search = (props: searchOrById) => {
    let [orderValue, setOrderValue] = useState();
    let store = useSelector((item: {order: {order: string}}) => item);

    const searchOrder = () => {
        props.searchOrder(orderValue);
    }
    return(
        <>
            <TextField id="outlined-basic" type = "number" value = {orderValue} onChange={(e: {target: {value: string | any}}) => {setOrderValue(e.target.value)}} placeholder = "Search" variant="outlined" />
            <Button variant="contained" color="primary" onClick = {searchOrder} id = "btn">
                <SearchIcon />
            </Button>
        </>
    )
}

export default Search;