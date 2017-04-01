import { Ng2EfWidgetsPage } from './app.po';

describe('ng2-ef-widgets App', () => {
  let page: Ng2EfWidgetsPage;

  beforeEach(() => {
    page = new Ng2EfWidgetsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
