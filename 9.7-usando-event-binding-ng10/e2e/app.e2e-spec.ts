import { MeuprojetoPage } from './app.po';

describe('meuprojeto App', () => {
  let page: MeuprojetoPage;

  beforeEach(() => {
    page = new MeuprojetoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
