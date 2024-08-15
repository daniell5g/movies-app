import { render, } from '@testing-library/react-native';

import { AppLoading } from '../index';

describe('Component: AppLoading', () => {
  it('generate snapshot', () => {
    const { getByTestId } = render(<AppLoading />);
    expect(getByTestId('loading-container')).toMatchSnapshot()
  })

  it('should render correctly container main', () => {
    const { getByTestId } = render(<AppLoading />);
    expect(getByTestId('loading-container')).toBeTruthy();
  });

  it('should render correctly image and loading indicator', () => {
    const { getByTestId } = render(<AppLoading />);

    expect(getByTestId('image-logo')).toBeTruthy();
    expect(getByTestId('loading-indicator')).toBeTruthy();
  })
});