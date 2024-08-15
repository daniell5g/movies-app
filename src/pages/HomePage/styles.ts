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
  justify-content: space-between;
  padding-horizontal: 24px;
`;

export const NameApp = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};

  color: ${({ theme }) => theme.colors.secondary};
`;

export const ActionHeaderRight = styled.TouchableOpacity.attrs({
  testID: 'settings-button'
})``

export const SessionSearch = styled.View`
  flex-direction: column;
  gap: 10px;
  
  padding-horizontal: 24px;
  margin-top: 20px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.secondaryRegular};

  color: ${({ theme }) => theme.colors.secondary};
`

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: '#e5e5e5',
})`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.secondaryRegular};

  color: ${({ theme }) => theme.colors.primary};
`

export const TextMovieNotFound = styled.Text.attrs({
  testID: 'text-movie-not-found'
})`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.secondaryRegular};

  color: #fc7676;

  margin-top: 5px;
  padding-horizontal: 24px;
`

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
  color: '#EC8B00',
  testID: 'loading-indicator'
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

export const AlertBannerText = styled.Text.attrs({
  testID: 'alert-banner-text',
})`
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

export const FloatingActionFavorite = styled.TouchableOpacity.attrs({
  testID: 'favorite-button'
})`
  position: absolute;
  bottom: 20px;
  right: 20px;

  width: 50px;
  height: 50px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 100px;
`;