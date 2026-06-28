

//import process from 'node:process';
//import process from 'process';
import{expect, test}from'../src/fixtures/pageFixtures'
import { HomePage } from '../src/pages/homepage';
import { LoginPage } from '../src/pages/loginPage';
import { CsvHelper } from '../src/utils/csvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
//import { testData } from '../src/pages/loginPage';


test.beforeEach('Go to login page', async({loginPage})=>{
    await loginPage.goToLoginPage();
})

test('login page title test', async({loginPage})=>{
    //loginPage= new LoginPage(page);
    let pageTitle= await loginPage.getLoginPageTitle();
    console.log('page title is', pageTitle);
    expect(pageTitle).toBe('Account Login');   

});


test('forgot password link exist', async({loginPage})=>{
    expect(await loginPage.forgotPasswordLinkExist()).toBeTruthy();
});


test('user is successfully able to login', async({loginPage, homePage})=>{
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
    let homePageTitle= await homePage.getHomePageTitle();
    expect.soft(homePageTitle).toBe('My Account');
    expect.soft(await homePage.logoutLinkExist()).toBeTruthy();
});


// sequence mode= only one test is running one by one with fixture approach
test('login with invalid credentials using test data from csv', async({loginPage, testData})=>{
    for(let row of testData){
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidErrorDisplayedOrNot()).toBeTruthy();
    };

});

//without fixtures= parallel mode, read csv data directly and loop the test method row wise

let testData= CsvHelper.readCsv('src/testData/loginData.csv');

for(let row of testData){
    test(`invalid login test with csv but without fixture ${row.username}- ${row.password}`, async({loginPage})=>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidErrorDisplayedOrNot()).toBeTruthy();

    });

}

let invalidTestData= ExcelHelper.readExcel('src/testData/OpenCartInvalidLoginData.xlsx', 'Sheet1');// sheet1 is the sheet name

for(let row of invalidTestData){
    test(`invalid login test with excel with helper ${row.username}- ${row.password}`, async({loginPage})=>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidErrorDisplayedOrNot()).toBeTruthy();

    });

}


let JsonTestData= ExcelHelper.readExcel('src/testData/OpenCartInvalidLoginData.xlsx', 'Sheet1');// sheet1 is the sheet name

for(let row of JsonTestData){
    test(`invalid login test with json with helper ${row.username}- ${row.password}`, async({loginPage})=>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidErrorDisplayedOrNot()).toBeTruthy();

    });

}


