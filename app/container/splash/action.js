const SHOW_SPLASH = 'SHOW_SPLASH';

export const authenAction = {
    SHOW_SPLASH
};

export const show_splash = function (isShowSplash = true) {
    return (dispatch) => {
        dispatch({
            type: SHOW_SPLASH,
            isShowSplash
        });
    };
};
