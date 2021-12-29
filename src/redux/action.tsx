import {ADD_ORDER} from "./actionType";
import { SAVE_DRAFT } from "./actionType";

//action to add order
export const addOrder = (order: {createdByUserName: string, createdDate: string, customerName: string, orderId: number, orderType: string}) => {
    return {
        type: ADD_ORDER,
        payLoad: order
    }
}

//action to add saved draft
export const saveDraft = (order: {ordeType: string, customerName: string, createdByUserName: string}) => {
    return {
        type: SAVE_DRAFT,
        payLoad: order
    }
}