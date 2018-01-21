import { combineReducers } from "redux";
import routes from "./routes";
import EncyclopediaReducer from './EncyclopediaReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
    routes,
    encyclopedia: EncyclopediaReducer,
    selectedLibraryId: SelectionReducer,
})