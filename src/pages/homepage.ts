
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage{
    //private locators

    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    private readonly searchBar:Locator;
    private readonly searchIcon:Locator;

    //const... of the class: init the locators
    constructor(page:Page) {
        super(page);
        this.logoutLink= page.getByRole('link', {name: 'Logout'});
        this.headers= page.getByRole('heading', {level: 2}); 
        this.searchBar= page.getByRole('textbox',{name:'Search'});
        this.searchIcon=page.locator('div#search button'); 
    }

    //public page actions(methods)/behaviour

    async getHomePageTitle():Promise<string>{
        return await this.page.title();
    }


    async logoutLinkExist():Promise<boolean>{
        return await this.logoutLink.isVisible();
    }

    async getHomePageLevel2Headers():Promise<string[]>{
        return await this.headers.allInnerTexts();
    }

    async searchTheProduct(searchkey:string){
        await this.searchBar.fill(searchkey);
        await this.searchIcon.click();
    }
}
