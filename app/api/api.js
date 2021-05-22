//  export const API_BASE = 'https://beta.bachhoaxanh.com/apiapp/api/';
export const API_BASE = 'https://staging.bachhoaxanh.com/apiapp/api/';
export const API_REQUEST_GET_CART = `${API_BASE}Order/get`;
export const API_REQUEST_ADD_CART = `${API_BASE}/Order/add`;
export const API_REQUEST_REMOVE_CART = `${API_BASE}/Order/remove`;
export const API_REQUEST_UPDATE_CART = `${API_BASE}/Order/update`;
export const API_GET_CATEGORY_NAVIGATION = `${API_BASE}/shared/GetNavigation`;
export const GET_LIST_CATEGORIES = `${API_BASE}Home/ListCategories`;
export const GET_LIST_PRODUCT = `${API_BASE}Home/GetHomeData`;
export const GET_MORE_LIST_PRODUCT = `${API_BASE}Home/AjSockPriceBox`;

// Location
export const API_LOCATION_GETBYCOORDINATES = `${API_BASE}/shared/GetLocationByCoordinates`;
export const API_LOCATION_GETALLPROVINCE = `${API_BASE}/shared/GetAllProvince`;
export const API_LOCATION_GETDICTRICTBYPROVINCE = `${API_BASE}/shared/GetDistrictsByProvince`;
export const API_LOCATION_GETWARDBYDICANDPROVINCE = `${API_BASE}/shared/GetWard`;
export const API_LOCATION_SEARCHLOCATION = `${API_BASE}/shared/ProvinceSearchAutocomplete`;

export const API_SEARCH_SUGGESTMODAL = `${API_BASE}/shared/SearchAutocomplete`;

// category
export const API_CATEGORY_GET = `${API_BASE}Category/Get`;
export const API_CATEGORY_AJAX_PRODUCT = `${API_BASE}Category/AjaxProducts`;

// productDetail
export const API_GET_PRODUCT_DETAIL = `${API_BASE}product/ProductDetail`;
export const API_GET_PRODUCT_RELATIVE = `${API_BASE}product/ProductRelative`;
export const API_GET_BOX_BANNER = `${API_BASE}product/BoxBanner`;
export const API_GET_COMBO_DETAIL = `${API_BASE}product/ComboDetail`;
