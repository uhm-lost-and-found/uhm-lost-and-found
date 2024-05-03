import { Selector, ClientFunction } from 'testcafe';
import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for the sample users defined in settings.development.json. */
const departmentCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('uhm-lost-and-found localhost test with default db')
  .page('http://localhost:3000');

// Set up a handler for the native dialog
const handleNativeDialog = ClientFunction(() => {
  window.onbeforeunload = null;
});

// Before each test, ensure the user is logged out
fixture.beforeEach(async (testController) => {
  await handleNativeDialog();
  await testController.wait(1000); // Adjust waiting time as needed
  const signOutLinkExists = await Selector('a[href="/signout"]').exists;
  if (signOutLinkExists) {
    await testController.click('a[href="/signout"]');
  }
});

// Test that HOME page shows up without being logged in
test('Test that HOME page shows up without being logged in', async (testController) => {
  await landingPage.isDisplayed(testController);
});

// Test that LOST ITEMS page shows up and items can be viewed without being logged in
test('Test that LOST ITEMS page shows up and items can be viewed without being logged in', async (testController) => {
  await testController.navigateTo('http://localhost:3000');

  // Click the "LOST ITEMS" link
  await testController.click(Selector('a').withText('LOST ITEMS'));

  // Wait for the "Lost Items" heading to be present
  const lostItemsHeading = Selector('h2').withText('Lost Items');
  await testController.expect(lostItemsHeading.exists).ok({ timeout: 10000 }); // Increase timeout if necessary

  // Check if there are any items displayed
  const itemCards = await Selector('.card');
  if (itemCards.count === 0) {
    // Handle the scenario where no items are present
    console.log('No items found in the database.');
  } else {
    // Wait for a short time to ensure the button is fully loaded
    await testController.wait(2000);

    // Click the "Read More" button on the first item card
    const readMoreButton = Selector('.btn.btn-primary').withText('Read More');
    await testController.click(readMoreButton);

    // Ensure the modal is displayed
    const modalTitle = Selector('.modal-title h6');
    await testController.expect(modalTitle.exists).ok();

    // Close the modal by clicking the close button
    const closeButton = Selector('button.btn-close');
    await testController.click(closeButton);

    // Ensure the modal is closed
    await testController.expect(modalTitle.exists).notOk();
  }
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

  // Wait for the HOME page to load
  const homeLink = Selector('a').withText('HOME');
  await testController.expect(homeLink.exists).ok({ timeout: 20000 }); // Increased timeout
  await testController.click(homeLink);

  // Ensure the HOME page is displayed
  await landingPage.isDisplayed(testController);
});

// Test that LOST ITEMS page appears after signing in with a departmental account and items can be viewed
test('Test that LOST ITEMS page appears after signing in with a departmental account and items can be viewed', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);

  // Wait for the LOST ITEMS page to load
  const lostItemsLink = Selector('a').withText('LOST ITEMS');
  await testController.expect(lostItemsLink.exists).ok({ timeout: 15000 }); // Increased timeout
  await testController.click(lostItemsLink);

  // Ensure the LOST ITEMS page is displayed
  const lostItemsHeading = Selector('h2').withText('Lost Items');
  await testController.expect(lostItemsHeading.exists).ok({ timeout: 15000 }); // Increased timeout

  // Check if there are any items displayed
  const itemCards = await Selector('.card');
  if (itemCards.count === 0) {
    // Handle the scenario where no items are present
    console.log('No items found in the database.');
  } else {
    // Wait for a short time to ensure the button is fully loaded
    await testController.wait(2000);

    // Click the "Read More" button on the first item card
    const readMoreButton = Selector('.btn.btn-primary').withText('Read More');
    await testController.click(readMoreButton);

    // Ensure the modal is displayed
    const modalTitle = Selector('.modal-title h6');
    await testController.expect(modalTitle.exists).ok();

    // Close the modal by clicking the close button
    const closeButton = Selector('button.btn-close');
    await testController.click(closeButton);

    // Ensure the modal is closed
    await testController.expect(modalTitle.exists).notOk();
  }
});

