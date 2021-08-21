import backendApi from '../../api/backendApi';
import { CREATE_ORDER_QUERY } from '../../constants/queries/order';
import { CREATE_USER_QUERY } from '../../constants/queries/user';
import { errorToast } from '../../utils/toasts';
import { setLoggedInUser } from '../loggedInUser/loggedInUser.actions';
import { AppDispatch } from '../store';
import { SET_CURRENT_ORDER } from './currentOrder.types';

export const setOrder = (data: any) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_CURRENT_ORDER,
        payload: data
    });
};

export const checkout = (user: any, cart:any,tax:any, cb: Function) => async (dispatch: AppDispatch) => {
    try {
        const userRes = await backendApi.post('/', {
            query: CREATE_USER_QUERY,
            variables: {
                email: user.email,
                name: user.name,
                mobile: parseFloat(user.mobile),
                countryCode: parseInt(user.countryCode),
                type: user.type
            }
        });

        if (userRes.data.errors?.length) throw new Error(userRes.data.errors[0].message);

        dispatch(setLoggedInUser(userRes.data.data.createUser));
        let total : number = 0
        cart.items.forEach((el:any) =>{
            total += parseFloat(el.salePrice);
         });
         const taxTotal = Math.ceil((total / 100) * tax?.rate);
        const orderRes = await backendApi.post('/', {
            query: CREATE_ORDER_QUERY,
            variables: {
                user: userRes.data.data.createUser._id, 
                category_id: cart.items[0].category.id, 
                total_amount: taxTotal + total, 
                tax: taxTotal, 
                subtotal: total, 
                discount: 0, 
                currency: "INR", 
                products: cart.items.map((el:any) => {
                    return {
                        product_id: el.id,
                        product_name: el.name,
                        assigned_user: userRes.data.data.createUser._id,
                        amount: parseFloat(el.salePrice),
                    }
                })
            }
        });
      
        console.log(orderRes);
        dispatch(setOrder(orderRes.data));
        cb();
    } catch (error) {
        errorToast(error.message);
        console.log(error)
    }
};