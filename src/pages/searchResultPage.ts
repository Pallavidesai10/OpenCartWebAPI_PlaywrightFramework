
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";



export class SearchResultPage extends BasePage{
    //private locators
    private readonly searchResults:Locator;





    //constructor of the class... Initiate the locators
    constructor(page:Page) {
        super(page);
        this.searchResults= page.locator('div.product-layout');
       
    };


    //public page actions(methods)/behaviour
    async getProductSearchResultCount():Promise<number>{
        return await this.searchResults.count()

    }

    async selectProduct(productName:string):Promise<void>{
        await this.page.getByRole('link', {name: productName, exact: true}).first().click();

    }





}