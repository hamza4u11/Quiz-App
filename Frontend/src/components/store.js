import { legacy_createStore as createStore } from 'redux';
import NameReducer from './NameReducer';2

const store = createStore(NameReducer);

export default store;
