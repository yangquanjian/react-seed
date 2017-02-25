const prefixMap = require('./antd-prefix');

module.exports = Object.assign(
  {},
  prefixMap,
  {
    // 色彩
    // ---
    // 文字色
    '@color-text-base': '#000',                  // 基本

    '@color-text-base-inverse': '#fff',          // 基本 - 反色
    '@color-text-secondary': '#a4a9b0',          // 辅助色
    '@color-text-placeholder': '#ccc',           // 文本框提示
    '@color-text-disabled': '#bbb',              // 失效
    '@color-text-caption': '#888',               // 辅助描述
    '@color-text-paragraph': '#333',             // 段落
    '@color-link': '@brand-primary',             // 链接

    // 阴影色
    '@color-shadow': 'rgba(128, 128, 128, .2)',  // 阴影色

    // 背景色
    '@fill-base': '#fff',                           // 组件默认背景
    '@fill-body': '#f5f5f9',                        // 页面背景
    '@fill-tap': '#ddd',                            // 组件默认背景 - 按下
    '@fill-disabled': '#ddd',                       // 通用失效背景
    '@fill-mask': 'rgba(0, 0, 0, .5)',              // 遮罩背景
    '@fill-overlay-inverse': 'rgba(0, 0, 0, .8)',   // 浮层背景 - 反色，用于 toast

    // 透明度
    '@opacity-disabled': 0.3,   // switch checkbox radio 等组件禁用的透明度

    // 全局/品牌色
    '@brand-primary': '#108ee9',
    '@brand-primary-tap': '#1284d6',
    '@brand-success': '#6abf47',
    '@brand-warning': '#f86e21',
    '@brand-error': '#f4333c',
    '@brand-hot': '#f96268',        // 用于推荐/促销/折扣
    '@brand-important': '#ff3b30',  // 用于小红点
    // 边框色
    '@border-color-base': '#ddd',

    // 字体尺寸
    // ---
    '@font-size-icontext': '20px',
    '@font-size-caption-sm': '24px',
    '@font-size-base': '26px',
    '@font-size-subhead': '28px',
    '@font-size-caption': '30px',
    '@font-size-heading': '34px',
    '@font-size-display-sm': '36px',
    '@font-size-display-md': '42px',
    '@font-size-display-lg': '48px',
    '@font-size-display-xl': '60px',

    // 字体家族
    // ---
    '@font-family-code': 'Consolas,Menlo,Courier,monospace',

    // 圆角
    // ---
    '@radius-xs': '4px',
    '@radius-sm': '6px',
    '@radius-md': '10px',
    '@radius-lg': '14px',

    // 边框尺寸
    // ---
    '@border-width-sm': '1PX',
    '@border-width-md': '2px',
    '@border-width-lg': '4px',

    // 间距
    // ---
    // 水平间距
    '@h-spacing-sm': '12px',
    '@h-spacing-md': '18px',
    '@h-spacing-lg': '30px',

    // 垂直间距
    '@v-spacing-xs': '6px',
    '@v-spacing-sm': '12px',
    '@v-spacing-md': '18px',
    '@v-spacing-lg': '30px',
    '@v-spacing-xl': '42px',

    // 高度
    // ---
    '@option-height': '84px',           // action-sheet、popover 等组件的选项高度

    // 图标尺寸
    // ---
    '@icon-size-xxs': '30px',
    '@icon-size-xs': '36px',
    '@icon-size-sm': '42px',
    '@icon-size-md': '44px',       // 导航条上的图标、grid的图标大小
    '@icon-size-lg': '72px',

    // 动画缓动
    // ---
    '@ease-in-out-quint': 'cubic-bezier(0.86, 0, 0.07, 1)',

    // 组件变量
    // ---

    // button
    '@button-height': '84px',
    '@button-font-size': '36px',

    '@button-height-sm': '46px',
    '@button-font-size-sm': '24px',

    '@across-button-height': '100px',   // 通栏按钮高度

    '@primary-button-fill': '@brand-primary',
    '@primary-button-fill-tap': '@brand-primary-tap',

    '@ghost-button-color': '@brand-primary',    // 同时应用于背景、文字颜色、边框色
    '@ghost-button-fill-tap': '@brand-primary-tap',

    '@link-button-fill-tap': '#ddd',
    '@link-button-font-size': '24px',

    // list
    '@list-title-height': '60px',
    '@list-item-height-sm': '70px',
    '@list-item-height': '90px',
    '@list-body-border-width': '1PX',
    '@list-body-border-color': '@border-color-base',

    // input
    '@input-label-width': '34px',       // InputItem、TextareaItem 文字长度基础值
    '@input-font-size': '28px',
    '@input-color-icon': '#ccc',
    '@input-color-icon-tap': '@brand-primary',
    '@input-color-icon-inverse': 'rgba(255, 255, 255, .6)',
    '@input-color-icon-tap-inverse': 'rgba(255, 255, 255, .4)',

    // tabs
    '@tabs-color': '@brand-primary',
    '@tabs-height': '84px',
    '@tabs-font-size-heading': '30px',
    '@tabs-ink-bar-height': '4px',

    // segmented-control
    '@segmented-control-color': '@brand-primary',  // 同时应用于背景、文字颜色、边框色
    '@segmented-control-height': '54px',
    '@segmented-control-fill-tap': 'fade(@brand-primary, 0.1)',

    // tab-bar
    '@tab-bar-fill': '#ebeeef',
    '@tab-bar-height': '120px',

    // search-bar
    '@search-bar-fill': '#efeff4',
    '@search-bar-input-height': '56px',

    // notice-bar
    '@notice-bar-fill': '#fffada',
    '@notice-bar-height': '72px',
    '@notice-color': '@brand-warning',

    // switch
    '@switch-fill': '#4dd865',

    // tag
    '@tag-height': '48px',
    '@tag-height-sm': '28px',
    '@tag-color': '@brand-primary',

    // table
    '@table-title-height': '60px',
  } // eslint-disable-line
);
