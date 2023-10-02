export enum ProductActionsTypes {
    GET_ALL_PRODUCTS = "[Product] Get All products",
    GET_SELECTED_PRODUCTS = "[Product] Get Selected products",
    GET_AVAILABLE_PRODUCTS = "[Product] Get Available products",
    SEARCH_PRODUCTS = "[Product] Search products",
    NEW_PRODUCT = "[Product] Create new product",
    EDIT_PRODUCT = "[Product] Edit product",
    DELETE_PRODUCT = "[Product] Delete product",
    SELECT_PRODUCT = "[Product] Select product",
    PRODUCT_ADDED = "[Product] Added product",
    PRODUCT_UPDATED = "[Product] Updated product"
}

export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export interface ActionEvent {
    type: ProductActionsTypes,
    payload?: any
}

export interface AppDataState<T>{
    dataState: DataStateEnum,
    data?: T,
    errorMessage?: string 
}