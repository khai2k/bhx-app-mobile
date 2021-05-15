const baseUrl = 'https://staging.bachhoaxanh.com/apiapp/api/';

export const GetNavigationFromApi = (
    method,
    urlAPi,
    categoryId,
    currentProvinceId,
    currentStoreId,
    isCheckOnSales,
    clearcache
) => {
    if (method === 'GET') {
        return fetch(
            `${
                baseUrl + urlAPi
            }?categoryId=${categoryId}&provinceId=${currentProvinceId}&storeId=${currentStoreId}&isCheckOnSales=${isCheckOnSales}&clearcache=${clearcache}`
        )
            .then((response) => response.json())
            .then((json) => {
                const listCate = json.Value.reduce(
                    (accum, item) => [
                        ...accum,
                        {
                            ...item,
                            data: item.Childrens != null ? item.Childrens : []
                        }
                    ],
                    []
                );
                return listCate;
            })
            .catch((error) => {
                console.error(error);
            });
    }
};
