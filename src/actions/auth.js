import { customFetch } from '../functions';
import * as types from './actionTypes.js';



export const login = (userInfo) => async (dispatch, getState) => {

    const [loginRes, loginErr] = await customFetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
    })

    if (loginErr) dispatch({
        type: types.LOGIN_FAILED,
        payload: { error:loginErr }
    });

    else{
        localStorage.setItem('token', loginRes);
        dispatch({
            type: types.LOGIN_SUCCESS,
            payload: {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                token: loginRes
            }
        });
    }

}

