import { combineReducers } from 'redux';
import authReducer from "./Slice/authSlice"
import lawyerProfileReducer from './Slice/LawyerprofileSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  lawyerProfile: lawyerProfileReducer,
});

export default rootReducer;
