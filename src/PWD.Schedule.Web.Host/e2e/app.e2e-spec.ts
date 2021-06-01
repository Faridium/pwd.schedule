import { ScheduleTemplatePage } from './app.po';

describe('Schedule App', function() {
  let page: ScheduleTemplatePage;

  beforeEach(() => {
    page = new ScheduleTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
