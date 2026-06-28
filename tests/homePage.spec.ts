
import{test, expect}from '../src/fixtures/pageFixtures'
import { HomePage } from '../src/pages/homepage';

test.beforeEach('do login', async ({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin('fltest@gmail.com', 'Test@123');

});


test('home page title test', async({homePage})=>{
    let homePageTitle= await homePage.getHomePageTitle();
    expect(homePageTitle).toBe('My Account');
});

test('logout link exist', async({homePage})=>{
    expect(await homePage.logoutLinkExist()).toBeTruthy();
});

test('home page level 2 headers', async({homePage})=>{
    let homePageLevel2Headers= await homePage.getHomePageLevel2Headers();
    console.log('Home page level 2 headers are', homePageLevel2Headers);
    expect.soft(homePageLevel2Headers).toHaveLength(4);
    expect.soft(homePageLevel2Headers).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);// Array

});