import { createStore, combineReducers, applyMiddleware } from "redux";
import { addOrderReducer, saveDraftReducer } from "./reducer";

let ReduxThunk = require("redux-thunk").default;
let rootReducer = combineReducers({
    order: addOrderReducer,
    saveDraft: saveDraftReducer
})

let store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default store;