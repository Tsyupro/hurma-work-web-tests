import { HeaderPo } from "./header.po";
import { TariffCardPo } from "./tariff-card.po";

export class TariffPo {

    public headerPo = new HeaderPo();

    public card1= new TariffCardPo(0);
    public card2= new TariffCardPo(1);
    public card3= new TariffCardPo(2);

    public get title(): Promise<WebdriverIO.Element> {
        return browser.$('.main-title');
    }
    
}