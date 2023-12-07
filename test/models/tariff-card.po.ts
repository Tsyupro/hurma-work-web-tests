import { promises } from "dns";

export class TariffCardPo {
    
    constructor(private index: number ){
    } 
    

    private get self():Promise<WebdriverIO.Element> {
        return browser.$$('.tariff-card').then(items=>items[this.index]);
    }
    
    public get price(): Promise<WebdriverIO.Element> {
        return this.self.then(self => self.$('.price-value'))

    }


    public get employeeSelect(): Promise<WebdriverIO.Element> {
       return this.self.then(self => self.$('select'))

    }

    public getEmployeeOption(index: number): Promise<WebdriverIO.Element> {
        return this.employeeSelect.then(employeeSelect => employeeSelect.$$('option').then(items=>items[index]))
 
     }
     public get recruitersInput (): Promise<WebdriverIO.Element> {
        return this.self.then(self => self.$('input[type="tel"]'))
    }
     
     public get button(): Promise<WebdriverIO.Element> {
        return this.self.then(self => self.$('.button'))

    }
    
}