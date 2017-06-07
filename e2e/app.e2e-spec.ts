import { FrontOpsPage } from './app.po';

describe('front-ops App', () => {

  let page: FrontOpsPage;

  beforeEach(() => {

    page = new FrontOpsPage();

  });

  it('should display message saying app works', () => {

    page.navigateTo();

  });

});
