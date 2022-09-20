import {RootState} from "./store";

export const getTokenSelector = (state: RootState) => state.user.token;
export const getContactSelector = (state: RootState) => state.user.contacts;
export const getStatusErrorSelector = (state: RootState) => state.user.status;
