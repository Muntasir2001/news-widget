import { render, screen } from '@testing-library/react'; 
import { shallow, mount } from 'enzyme';
import App from './App';
import News from './News';

describe('App', () => {
  let appWrapper;

  beforeAll(() => {
    appWrapper = shallow(<App />);
  })

  it('Checks for div in App.js', () => {

    expect(appWrapper.find('div').length).toBeGreaterThanOrEqual(1);
  });

  it('Checks for <News /> in <App />', () => {
    appWrapper.find(News);
  });
});

describe('News', () => {
  let newsWrapper;

  beforeAll(() => {
    newsWrapper = shallow(<News />);
  })

  it('Checks for div in <News />', () => {
    expect(newsWrapper.find('div').length).toBeGreaterThanOrEqual(1);
  });

  it('Check for number of news on frontend', () => {
    expect(newsWrapper.find(".news")).toHaveLength(5);
  });
});