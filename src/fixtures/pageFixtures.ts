

import {test as baseTest} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { HomePage } from '../pages/homepage'
import{SearchResultPage} from '../pages/searchResultPage'
import { CsvHelper } from '../utils/csvHelper';

//define types for the fixtures

type pageFixtures={
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultPage: SearchResultPage,
    testData: Record<string, string>[]
}

//extend playwright base test

export let test= baseTest.extend<pageFixtures>({
    loginPage: async({page}, use)=>{
        let loginPage= new LoginPage(page);
        await use(loginPage);
    },


    homePage: async({page}, use)=>{
        let homePage= new HomePage(page);
        await use(homePage);

    },

     searchResultPage: async({page}, use)=>{
        let searchResultPage= new SearchResultPage(page);
        await use(searchResultPage);

    },

    testData: async({}, use)=>{
        let testData= CsvHelper.readCsv('src/testData/loginData.csv')
        await use(testData);
    }

})

export{expect}from '@playwright/test'

//page objects
//test data
//states .json