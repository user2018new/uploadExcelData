const {I} = inject();

class Workflow {

    navigateToPosts(){
        I.amOnPage('https://wordpress.com/login');
        I.fillField("//*[@id='usernameOrEmail']",'');
        I.click("//button[contains(text(),'Continue')]");
        I.fillField("//*[@id='password']",'');
        I.click("//button[contains(text(),'Log In')]");
        I.waitForElement("//img[@alt='My Profile']");
        I.refreshPage();
        I.waitForElement("//span[text()='Posts']");
        I.click("//span[text()='Posts']");
        I.waitForElement("(//*[text()='Posts'])[1]");
        I.click("(//*[text()='Posts'])[1]");
    }

    async assessAndUpdate(data){
        let sectionCompName,sectionCompUpper;
        for (let section of data){
            sectionCompName = section[0].charAt(0).toUpperCase() + section[0].slice(1).toLowerCase();
            sectionCompUpper = section[0].toUpperCase();
            let sectionXpath = "//a[contains(text(),'" +sectionCompName+ "')]";
            let sectionUpperXpath = "//a[contains(text(),'" +sectionCompUpper+ "')]";
            let elementFlag = await I.grabNumberOfVisibleElements(sectionXpath);
            let elementUpperFlag = await I.grabNumberOfVisibleElements(sectionUpperXpath);
            if(elementFlag > 0 || elementUpperFlag > 0){
                elementFlag > 0 ? I.click(sectionXpath) : I.click(sectionUpperXpath);
                await this.updateTrendContent(section);
                this.updateValue(section);
            }
            else{
                console.log("Page : "+sectionCompName + ' Not found');
            }
        }
    }


    async updateTrendContent(section){
        I.waitForElement("//div[@class='editor-styles-wrapper']");
        const updateTrendText = section[0].toUpperCase() + " - TRENDING " +section[3].toUpperCase();
        I.click("//div[@class='wp-block editor-post-title editor-post-title__block']");
        I.pressKey(['Control','a']);
        I.pressKey('Backspace');
        I.fillField("//*[@id='post-title-0']",updateTrendText);
    }

    updateValue(section){
        const updateValueText = "LATEST VALUE "+section[1] + " AS AT " + section[2];
        I.pressKey('Enter');
        I.pressKey(['Control','a']);
        I.pressKey('Backspace');
        I.click("//button[@aria-label='Add block']");
        I.click("//button[@class='components-button block-editor-block-types-list__item editor-block-list-item-quote']");
        I.fillField("(//div[@role='textbox'])[1]", updateValueText);
        this.updatePageAndReturn(section);
    }

    async updatePageAndReturn(section){
        I.waitForElement("//button[contains(text(),'Update')]");
        I.click("//button[contains(text(),'Update')]");
        I.waitForElement("//img[@alt='Site Icon']/..");
        I.click("//img[@alt='Site Icon']/..");
        I.waitForElement("//a[@aria-description='Returns to the dashboard']");
        I.click("//a[@aria-description='Returns to the dashboard']");
        I.wait(5);
        I.waitForElement("//img[contains(@class,'avatar')]");
        let avatarFlag = await I.grabNumberOfVisibleElements("//img[contains(@class,'avatar')]");
        if(avatarFlag > 0){
            console.log(section[0] + " Page Is Updated");
        }
    }

}

module.exports=Workflow;