import { configureStore } from '@reduxjs/toolkit'
import customer from '../todos/customer'
export default configureStore({
    reducer: {
        customer
    }
})