import React from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import "./delete.css";

interface deleteData {
    deleteValue: {createdByUserName: string, createdDate: string, customerName: string, orderId: number, orderType: string} [],
    renderMe: Function,
    updateDeleteValue: Function
}

const Delete = (props: deleteData) => {
    let {deleteValue} = props;
    let arrayDelete: number[] = [];
    deleteValue.forEach((index: {orderId: number}) => {
        arrayDelete.push(index.orderId);
    });
    let deleteFunction = async () => {
        let data = await axios(`https://red-candidate-web.azurewebsites.net/api/Orders/delete`, {
            method: "POST",
            data: arrayDelete,
            headers: ({
                "Content-Type": "application/json",
                "ApiKey": "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4"
            })
        }).catch(err => console.log(err));
        await props.updateDeleteValue();
        await props.renderMe();
    }

    return (
        <DeleteIcon className = "delete" onClick = {deleteFunction} />
    )
}

export default Delete;