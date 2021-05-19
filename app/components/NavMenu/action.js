import { apiBase, METHOD, API_CONST } from '@app/api';

const MENU_GET = 'MENU_GET';

export const menuAction = {
  MENU_GET
};

// Param để lấy danh sách cate
const categoryId = 0;
const provinceId = 3;
const storeId = 6463;
const isCheckOnSales = true;
const phone = 0;
const isMobile = true;
const clearcache = 'ok';

export const menu_get = function () {
    return (dispatch, getSate) => {
            apiBase(
                API_CONST.API_GET_CATEGORY_NAVIGATION,
                METHOD.GET,
                {},
                {
                    params: {
                        categoryId,
                        provinceId,
                        storeId,
                        isCheckOnSales,
                        phone,
                        isMobile,
                        clearcache
                    }
                }
            )
                .then((response) => {
                    // Parse dữ liệu để dùng cho sectionList
                    const menu = response.Value.reduce(
                        (accum, item) => [
                            ...accum,
                            {
                                ...item,
                                data:
                                    item.Childrens != null ? item.Childrens : []
                            }
                        ],
                        []
                    );
                    dispatch({
                      type: MENU_GET,
                      menu
                  });
                })
                .catch((error) => {
                    console.log(error);
                });
    };
};


