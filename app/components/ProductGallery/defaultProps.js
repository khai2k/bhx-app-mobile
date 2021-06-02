import * as React from 'react';
import {Image, ImageURISource, Text, View, ViewStyle} from 'react-native';
import {simpleStyle} from './image-viewer.style';

export default Props = {
  /**
   * 是否显示
   */
  show: false,

  /**
   * 图片数组
   */
  imageUrls: [],

  /**
   * 滑动到下一页的X阈值
   */
  flipThreshold: 80,

  /**
   * 当前页能滑到下一页X位置最大值
   */
  maxOverflow: 300,

  /**
   * 初始显示第几张图
   */
  index: 0,

  /**
   * 加载失败的图
   */
  failImageSource: undefined,

  /**
   * 背景颜色
   */
  backgroundColor: 'black',

  /**
   * style props for the footer container
   */
  footerContainerStyle: {},

  /**
   * Menu Context Values
   */
  menuContext: {saveToLocal: 'save to the album', cancel: 'cancel'},

  /**
   * 是否开启长按保存到本地的功能
   */
  saveToLocalByLongPress: true,

  /**
   * 是否允许缩放图片
   */
  enableImageZoom: true,

  style: {},

  /**
   * Enable swipe down to close image viewer.
   * When swipe down, will trigger onCancel.
   */
  enableSwipeDown: false,

  /**
   * threshold for firing swipe down function
   */
  swipeDownThreshold: 100,

  doubleClickInterval: 100,

  /**
   * Min and Max scale for zooming
   */
  minScale: 1,

  maxScale: 3,

  /**
   * 是否预加载图片
   */
  enablePreload: false,

  /**
   * 翻页时的动画时间
   */
  pageAnimateTime: 100,

  /**
   * 是否启用原生动画驱动
   * Whether to use the native code to perform animations.
   */
  useNativeDriver: false,

  /**
   * 长按图片的回调
   */
  onLongPress: () => {
    //
  },

  /**
   * 单击回调
   */
  onClick: () => {
    //
  },

  /**
   * 双击回调
   */
  onDoubleClick: () => {
    //
  },

  /**
   * 图片保存到本地方法，如果写了这个方法，就不会调取系统默认方法
   * 针对安卓不支持 saveToCameraRoll 远程图片，可以在安卓调用此回调，调用安卓原生接口
   */
  onSave: () => {
    //
  },

  onMove: () => {
    //
  },

  /**
   * 自定义头部
   */
  renderHeader: () => {
    return null;
  },

  /**
   * 自定义尾部
   */
  renderFooter: () => {
    return null;
  },

  /**
   * 自定义计时器
   */
  renderIndicator: (currentIndex, allSize) => {
    return React.createElement(
      View,
      {style: simpleStyle.count},
      React.createElement(
        Text,
        {style: simpleStyle.countText},
        currentIndex + '/' + allSize,
      ),
    );
  },

  /**
   * Render image component
   */
  renderImage: props => {
    return React.createElement(Image, props);
  },

  /**
   * 自定义左翻页按钮
   */
  renderArrowLeft: () => {
    return null;
  },

  /**
   * 自定义右翻页按钮
   */
  renderArrowRight: () => {
    return null;
  },

  /**
   * 弹出大图的回调
   */
  onShowModal: () => {
    //
  },

  /**
   * 取消看图的回调
   */
  onCancel: () => {
    //
  },

  /**
   * function that fires when user swipes down
   */
  onSwipeDown: () => {
    //
  },

  /**
   * 渲染loading元素
   */
  loadingRender: () => {
    return null;
  },

  /**
   * 保存到相册的回调
   */
  onSaveToCamera: () => {
    //
  },

  /**
   * 当图片切换时触发
   */
  onChange: () => {
    //
  },

  menus: () => React.ReactElement,
};