// Test that ADD ITEM page appears after signing in with a departmental account and items can be added
test('Test that ADD ITEM page appears after signing in with a departmental account and items can be added', async (testController) => {
  // Sign in with departmental credentials
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);

  // Click the "ADD ITEM" link
  await testController.click(Selector('a').withText('ADD ITEM'));

  // Wait for the "Add Item" heading to be present
  const addItemHeading = Selector('h2').withText('Add Item');
  await testController.expect(addItemHeading.exists).ok({ timeout: 15000 }); // Increased timeout

  // Fill out the form to add an item
  await testController.typeText('input[name="name"]', 'Test Item');
  await testController.typeText('input[name="dateFound"]', '01/01/2024');
  await testController.typeText('input[name="locationFound"]', 'Test Location');
  await testController.typeText('input[name="currentDepartment"]', 'Test Department');
  await testController.typeText('input[name="image"]', 'https://www.picpedia.org/highway-signs/images/testing.jpg');

  // Submit the form by clicking the submit button
  await testController.click('input[type="submit"].btn.btn-primary');

  // Ensure success message is displayed
  const successMessage = Selector('div.swal-title').withText('Success');
  await testController.expect(successMessage.exists).ok();
});

// Test that EDIT ITEM page appears after signing in with a departmental account and items can be viewed and edited
test('Test that EDIT ITEM page appears after signing in with a departmental account and items can be viewed and edited', async (testController) => {
  // Sign in with departmental credentials
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, departmentCredentials.username, departmentCredentials.password);

  // Ensure the Lost Items (Department) page loads
  await testController.click(Selector('a').withText('EDIT ITEM'));
  const editItemHeadingExists = await Selector('h2').withText('Lost Items (Department)').exists;
  await testController.expect(editItemHeadingExists).ok({ timeout: 15000 }); // Increased timeout

  // Check if there are any items displayed
  const itemCards = await Selector('.card');
  if (itemCards.count === 0) {
    // Handle the scenario where no items are present
    console.log('No items found in the database.');
  } else {
    // Wait for a short time to ensure the buttons are fully loaded
    await testController.wait(2000);

    // Click the "Read More" button on the first item card
    const readMoreButton = Selector('.btn.btn-primary').withText('Read More');
    await testController.click(readMoreButton);

    // Ensure the modal is displayed
    const modalTitle = Selector('.modal-title h6');
    await testController.expect(modalTitle.exists).ok();

    // Close the modal by clicking the close button
    const closeButton = Selector('button.btn-close');
    await testController.click(closeButton);

    // Ensure the modal is closed
    await testController.expect(modalTitle.exists).notOk();

    // Click the Edit button
    const editButton = Selector('.btn.btn-primary').withText('Edit').nth(0);
    await testController.click(editButton);

    // Ensure the EDIT ITEM page is displayed
    const editItemHeading = Selector('h2').withText('Edit Item');
    await testController.expect(editItemHeading.exists).ok({ timeout: 15000 }); // Increased timeout

    // Clear existing text in the input fields before typing new values
    await testController.selectText('input[name="name"]').pressKey('delete');
    await testController.selectText('input[name="dateFound"]').pressKey('delete');
    await testController.selectText('input[name="locationFound"]').pressKey('delete');
    await testController.selectText('input[name="currentDepartment"]').pressKey('delete');
    await testController.selectText('input[name="image"]').pressKey('delete');

    // Fill out the form to edit an item (do not change the owner so the item can still be removed by the user)
    await testController.typeText('input[name="name"]', 'Test Item');
    await testController.typeText('input[name="dateFound"]', '01/01/2024');
    await testController.typeText('input[name="locationFound"]', 'Test Location');
    await testController.typeText('input[name="currentDepartment"]', 'Test Department');
    await testController.typeText('input[name="image"]', 'https://www.picpedia.org/highway-signs/images/testing.jpg');

    // Submit the form by clicking the submit button
    await testController.click('input[type="submit"].btn.btn-primary');

    // Ensure success message is displayed
    const successMessage = Selector('div.swal-title').withText('Success');
    await testController.expect(successMessage.exists).ok();

    // Click the "OK" button
    const okButton = Selector('button.swal-button--confirm');
    await testController.click(okButton);

    // Go back to the Lost Items (Department) Page
    await testController.click(Selector('a').withText('EDIT ITEM'));

    // Ensure the Lost Items (Department) page loads again
    const editItemHeadingExistsAgain = await Selector('h2').withText('Lost Items (Department)').exists;
    await testController.expect(editItemHeadingExistsAgain).ok({ timeout: 15000 }); // Increased timeout

    // Click the Remove button
    const removeButton = Selector('.btn.btn-danger').withText('Remove').nth(0);
    await testController.click(removeButton);
  }
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

  // Wait for the HOME page to load
  const homeLink = Selector('a').withText('HOME');
  await testController.expect(homeLink.exists).ok({ timeout: 10000 }); // Increase timeout if necessary
  await testController.click(homeLink);

  // Ensure the HOME page is displayed
  await landingPage.isDisplayed(testController);
});

