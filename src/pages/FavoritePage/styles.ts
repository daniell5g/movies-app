import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 20 : 40}px;
  
  background-color: ${({ theme }) => theme.colors.neutral};
`;
