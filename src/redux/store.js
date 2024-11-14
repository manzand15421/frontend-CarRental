import {configureStore} from '@reduxjs/toolkit'
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from './reducers'


const persistConfig = {
        key : 'root',
        storage : AsyncStorage,
}
export const store = configureStore	({
    reducer: persistReducer(persistConfig, rootReducer),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    // enhancers: (getDefaultEnhancers) =>
    //   __DEV__ ? getDefaultEnhancers()
    //     .concat(reactotron.createEnhancer()) : getDefaultEnhancers(),
    // devTools: true,
})

export const persistor = persistStore(store) 



// otomatis ke asyncstorage 

// note

// Data diambil dari api
// dari api dikirim ke user index untuk dibentuk datanya segala select dll,
// dari user index di kirim datanya ke index reducers untuk di sliceing
// slice tersebut di kirim ke store dan di kirim ke async storage menggunakan alat persistStore