// Test that LOST ITEMS page appears after signing in with an admin account and items can be viewed
test('Test that LOST ITEMS page appears after signing in with an admin account and items can be viewed', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);

  // Wait for the LOST ITEMS page to load
  const lostItemsLink = Selector('a').withText('LOST ITEMS');
  await testController.expect(lostItemsLink.exists).ok({ timeout: 10000 }); // Increase timeout if necessary
  await testController.click(lostItemsLink);

  // Ensure the LOST ITEMS page is displayed
  const lostItemsHeading = Selector('h2').withText('Lost Items');
  await testController.expect(lostItemsHeading.exists).ok();

  // Check if there are any items displayed
  const itemCards = await Selector('.card');
  if (itemCards.count === 0) {
    // Handle the scenario where no items are present
    console.log('No items found in the database.');
  } else {
    // Wait for a short time to ensure the button is fully loaded
    await testController.wait(2000);

    // Click the "Read More" button on the first item card
    const readMoreButton = Selector('.btn.btn-primary').withText('Read More');
    await testController.click(readMoreButton);

    // Ensure the modal is displayed
    const modalTitle = Selector('.modal-title h6');
    await testController.expect(modalTitle.exists).ok();

    // Close the modal by clicking the close button
    const closeButton = Selector('button.btn-close');
    await testController.click(closeButton);

    // Ensure the modal is closed
    await testController.expect(modalTitle.exists).notOk();
  }
});

// Test that EDIT ITEM page appears after signing in with an admin account and items can be viewed and edited
test('Test that EDIT ITEM page appears after signing in with an admin account and items can be viewed and edited', async (testController) => {
  // Sign in with admin credentials
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);

  // Ensure the Lost Items (Admin) page loads
  await testController.click(Selector('a').withText('EDIT ITEM'));
  const editItemHeadingExists = await Selector('h2').withText('Lost Items (Admin)').exists;
  await testController.expect(editItemHeadingExists).ok({ timeout: 15000 }); // Increased timeout

  // Check if there are any items displayed
  const itemCards = await Selector('.card');
  if (itemCards.count === 0) {
    // Handle the scenario where no items are present
    console.log('No items found in the database.');
  } else {
    // Wait for a short time to ensure the buttons are fully loaded
    await testController.wait(2000);

    // Click the "Read More" button on the first item card
    const readMoreButton = Selector('.btn.btn-primary').withText('Read More');
    await testController.expect(readMoreButton.exists).ok({ timeout: 15000 });
    await testController.click(readMoreButton);

    // Ensure the modal is displayed
    const modalTitle = Selector('.modal-title h6');
    await testController.expect(modalTitle.exists).ok();

    // Close the modal by clicking the close button
    const closeButton = Selector('button.btn-close');
    await testController.click(closeButton);

    // Ensure the modal is closed
    await testController.expect(modalTitle.exists).notOk();

    // Click the Edit button
    const editButton = Selector('.btn.btn-primary').withText('Edit').nth(0);
    await testController.click(editButton);

    // Ensure the EDIT ITEM page is displayed
    const editItemHeading = Selector('h2').withText('Edit Item');
    await testController.expect(editItemHeading.exists).ok({ timeout: 15000 }); // Increased timeout

    // Clear existing text in the input fields before typing new values
    await testController.selectText('input[name="name"]').pressKey('delete');
    await testController.selectText('input[name="dateFound"]').pressKey('delete');
    await testController.selectText('input[name="locationFound"]').pressKey('delete');
    await testController.selectText('input[name="currentDepartment"]').pressKey('delete');
    await testController.selectText('input[name="image"]').pressKey('delete');

    // Fill out the form to edit an item (do not change the owner so the item can still be removed by the user)
    await testController.typeText('input[name="name"]', 'Test Item');
    await testController.typeText('input[name="dateFound"]', '01/01/2024');
    await testController.typeText('input[name="locationFound"]', 'Test Location');
    await testController.typeText('input[name="currentDepartment"]', 'Test Department');
    await testController.typeText('input[name="image"]', 'https://www.picpedia.org/highway-signs/images/testing.jpg');

    // Submit the form by clicking the submit button
    await testController.click('input[type="submit"].btn.btn-primary');

    // Ensure success message is displayed
    const successMessage = Selector('div.swal-title').withText('Success');
    await testController.expect(successMessage.exists).ok();

    // Click the "OK" button
    const okButton = Selector('button.swal-button--confirm');
    await testController.click(okButton);

    // Go back to the Lost Items (Admin) Page
    await testController.click(Selector('a').withText('EDIT ITEM'));

    // Ensure the Lost Items (Admin) page loads again
    const editItemHeadingExistsAgain = await Selector('h2').withText('Lost Items (Admin)').exists;
    await testController.expect(editItemHeadingExistsAgain).ok({ timeout: 15000 }); // Increased timeout

    // Click the Remove button
    const removeButton = Selector('.btn.btn-danger').withText('Remove').nth(0);
    await testController.click(removeButton);
  }
});

