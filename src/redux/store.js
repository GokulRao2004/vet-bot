import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer'
import globalReducer from './reducers/globalReducer'
import petRecordReducer from './reducers/petRecordReducer';
import storageSession from 'redux-persist/lib/storage/session'; 
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import addPetRecordReducer from './reducers/addPetRecordReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    global: globalReducer,
    petRecords: petRecordReducer,
    addPetRecord: addPetRecordReducer
});

const persistConfig = {
    key: 'root',
    storage : storageSession,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)


