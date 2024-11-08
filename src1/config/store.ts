
import {configureStore} from "@reduxjs/toolkit";
import reducers from "./reducer";

//redux store digunakan sebagai gudang data
export const store = configureStore ({
    reducer: reducers, //ini adalah inisialisasi pembuatan rak untuk data
    devTools: true, //config untuk debug redux
})

export type RootState = ReturnType<typeof store.getState> // untuk mengambil data dari reducer

export type AppDispatch = typeof store.dispatch //untuk melakukan kontrol perubahan atau penambahan terhadap reducer



