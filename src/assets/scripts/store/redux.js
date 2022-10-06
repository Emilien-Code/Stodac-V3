import {configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux-slices/cart';
import modalsReducer from './redux-slices/modals';
import authenticationReducer from './redux-slices/authentication';
import articles from './redux-slices/articles';

export default configureStore({
    reducer: {
        cart: cartReducer,
        modals: modalsReducer,
        authentication: authenticationReducer,
        articles: articles,
    },
})