import { Selector } from 'testcafe';

class NavBar {

  async gotoSignInPage(testController) {
    const signOutLinkExists = await Selector('a[href="/signout"]').exists;
    if (!signOutLinkExists) {
      await testController.click('a[href="/signin"]');
    }
  }

  async isLoggedIn() {
    const signInLinkExists = await Selector('a[href="/signin"]').exists;
    return !signInLinkExists;
  }

  async logout(testController) {
    await testController.click('a[href="/signout"]');
  }
}

export const navBar = new NavBar();
