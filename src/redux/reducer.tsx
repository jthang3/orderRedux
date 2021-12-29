import { stat } from "fs";
import {ADD_ORDER} from "./actionType";
import { SAVE_DRAFT } from "./actionType";


let initialOrder = {
    order: []
}

let saveDraftOrder = {
    order: []
}

export const saveDraftReducer = (state = saveDraftOrder, action: {type: string, payLoad: {createdByUserName: string, createdDate: string, customerName: string, orderId: number, orderType: string}}) => {
    switch(action.type) {
        case SAVE_DRAFT:
            return {
                ...state,
                order: action.payLoad
            }
        default:
            return state;
    }
}

export const addOrderReducer = (state = initialOrder, action: {type: string, payLoad: {createdByUserName: string, createdDate: string, customerName: string, orderId: number, orderType: string} }) => {
    switch(action.type) {
        case ADD_ORDER:
            return {
                ...state,
                order: action.payLoad
            }
        default:
            return state;
    }
}