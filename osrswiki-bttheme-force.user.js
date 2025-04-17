// ==UserScript==
// @name         OSRS维基护眼棕主题神器
// @name:en      OSRS Wiki Browntown Theme Enforcer
// @namespace    https://github.com/ChineseOnChain
// @author       Chairman
// @version      1.2a
// @description  在OSRS维基上强制使用Browntown主题风格
// @match        *://oldschool.runescape.wiki/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // 立即强制设置主题Cookie
    document.cookie = 'theme=browntown; domain=.runescape.wiki; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT; secure';

    // 监听DOM变化以捕获body元素创建
    const observer = new MutationObserver((mutations) => {
        const body = document.body;
        if (body) {
            body.classList.remove('wgl-lightmode', 'wgl-theme-light');
            body.classList.add('wgl-theme-browntown');

            const themeCSS = document.createElement('link');
            themeCSS.rel = 'stylesheet';
            themeCSS.href = '/load.php?lang=en-gb&modules=wgl.theme.browntown&only=styles&skin=vector';
            document.head.appendChild(themeCSS);

            observer.disconnect();
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // 持久化本地存储设置
    window.addEventListener('load', () => {
        localStorage.setItem('mw-prefs-theme', '3');
        localStorage.setItem('skin-theme', 'browntown');
    });
})();