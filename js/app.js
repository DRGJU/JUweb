import { initTheme } from './ui.js';
import { initControls } from './controls.js';

/**
 * 渐进增强层：文章归档已由构建脚本写成静态 HTML。
 * 脚本只负责主题与两枚悬浮控件；脚本不可用时页面仍可完整阅读。
 */
initTheme();
initControls();
