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
            filter: invert(1) hue-rotate(180deg);
        }

        img, video {
            filter: invert(1) hue-rotate(180deg);
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
    }
}
