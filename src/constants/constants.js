export const CHECKING_AUTH_STATUS = "CHECKING_AUTH_STATUS";

export const SEARCH_STATE_INPUT = "SEARCH_STATE_INPUT";
export const SEARCH_STATE_RESULT = "SEARCH_STATE_RESULT";
export const SEARCH_STATE_INVALID = "SEARCH_STATE_INVALID";
export const SEARCH_STATE_CHECKING = "SEARCH_STATE_CHECKING";

export const SEARCH_TYPE_PRODUCT = "products";
export const SEARCH_TYPE_SHOP = "shops";

export const ITEMS_COLLECTION = "Items";
export const SHOPS_COLLECTION = "Owners";
export const CART_COLLECTION = "CartList";
export const CLICKS_COLLECTION = "Clicks";
export const USER_COLLECTION = "Users";
export const ML_COLLECTION = "ML";
export const ORDERS_COLLECTIONS = "OrderList";

export const MAXIMUM_DELIVERY_DISTANCE_MILES = 124; // 200km in miles

export const SUCCESS_FETCH = "SUCCESS_FETCH";
export const FAILURE_FETCH = "FAILURE_FETCH";
export const START_FETCH = "START_FETCH";

// this is a localstorage key, to see if user has checked out any product since last home page visit.
// if he has not viewed we wont make a call to ML.
export const PRODUCT_VIEWED = "PRODUCT_VIEWED";
