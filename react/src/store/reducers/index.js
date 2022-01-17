import { combineReducers } from "redux";
// import { Upload } from "../../../../backend/db";
import Auth from "./auth.reducers";
import Uploading from "./upload.reducer";

const reducers = combineReducers({
    auth: Auth,
    uploading: Uploading
})

export default reducers;