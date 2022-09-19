export default class BasePage {

    open (path: string) {
        return browser.url(`/${path}`)
    };

    async waitForBrowserReadyState (timeoutInSeconds: number) {
        await browser.waitUntil(async function () {
            let state = await browser.execute(function () {
            let readyState:string = document.readyState!;
            return readyState;
            });
            return state !== 'loading';
        },
        {
        timeout: timeoutInSeconds * 1000,
        timeoutMsg: 'Document did not exit loading State within timeout period'
        });
    };

    async clearSessionStorage () {
        await browser.clearLocalStorage();
        await browser.clearSessionStorage();
    }

}
