import { createReducer, on } from "@ngrx/store"
import { saveToken } from "./auth.actions";
export const initialState: string = "";
export const bookReducer = createReducer(
    initialState,
);