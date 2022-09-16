import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getURL } from "../functions/getData";
import { REQUEST_STATUS } from "../constants/internalConstants";
import { changedTimer, timerCanceled, timerStarted } from "../store/refreshSlice/refreshSlice";

export const useAxios = (initialValue, url, selectorsArray) => {

    const dispatch = useDispatch();

    initialValue = checkInitialState(initialValue);
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        // debugger
        dispatch(timerCanceled());

        console.log(url);

        const loadData = async () => {
            setState({ ...state, status: REQUEST_STATUS.PENDING });
            try {
                const { data } = await axios.get(url);
                setState({ ...state, data: data, status: REQUEST_STATUS.FULFILLED });
                // debugger
                dispatch(changedTimer());
            }
            catch (err) { 
                console.log(err); 
                dispatch(changedTimer());;
                setState({ ...state, error: err.message, status: REQUEST_STATUS.ERROR }) }
        }
        loadData();
    }, selectorsArray);

    return { state, setState };
}

const isObject = (obj) => {
    return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]'
}

const checkInitialState = (obj) => {
    if (isObject(obj)) {
        if (!obj.hasOwnProperty('data')) { obj.data = null };
        if (!obj.hasOwnProperty('status')) { obj.status = REQUEST_STATUS.PENDING };
        if (!obj.hasOwnProperty('error')) { obj.error = null };
        return obj;
    }
    else {
        return { data: null, status: REQUEST_STATUS.PENDING, error: null, }
    }
}
