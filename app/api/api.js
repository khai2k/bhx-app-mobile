//  export const API_BASE = 'https://betazuul.tgdd.vn/apiapp/api/';
export const API_BASE = 'https://staging.bachhoaxanh.com/apiapp/api/';
//  export const API_BASE = 'https://www.bachhoaxanh.com/apiapp/api/';
export const API_REQUEST_GET_CART = `${API_BASE}Order/get`;
export const API_REQUEST_GET_SIMPLE_CART = `${API_BASE}Order/getsimple`;
export const API_REQUEST_ADD_CART = `${API_BASE}/Order/add`;
export const API_REQUEST_REMOVE_ITEM_CART = `${API_BASE}/Order/remove`;
export const API_REQUEST_REMOVE_CART = `${API_BASE}/Order/removeall`;
export const API_REQUEST_UPDATE_CART = `${API_BASE}/Order/update`;
export const API_REQUEST_SUBMIT_CART = `${API_BASE}/Order/Submit`;

// Menu
export const API_GET_CATEGORY_NAVIGATION = `${API_BASE}/shared/GetNavigation`;

// Home
export const GET_LIST_CATEGORIES = `${API_BASE}Home/ListCategories`;
export const GET_CATE_LINES = `${API_BASE}Home/CateLines`;
export const GET_HOME_DATA = `${API_BASE}Home/GetHomeData`;
export const LOAD_MORE_PRODUCTS = `${API_BASE}Home/AjSockPriceBox`;
export const LOAD_MORE_HOME_DATA = `${API_BASE}Home/LoadMoreHomeData`;
export const GET_FRESH_PRODUCTS = `${API_BASE}Home/AjGetFreshProducts`;
export const LINE_SEASON = `${API_BASE}Home/LineSeason`;
export const LINE_EXPIRED = `${API_BASE}Home/LineExpired`;
export const LINE_PERSONALIZE = `${API_BASE}Home/LinePersonalize`;
export const LINE_PERSONALIZE_LOAD_MORE = `${API_BASE}Home/LinePersonalizeLoadMore`;
export const GET_CATE_PARENT = `${API_BASE}Home/AjGetCateParent`;
export const SLIDE_BANNER = `${API_BASE}Home/SlideBanner`;
export const BANNER_NEW_YEAR_2020 = `${API_BASE}Home/BannerNewYear2020`;
export const BANNER_4K_FARM = `${API_BASE}Home/Banner4kfarm`;
export const TIPS = `${API_BASE}Home/Tips`;
export const STORES = `${API_BASE}Home/Stores`;

// OrderSuccess
export const API_REQUEST_GET_ORDER_SUCCESS = `${API_BASE}Order/OrderResult`;
export const API_REQUEST_CANCEL_ORDER_SUCCESS = `${API_BASE}Order/cancleorder`;

// Location
export const API_LOCATION_GETBYCOORDINATES = `${API_BASE}/shared/GetLocationByCoordinates`;
export const API_LOCATION_GETALLPROVINCE = `${API_BASE}/shared/GetAllProvince`;
export const API_LOCATION_GETDICTRICTBYPROVINCE = `${API_BASE}/shared/GetDistrictsByProvince`;
export const API_LOCATION_GETWARDBYDICANDPROVINCE = `${API_BASE}/shared/GetWard`;
export const API_LOCATION_SEARCHLOCATION = `${API_BASE}/shared/ProvinceSearchAutocomplete`;
export const API_LOCATION_GETSTORE = `${API_BASE}/shared/GetStore`;

export const API_SEARCH_SUGGESTMODAL = `${API_BASE}/shared/SearchAutocomplete`;

// category
export const API_CATEGORY_GET = `${API_BASE}Category/Get`;
export const API_CATEGORY_AJAX_PRODUCT = `${API_BASE}Category/AjaxProducts`;

// productDetail
export const API_GET_PRODUCT_DETAIL = `${API_BASE}product/ProductDetail`;
export const API_GET_PRODUCT_RELATIVE = `${API_BASE}product/ProductRelative`;
export const API_GET_BOX_BANNER = `${API_BASE}product/BoxBanner`;
export const API_GET_COMBO_DETAIL = `${API_BASE}product/ComboDetail`;
export const API_GET_GALLERY_PRODUCT = `${API_BASE}product/GalleryProduct`;

// Promotion
export const API_GET_PROMOTIONPAGE_GETLISTCATEGORY = `${API_BASE}PromotionPage/GetListCategory`;
export const API_GET_TOPDEALPROMOTION = `${API_BASE}PromotionPage/TopDealPromotion`;
export const API_POST_LOAD_MORE_PRODUCTS_GROUP = `${API_BASE}PromotionPage/AjaxProductsGroup`;
export const API_POST_PRODUCT_BY_SUB_CATE = `${API_BASE}PromotionPage/AjaxProductsBySubCate`;

// Voucher

export const API_REQUEST_GET_VOUCHER = `${API_BASE}/VoucherCoupon/GetVoucherCouponIncart`;
export const API_REQUEST_ADD_VOUCHER = `${API_BASE}/VoucherCoupon/ApplyVoucher`;
export const API_REQUEST_DELETE_VOUCHER = `${API_BASE}/VoucherCoupon/ClearVoucherCoupon`;
// Search
export const API_SEARCH_GET = `${API_BASE}SearchPage/Get`;
export const API_SEARCH_AJAXPRODUCT = `${API_BASE}SearchPage/AjaxProducts`;
export const API_SEARCH_AJAXPRODUCT_OEM = `${API_BASE}SearchPage/AjaxOEMProduct`;

//  Notification
export const API_NOTIFICATION_SUBSCRIBER = `${API_BASE}Notification/subscriber`;
export const API_NOTIFICATION_GET_LIST = `${API_BASE}Notification/getlist`;
