import {createAction,props} from "@ngrx/store"
export const saveToken=createAction(
    '[Token Save] Save Token',
    props<{token:string}>
);