// Test that DEPARTMENTS page appears after signing in with an admin account and accounts are displayed
test('Test that DEPARTMENTS page appears after signing in with an admin account and accounts are displayed', async (testController) => {
  // Sign in with admin credentials
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);

  // Ensure the DEPARTMENTS page loads
  await testController.click(Selector('a').withText('DEPARTMENTS'));
  const departmentsHeading = await Selector('h2').withText('Departments');
  await testController.expect(departmentsHeading.exists).ok({ timeout: 15000 });

  // Check if accounts are displayed
  const accounts = await Selector('h4').filter((node) => node.getAttribute('style') === 'color: white;');
  await testController.expect(accounts.count).gt(0); // Ensure at least one account is displayed
});

// Test that ADD DEPARTMENT page appears after signing in with an admin account and departments can be added
test('Test that ADD DEPARTMENT page appears after signing in with an admin account and departments can be added', async (testController) => {
  // Sign in with admin credentials
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);

  // Ensure the ADD DEPARTMENT page loads
  await testController.click(Selector('a').withText('ADD DEPARTMENT'));
  const addDepartmentHeadingExists = await Selector('h2').withText('Register Department').exists;
  await testController.expect(addDepartmentHeadingExists).ok({ timeout: 15000 }); // Increased timeout

  // Fill out the form to add a department
  await testController.typeText('input[name="email"]', 'test@example.com');
  await testController.typeText('input[name="password"]', 'testpassword');

  // Submit the form by clicking the submit button
  await testController.click('input[type="submit"].btn.btn-primary');

  // Check if the specific error message for duplication is present
  const duplicationErrorMessage = Selector('div.alert.alert-danger.show').withText('Username already exists.');
  if (await duplicationErrorMessage.exists) {
    // Ensure the specific error message for duplication is present
    await testController.expect(duplicationErrorMessage.exists).ok();
  } else {
    // Ensure the success message appears
    const successMessage = Selector('h2').withText('Department Successfully Registered');
    await testController.expect(successMessage.exists).ok();

    // Ensure the button to create another department account exists
    const createAnotherButton = Selector('button.btn.btn-success');
    await testController.expect(createAnotherButton.exists).ok();

    // Click the button to create another department account
    await testController.click(createAnotherButton);

    // Ensure the ADD DEPARTMENT page loads again
    const addDepartmentHeadingExistsAgain = await Selector('h2').withText('Register Department').exists;
    await testController.expect(addDepartmentHeadingExistsAgain).ok({ timeout: 15000 }); // Increased timeout
  }
});
