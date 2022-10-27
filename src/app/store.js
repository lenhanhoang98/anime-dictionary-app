import { configureStore } from '@reduxjs/toolkit'
import theme from './theme/themeSlice'
import { jikanApi } from '../services/jikanApi'

export default configureStore({
    reducer: {
        [jikanApi.reducerPath]: jikanApi.reducer,
        theme,
    }
})