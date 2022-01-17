import { UPLOAD_CREATE_SUCCESS, UPLOAD_CREATE_FAILL } from "../actions/types";

const uploading = {
    upload: {}
}
export default function Uploading(state = uploading, action) {
    switch(action.type) {
        case UPLOAD_CREATE_SUCCESS:
            return {...state, upload: action.payload};
        case UPLOAD_CREATE_FAILL:
            return {...state, upload: action.payload};
        default:
            return {...state};
    }
}