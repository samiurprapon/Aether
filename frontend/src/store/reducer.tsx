import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from '~/store/slices/auth';

const reducer = combineReducers({
	auth: persistReducer(
		{
			key: 'aether',
			storage,
		},
		authSlice,
	),
});

export default reducer;
