import {configureStore} from '@reduxjs/toolkit'
import {persistStore, persistReducer,FLUSH,REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from './reducers'
import reactotron from '../../ReactotronConfig'


const persistConfig = {
        key : 'root',
        storage : AsyncStorage,
}
export const store = configureStore	({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),

    enhancers: (getDefaultEnhancers) =>
      __DEV__ ? getDefaultEnhancers()
        .concat(reactotron.createEnhancer()) : getDefaultEnhancers(),
    devTools: true,
})

export const persistor = persistStore(store) 



// otomatis ke asyncstorage 

// note

// Data diambil dari api
// dari api dikirim ke user index untuk dibentuk datanya segala select dll,
// dari user index di kirim datanya ke index reducers untuk di sliceing
// slice tersebut di kirim ke store dan di kirim ke async storage menggunakan alat persistStore