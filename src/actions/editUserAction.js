import { customFetch } from '../functions';
import * as types from './actionTypes.js';

export const fetchClientAction = (path,payload={}) => async (dispatch, getState) => {
    //fetch client-fc
    const [fcRes, fcErr] = await customFetch(path,payload)

    if (fcErr) dispatch({
        type: types.FETCH_CLIENT_FAILED,
        payload: { error: fcErr }
    });

    else dispatch({
        type: types.FETCH_CLIENT_SUCCESS,
        payload: { res: fcRes }
    });
}