import { PickDropTemplatePage } from './app.po';

describe('PickDrop App', function() {
  let page: PickDropTemplatePage;

  beforeEach(() => {
    page = new PickDropTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
