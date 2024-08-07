import { render, } from '@testing-library/react-native';

import { ImageLogo } from '../index';

describe('Component: ImageLogo', () => {
  it('generate snapshot', () => {
    const { getByTestId } = render(<ImageLogo />);
    expect(getByTestId('image-logo')).toMatchSnapshot()
  })

  it('should render correctly image', () => {
    const { getByTestId } = render(<ImageLogo />);

    expect(getByTestId('image-logo')).toBeTruthy();
  })
});