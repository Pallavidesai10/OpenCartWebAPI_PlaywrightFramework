import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";



export class LoginPage extends BasePage{
    //private locators

    private readonly emailID: Locator;
    private readonly password:Locator;
    private readonly loginButton:Locator;
    private readonly logo:Locator;
    private readonly forgotPasswordLink:Locator;
    private readonly LoginErrorMessage:Locator;




    //constructor of the class... Initiate the locators
    constructor(page:Page) {
        super(page);
        this.emailID= page.getByRole('textbox', {name:'E-Mail Address'});
        this.password= page.getByRole('textbox',{name:'Password'});
        this.loginButton= page.getByRole('button',{name:'Login'});
        this.logo= page.getByRole('img',{name:'naveenopencart'});
        this.forgotPasswordLink= page.getByRole('link',{name:'Forgotten Password'}).first();
        this.LoginErrorMessage= page.locator('.alert.alert-danger.alert-dismissible');
    };


    //public page actions(methods)/behaviour

    async goToLoginPage():Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async getLoginPageTitle(): Promise<string>{
        return await this.page.title()

    }

    async forgotPasswordLinkExist(): Promise<boolean>{
        return await this.forgotPasswordLink.isVisible();
    }

    async doLogin(username:string, password:string):Promise<void>{
        await this.emailID.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();

    }

    async invalidErrorDisplayedOrNot(): Promise<boolean>{
        return await this.LoginErrorMessage.isVisible();
    }


}