import { Selector } from 'testcafe';

class LostItemsPage {
  constructor() {
    this.pageId = '#lost-items-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const lostItemsPage = new LostItemsPage();
