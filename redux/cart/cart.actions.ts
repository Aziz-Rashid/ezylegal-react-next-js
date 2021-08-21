import Router from 'next/router';
import { AppDispatch } from '../store';
import backendApi from '../../api/backendApi';
import { ADD_ITEMS, EMPTY_CART } from "./cart.types";
import {Get_Signed_URL,Get_Time_Slotes,Uploard_Document_Url,SheduleForCall,requirmentInfo} from '../../constants/queries/order'
import { errorToast } from '../../utils/toasts';
export const addItems = (data: any) => (dispatch: AppDispatch) => {
    dispatch({
        type: ADD_ITEMS,
        payload: data
    });

    Router.push('/checkout');
};

export const Get_Signed_Url = (data: any,state: any,url: any,cb: Function) => async (dispatch: AppDispatch) => {
    try {
        const getUrl = await backendApi.post('/', {
            query: Get_Signed_URL,
            variables: {
                docType: data
            }
        });
        if (getUrl.data.errors?.length) throw new Error(getUrl.data.errors[0].message);
        state([...url,getUrl.data.data.getSignedUrl.url])
         cb()
    } catch (error) {
        errorToast(error.message);
    }
}
export const Get_Time_Slot = (time: any,setTimeslote:any) => async (dispatch: AppDispatch) => {
    try {
        const getTime = await backendApi.post('/', {
            query: Get_Time_Slotes,
            variables: {
                time: time
            }
        });
        if (getTime.data.errors?.length) throw new Error(getTime.data.errors[0].message);
        setTimeslote(getTime.data.data.getTimeSlot)
    } catch (error) {
        errorToast(error.message);
    }
}

export const Upload_docs_Url = (url:any,callBackSlote:any,requrmentInfo:String,cb:Function) => async (dispatch: AppDispatch) => {
    try {
        const getTime = await backendApi.post('/', {
            query: Uploard_Document_Url,
            variables: {
                document_name: url[0].document_name,
                document_url: url[0].document_url,
                _id: url[0]._id
            }
        });
        if (getTime.data.errors?.length) throw new Error(getTime.data.errors[0].message);

        const requirmentinfoUrl = await backendApi.post('/', {
            query: requirmentInfo,
            variables: {
                _id: callBackSlote._id,
                requirmentInfo: requrmentInfo
            }
        });
        const requestCallBack = await backendApi.post('/', {
            query: SheduleForCall,
            variables: {
                _id: callBackSlote._id,
                assignedUser: callBackSlote.assignedUser,
                time_slot: callBackSlote.time_slot
            }
        });
        cb()
        // if (requestCallBack.data.errors?.length) throw new Error(requestCallBack.data.errors[0].message);

    } catch (error) {
        errorToast(error.message);
    }
}



export const emptyCart = () => (dispatch: AppDispatch) => {
    dispatch({
        type: EMPTY_CART
    });
};