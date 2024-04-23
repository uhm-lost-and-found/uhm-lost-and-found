import { Selector } from 'testcafe';

class SigninPage {
  constructor() {
    this.pageId = '#signin-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async signin(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signin-form-email', username);
    await testController.typeText('#signin-form-password', password);
    await testController.click('#signin-form-submit input.btn.btn-primary');

    // Check if the sign-out link exists after signing in, and click it if it does
    const signOutLinkExists = await Selector('a[href="/signout"]').exists;
    if (signOutLinkExists) {
      await testController.click('a[href="/signout"]');
    }
  }
}

export const signinPage = new SigninPage();
