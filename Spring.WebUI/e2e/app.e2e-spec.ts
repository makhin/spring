import { SpringAppPage } from './app.po';

describe('spring-app App', () => {
  let page: SpringAppPage;

  beforeEach(() => {
    page = new SpringAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
