import { remote } from 'webdriverio';
import { assert } from 'chai';
import { TariffPo } from '../models/tariffs.po';

import { hurmaWorkUrl, hurmaWorkRequest, hurmaWorkTariffs } from '../link/link';

const tariffPo = new TariffPo();

before(async () => {
    browser = await remote({
        capabilities: { browserName: 'chrome' },
        baseUrl: hurmaWorkUrl
    });
    await browser.maximizeWindow();
});

after(async () => {
    if (browser) {
        await browser.deleteSession();
    }
});

describe('Набір тестів сторінки тарифів', async () => {

    it('Перевірка відображення елементів на сторінці', async () => {
        await browser.url(hurmaWorkTariffs);
        await browser.pause(2000);

        const headerElement = await tariffPo.headerPo.main;
        assert.isTrue(await headerElement.isDisplayed(), 'Header не відображено');

        const titleElement = await tariffPo.title;
        assert.isTrue(await titleElement.isDisplayed(), 'Title не відображено');

        const buttonElement = await tariffPo.card1.button;
        assert.isTrue(await buttonElement.isDisplayed(), 'Button не відображено');
    });
    it('Перевірка коректного переходу на сторінку реєстрації', async () => {

        await browser.url(hurmaWorkTariffs);
        await browser.pause(2000);

        const consultationButton = await tariffPo.card1.button;

        await consultationButton.click();

        await browser.pause(2000);


        const currentUrl = await browser.getUrl();
        assert.equal(currentUrl, hurmaWorkRequest, 'URL невірний після натискання кнопки консультації.');
    });

    it('Зміна ціни першої картки, при вказуванні 10 рекрутерів', async () => {

        await browser.url(hurmaWorkTariffs);
        await browser.pause(2000);


        const input = await tariffPo.card1.recruitersInput;


        await input.click();



        await input.setValue('0');


        const label = await tariffPo.card1.price;



        const labelValue = await label.getText();
        assert.equal(labelValue, '468', 'Значення  не відповідає очікуваному значенню.');
    });

    it('Зміна ціни першої картки, при вказуванні 51-100 співробітників', async () => {

        await browser.url(hurmaWorkTariffs);
        await browser.pause(2000);


        const dropdown = await tariffPo.card1.employeeSelect;

        await dropdown.click();


        const option = await tariffPo.card1.getEmployeeOption(2);


        await option.click();



        const label = await tariffPo.card1.price;



        const labelValue = await label.getText();
        assert.equal(labelValue, '220.5', 'Значення лейбла не відповідає очікуваному значенню');
    });

    it('Зміна ціни другої картки, при вказуванні 10 рекрутерів', async () => {

        await browser.url(hurmaWorkTariffs);
        await browser.pause(2000);


        const input = await tariffPo.card2.recruitersInput;


        await input.click();



        await input.setValue('0');



        const label = await tariffPo.card2.price;



        const labelValue = await label.getText();
        assert.equal(labelValue, '405', 'Значення лейбла не відповідає очікуваному значенню');
    });

    it('Зміна ціни третьої картки, при вказуванні 31-50 співробітників', async () => {

        await browser.url(hurmaWorkTariffs);
        await browser.pause(2000);

        const dropdown = await tariffPo.card3.employeeSelect;

        await dropdown.click();


        const option = await tariffPo.card3.getEmployeeOption(1);

        await option.click();


        const label = await tariffPo.card3.price;


        const labelValue = await label.getText();
        assert.equal(labelValue, '117', 'Значення лейбла не відповідає очікуваному значенню');
    });


});
