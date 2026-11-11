/**
 * 浏览器端 HTML 白名单消毒。
 * 使用 inert 的 <template> 解析，避免解析阶段加载图片或触发事件属性。
 * 文章内容以 v-html 等价方式插入前，必须先经过本函数。
 */

import { ALLOWED_TAGS, ALLOWED_ATTRS, UNSAFE_PROTOCOL, sanitizeHTMLString } from './core.js';

const DROP_ENTIRELY = 'script,style,iframe,object,embed,link,meta,base,form,input,button,select,textarea,svg,math,template,noscript,audio,video,source';

export function sanitizeHTML(html) {
  if (typeof document === 'undefined') {
    throw new Error('sanitizeHTML 只能在浏览器环境中使用');
  }

  const template = document.createElement('template');
  // 共用 core.js 的白名单先做一次字符串过滤，再用 DOM 做二次校验
  template.innerHTML = sanitizeHTMLString(String(html ?? ''));
  const root = template.content;

  root.querySelectorAll(DROP_ENTIRELY).forEach((node) => node.remove());

  for (const el of [...root.querySelectorAll('*')]) {
    if (!root.contains(el)) continue;

    const tag = el.tagName.toLowerCase();

    // 不在白名单内的标签保留文字、丢弃标签本身
    if (!ALLOWED_TAGS.has(tag)) {
      const parent = el.parentNode;
      if (!parent) continue;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
      continue;
    }

    const allowed = ALLOWED_ATTRS[tag] || [];
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      if (!allowed.includes(name) || name.startsWith('on')) {
        el.removeAttribute(attr.name);
        continue;
      }
      if (name === 'href' || name === 'src') {
        // 去掉控制字符与空白后再判断协议，防止 "java\nscript:" 绕过
        const value = attr.value.replace(/[\u0000-\u0020]+/g, '');
        if (UNSAFE_PROTOCOL.test(value)) el.removeAttribute(attr.name);
      }
    }

    if (tag === 'a') {
      el.setAttribute('rel', 'noopener noreferrer');
      const href = el.getAttribute('href') || '';
      if (/^https?:\/\//i.test(href)) el.setAttribute('target', '_blank');
    }
  }

  const host = document.createElement('div');
  host.appendChild(root);
  return host.innerHTML;
}
