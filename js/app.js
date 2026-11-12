import { initTheme } from './ui.js';
import { initControls } from './controls.js';
import { initRouter } from './router.js';

/**
 * 渐进增强层：文章归档已由构建脚本写成静态 HTML。
 * 脚本只负责主题、两枚悬浮控件与站内软导航；脚本不可用时页面仍可完整阅读。
 */
initTheme();
initControls();
initRouter();
