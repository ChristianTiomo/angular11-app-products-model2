export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState <T>{
  dataState?: DataStateEnum,  // le point d'interrogation (dataState?) indique que la presence de la variable n'est pas obligatoire
  data?:T,
  errorMessage?:string
}

export enum ProductActionsTypes{
  GET_ALL_PRODUCTS="[Product] Get All products",
  GET_SELECTED_PRODUCTS="[Product] Selected All products",
  GET_AVAILABLE_PRODUCTS="[Product] Get Available products",
  SEARCH_PRODUCTS="[Product] Search products",
  NEW_PRODUCT="[Product] New products",
  SELECT_PRODUCT="[Product] Select products",
  EDIT_PRODUCT="[Product] Edit products",
  DELETE_PRODUCT="[Product] Delete products",
}

export interface ActionEvent {
  type: ProductActionsTypes,
  payload?: any
}
