import { apiBase, METHOD, API_CONST } from '@app/api';

const GET_LIST_CATEGORIES = 'GET_LIST_CATEGORIES';

export const homeAction = {
    GET_LIST_CATEGORIES
};

export const get_listcategories = function () {
    return (dispatch) => {
        const bodyApi = {
            phone: '',
            isMobile: true,
            storeId: 6463,
            clearcache: ''
        };
        const urlApi =
            "https://staging.bachhoaxanh.com/apiapp/api/Home/ListCategories?phone=''&isMobile=true&storeId=6463&clearcache=''";
        // API_CONST.GET_LIST_CATEGORIES
        apiBase(urlApi, METHOD.POST, bodyApi)
            .then((response) => {
                console.log('GET_LIST_CATEGORIES Data:', response);
                const listCategories = response.Value;
                dispatch({
                    type: GET_LIST_CATEGORIES,
                    listCategories
                });
            })
            .catch((error) => {
                console.log('This is Error:', error);
            });
    };
};
