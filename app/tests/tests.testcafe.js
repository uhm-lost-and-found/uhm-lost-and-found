import { Selector } from 'testcafe';
import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

// Define user credentials
const departmentCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

// Define the TestCafe fixture
fixture('uhm-lost-and-found localhost test with default db')
  .page('http://localhost:3000');

// Before each test, ensure the user is logged out
fixture.beforeEach(async (testController) => {
  const signOutLinkExists = await Selector('a[href="/signout"]').exists;
  if (signOutLinkExists) {
    await testController.click('a[href="/signout"]');
  }
});

// Test that HOME page shows up without being logged in
test('Test that HOME page shows up without being logged in', async (testController) => {
  await landingPage.isDisplayed(testController);
});

// Test that LOST ITEMS page shows up without being logged in
test('Test that LOST ITEMS page shows up without being logged in', async (testController) => {
  await testController.navigateTo('http://localhost:3000');
  await testController.click(Selector('a').withText('LOST ITEMS'));
  await testController.expect(Selector('h2').withText('Lost Items').exists).ok({ timeout: 10000 });
});

// Test that SIGN IN and SIGN OUT work with a departmental account
test('Test that SIGN IN and SIGN OUT work with a departmental account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);
  await navBar.logout(testController); // Ensure logout for next test
});

// Test that HOME page appears after signing in with a departmental account
test('Test that HOME page appears after signing in with a departmental account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);
  await testController.click(Selector('a').withText('HOME'));
  await landingPage.isDisplayed(testController);
});

// Test that LOST ITEMS page appears after signing in with a departmental account
test('Test that LOST ITEMS page appears after signing in with a departmental account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);

  // Wait for the LOST ITEMS link to be clickable
  const lostItemsLink = Selector('a').withText('LOST ITEMS');
  await testController.expect(lostItemsLink.exists).ok({ timeout: 10000 });
  await testController.click(lostItemsLink);

  // Wait for the "Lost Items" heading to be present
  const lostItemsHeading = Selector('h2').withText('Lost Items');
  await testController.expect(lostItemsHeading.exists).ok({ timeout: 10000 });
});

// Test that ADD ITEM page appears after signing in with a departmental account
test('Test that ADD ITEM page appears after signing in with a departmental account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);
  await testController.click(Selector('a').withText('ADD ITEM'));
  await testController.expect(Selector('h2').withText('Add Item').exists).ok();
});

// Test that EDIT ITEM page appears after signing in with a departmental account
test('Test that EDIT ITEM page appears after signing in with a departmental account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);
  await testController.click(Selector('a').withText('EDIT ITEM'));
  await testController.expect(Selector('h2').withText('Lost Items (Department)').exists).ok();
});

// Test that SIGN IN and SIGN OUT work with an admin account
test('Test that SIGN IN and SIGN OUT work with an admin account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.logout(testController); // Ensure logout for next test
});

// Test that HOME page appears after signing in with an admin account
test('Test that HOME page appears after signing in with an admin account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('HOME'));
  await landingPage.isDisplayed(testController);
});

// Test that LOST ITEMS page appears after signing in with an admin account
test('Test that LOST ITEMS page appears after signing in with an admin account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);

  // Wait for the LOST ITEMS link to be clickable
  const lostItemsLink = Selector('a').withText('LOST ITEMS');
  await testController.expect(lostItemsLink.exists).ok({ timeout: 10000 });
  await testController.click(lostItemsLink);

  // Wait for the "Lost Items" heading to be present
  const lostItemsHeading = Selector('h2').withText('Lost Items');
  await testController.expect(lostItemsHeading.exists).ok({ timeout: 10000 });
});

// Test that ADD ITEM page appears after signing in with an admin account
test('Test that ADD ITEM page appears after signing in with an admin account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('ADD ITEM'));
  await testController.expect(Selector('h2').withText('Add Item').exists).ok();
});

// Test that EDIT ITEM page appears after signing in with an admin account
test('Test that EDIT ITEM page appears after signing in with an admin account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('EDIT ITEM'));
  await testController.expect(Selector('h2').withText('Lost Items (Admin)').exists).ok();
});

// Test that DEPARTMENTS page appears after signing in with an admin account
test('Test that DEPARTMENTS page appears after signing in with an admin account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('DEPARTMENTS'));
  await testController.expect(Selector('h2').withText('Page not found').exists).ok();
});

// Test that ADD DEPARTMENT page appears after signing in with an admin account
test('Test that ADD DEPARTMENT page appears after signing in with an admin account', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await testController.click(Selector('a').withText('ADD DEPARTMENT'));
  await testController.expect(Selector('h2').withText('Register Department').exists).ok();
});
