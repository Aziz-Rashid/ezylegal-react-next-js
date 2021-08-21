import { ADD_ITEMS, EMPTY_CART } from "./cart.types";

interface CartState {
    items: Array<any>;
};

const initState:CartState = {
    items: [],
};

const cartReducer = (state = initState, action: any) => {
    switch (action.type) {
        case ADD_ITEMS:
            return {
                ...state, items: [...state.items, ...action.payload]
            };
        case EMPTY_CART:
            return {
                ...state, items: []
            };
        default:
            return state;
    }
};

export default cartReducer;
