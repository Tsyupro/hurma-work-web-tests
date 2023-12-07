
export class HeaderPo {

    public get main(): Promise<WebdriverIO.Element> {
        return browser.$('.header-main');
    }
}