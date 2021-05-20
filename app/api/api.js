//  export const API_BASE = 'https://beta.bachhoaxanh.com/apiapp/api/';
export const API_BASE = 'https://staging.bachhoaxanh.com/apiapp/api/';
export const API_REQUEST_GET_CART = `${API_BASE}Order/get`;
export const API_REQUEST_ADD_CART = `${API_BASE}/Order/add`;
export const API_REQUEST_REMOVE_CART = `${API_BASE}/Order/remove`;
export const API_REQUEST_UPDATE_CART = `${API_BASE}/Order/update`;
export const API_GET_CATEGORY_NAVIGATION = `${API_BASE}/shared/GetNavigation`;
export const GET_LIST_CATEGORIES = `${API_BASE}Home/ListCategories`;
export const GET_LIST_PRODUCT = `${API_BASE}Home/GetHomeData`;

// Location
export const API_LOCATION_GETBYCOORDINATES = `${API_BASE}/shared/GetLocationByCoordinates`;
export const API_LOCATION_GETALLPROVINCE = `${API_BASE}/shared/GetAllProvince`;
export const API_LOCATION_GETDICTRICTBYPROVINCE = `${API_BASE}/shared/GetDistrictsByProvince`;
export const API_LOCATION_GETWARDBYDICANDPROVINCE = `${API_BASE}/shared/GetWard`;

// category
export const API_CATEGORY_GET = `${API_BASE}Category/Get`;
export const API_CATEGORY_AJAX_PRODUCT = `${API_BASE}Category/AjaxProducts`;
