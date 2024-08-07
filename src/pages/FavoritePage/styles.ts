import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 20 : 40}px;
  
  background-color: ${({ theme }) => theme.colors.neutral};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const ActionRight = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 10px;
  border-radius: 100px;
`;

export const SessionMovies = styled.View`
  width: 100%;

  padding-horizontal: 24px;
  margin-top: 20px;
`;

export const SessionMoviesTitle = styled.Text` 
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};

  color: ${({ theme }) => theme.colors.primary};

  margin-bottom: 10px;
`;

export const ListMovies = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingBottom: 100,
  },
})``;

export const LoadingMoviesContainer = styled.View`
  position: absolute;
  top: 300px;
  left: 0;
  right: 0;
  bottom: 0;
  
  align-items: center;
  justify-content: center;
`

export const LoadingMoviesIndicator = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#EC8B00'
})``

export const AlertBanner = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding-vertical: 10px;
  margin-bottom: 10px;

  background-color: black;
`;

export const AlertBannerText = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.secondaryRegular};

  color: #fc7676;
`

export const ListEmptyComponent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;

  height: 300px;
`

export const EmptyText = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.secondaryRegular};

  color: #e5e5e5;
`