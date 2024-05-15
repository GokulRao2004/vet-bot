import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer'
import globalReducer from './reducers/globalReducer'
import petRecordReducer from './reducers/petRecordReducer';
import storage from 'redux-persist/lib/storage'; 
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
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: rootReducer
})


export {persistedReducer} 
