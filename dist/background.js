chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-dark-mode") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: toggleDarkMode
                });
            }
        });
    }
});

function toggleDarkMode() {
    const darkModeStyles = `
        html {
            filter: invert(1) hue-rotate(180deg) !important;
        }

        img, video {
            filter: invert(1) hue-rotate(180deg);
        }

        body {
            color: #61686f !important;
            background-color: beige;
        }
    `;

    let styleElement = document.getElementById('dark-mode-style');
    if (styleElement) {
        styleElement.remove();
    } else {
        styleElement = document.createElement('style');
        styleElement.id = 'dark-mode-style';
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(darkModeStyles));
        document.head.appendChild(styleElement);
        /**
         * 待实现功能：
         *  1. 支持用户自定义背景颜色和文字颜色并保存配置，并对配置命名
         *  1.1 支持从已保存配置中选择
         *  1.2 预设几种主题供用户选择
         * */
        // 将vue或react 挂载到styleElement上
        // 将用户的配置信息本地持久化
        // 通过chrome.storage.local.get(null, function(items) { console.log(items); });获取所有存储的数据
        // 通过chrome.storage.local.set({key: value}, function() { console.log('Value is set to ' + value); });设置存储的数据
        // 通过chrome.storage.local.remove('key', function() { console.log('Value is removed'); });删除存储的数据
        // 通过chrome.storage.local.clear(function() { console.log('Value is cleared'); });清除所有存储的数据
        // 通过chrome.storage.local.getBytesInUse(function(bytesInUse) { console.log('Bytes in use: ' + bytesInUse); });获取已经存储的数据量

    }
}
