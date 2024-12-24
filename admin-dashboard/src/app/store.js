import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '';
import productReducer from './features/productSlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
  },
});

export default store;
