import { Selector } from 'testcafe';
import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for the sample users defined in settings.development.json. */
const departmentCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

// Test that HOME page shows up without being logged in
test('Test that HOME page shows up without being logged in', async (testController) => {
  await landingPage.isDisplayed(testController);
});

// Test that LOST ITEMS page shows up without being logged in
test('Test that LOST ITEMS page shows up without being logged in', async (testController) => {
  // Ensure the user is logged out by clicking the Sign Out link if it exists
  const signOutLinkExists = await Selector('a[href="/signout"]').exists;
  if (signOutLinkExists) {
    await testController.click('a[href="/signout"]');
  }

  // Now navigate to the Lost Items page
  await testController.navigateTo('http://localhost:3000');
  await testController.click(Selector('a').withText('LOST ITEMS'));

  // Check if the Lost Items page is displayed
  const lostItemsHeadingExists = await Selector('h2').withText('Lost Items').exists;
  await testController.expect(lostItemsHeadingExists).ok();
});

// Test that SIGN IN and SIGN OUT work with a departmental account
test('Test that SIGN IN and SIGN OUT work with a departmental account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);
  await navBar.logout(testController); // Ensure logout for next test
});

// Test that HOME page appears after signing in with a departmental account
test('Test that HOME page appears after signing in with a departmental account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);
  await testController.click(Selector('a').withText('HOME'));
  await landingPage.isDisplayed(testController);
});

// Test that LOST ITEMS page appears after signing in with a departmental account
test('Test that LOST ITEMS page appears after signing in with a departmental account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);
  await testController.click(Selector('a').withText('LOST ITEMS'));
  const lostItemsHeadingExists = await Selector('h2').withText('Lost Items').exists;
  await testController.expect(lostItemsHeadingExists).ok();
});

// Test that ADD ITEM page appears after signing in with a departmental account
test('Test that ADD ITEM page appears after signing in with a departmental account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);
  await testController.click(Selector('a').withText('ADD ITEM'));
  const addItemHeadingExists = await Selector('h2').withText('Add Item').exists;
  await testController.expect(addItemHeadingExists).ok();
});

// Test that EDIT ITEM page appears after signing in with a departmental account
test('Test that EDIT ITEM page appears after signing in with a departmental account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);
  await testController.click(Selector('a').withText('EDIT ITEM'));
  const editItemHeadingExists = await Selector('h2').withText('Lost Items (Department)').exists;
  await testController.expect(editItemHeadingExists).ok();
});

// Test that SIGN IN and SIGN OUT work with an admin account
test('Test that SIGN IN and SIGN OUT work with an admin account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.logout(testController); // Ensure logout for next test
});

// Test that HOME page appears after signing in with an admin account
test('Test that HOME page appears after signing in with an admin account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('HOME'));
  await landingPage.isDisplayed(testController);
});

// Test that LOST ITEMS page appears after signing in with an admin account
test('Test that LOST ITEMS page appears after signing in with an admin account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('LOST ITEMS'));
  const lostItemsHeadingExists = await Selector('h2').withText('Lost Items').exists;
  await testController.expect(lostItemsHeadingExists).ok();
});

// Test that ADD ITEM page appears after signing in with an admin account
test('Test that ADD ITEM page appears after signing in with an admin account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('ADD ITEM'));
  const lostItemsHeadingExists = await Selector('h2').withText('Add Item').exists;
  await testController.expect(lostItemsHeadingExists).ok();
});

// Test that EDIT ITEM page appears after signing in with an admin account
test('Test that EDIT ITEM page appears after signing in with an admin account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('EDIT ITEM'));
  const lostItemsHeadingExists = await Selector('h2').withText('Lost Items (Admin)').exists;
  await testController.expect(lostItemsHeadingExists).ok();
});

// Test that DEPARTMENTS page appears after signing in with an admin account
test('Test that DEPARTMENTS page appears after signing in with an admin account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('DEPARTMENTS'));
  const departmentsHeadingExists = await Selector('h2').withText('Page not found').exists;
  await testController.expect(departmentsHeadingExists).ok();
});

// Test that ADD DEPARTMENT page appears after signing in with an admin account
test('Test that ADD DEPARTMENT page appears after signing in with an admin account', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('ADD DEPARTMENT'));
  const addDepartmentHeadingExists = await Selector('h2').withText('Register Department').exists;
  await testController.expect(addDepartmentHeadingExists).ok();
});
