

import{expect, test}from'../src/fixtures/pageFixtures'
import { beforeEach } from 'node:test'
import { LoginPage } from '../src/pages/loginPage'
import { HomePage } from '../src/pages/homepage'
import { CsvHelper } from '../src/utils/csvHelper'

test.beforeEach('do login', async({loginPage, homePage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
    expect(homePage.getHomePageTitle()).toBe('my Account')


});


const productData= CsvHelper.readCsv('src/testData/product.csv');

for(const row of productData){
test(`search the product ${row.searchkey} ${row.productname}`, async({homePage, searchResultPage})=>{
    await homePage.searchTheProduct(row.searchkey);
    const searchResultCount= await searchResultPage.getProductSearchResultCount();
    expect(searchResultCount).toBe(Number(row.resultcount));

});

}


for(const row of productData){
test(`erify user is able to search and navigate to product page ${row.searchkey} ${row.productname}`, async({homePage, searchResultPage, page})=>{
    await homePage.searchTheProduct(row.searchkey);
    await searchResultPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname)
})
}