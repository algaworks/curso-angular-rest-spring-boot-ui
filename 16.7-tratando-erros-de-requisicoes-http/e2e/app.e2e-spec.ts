import { HttpPage } from './app.po';

describe('http App', () => {
  let page: HttpPage;

  beforeEach(() => {
    page = new HttpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
