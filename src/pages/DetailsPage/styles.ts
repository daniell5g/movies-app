import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 20 : 40}px;
  
  background-color: ${({ theme }) => theme.colors.neutral};
`;

export const Header = styled.View`
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  padding-horizontal: 24px;
  z-index: 10;
`;

export const ActionLeft = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 10px;
  border-radius: 100px;
`

export const ActionRight = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 10px;
  border-radius: 100px;
`

export const Body = styled.View`
  flex: 1;

  padding-bottom: 20px;
`

export const LoadingIndicatorContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  align-items: center;
  justify-content: center;

  padding-horizontal: 24px;
`

export const LoadingIndicator = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#EC8B00'
})``

export const ImagePoster = styled.Image`
  width: 100%;
  height: 500px;
`

export const TextTitle = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};

  color: ${({ theme }) => theme.colors.secondary};

  margin-top: 20px;
  padding-horizontal: 16px;
`

export const LabelSinopse = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.secondaryRegular};
  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.primary};

  margin-vertical: 10px;
  padding-horizontal: 16px;
`

export const TextOverview = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.secondaryRegular};

  color: ${({ theme }) => theme.colors.secondary};

  padding-horizontal: 16px;
`

export const Divider = styled.View`
  height: 0.5px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.tertiary};
  margin-vertical: 20px;
`

export const InfoBlock = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;

  padding-horizontal: 16px;
  margin-bottom: 15px;
`;