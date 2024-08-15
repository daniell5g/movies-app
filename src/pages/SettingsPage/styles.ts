import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  align-items: center;
  padding-horizontal: 24px;
  padding-top: 50px;
  
  background-color: ${({ theme }) => theme.colors.neutral};
`;

export const Header = styled.View`
  align-items: center;

  margin-bottom: 20px;
`;

export const ActionRight = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 10px;
  border-radius: 100px;
`;

export const Title = styled.Text.attrs({
  testID: 'title-settings-page',
})`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};

  color: ${({ theme }) => theme.colors.secondary};
`;

export const Description = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.secondary};
  
  margin-top: 10px;
`;

export const Question = styled.Text`
  font-size: 16px;
  text-align: justify;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};

  margin-vertical: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.primary};
  
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  text-transform: uppercase;

  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ButtonLogout = styled.TouchableOpacity.attrs({
  testID: 'logout-button',
})`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background-color: ${({ theme }) => theme.colors.secondary};
  
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
`;

export const ButtonLogoutText = styled.Text`
  text-transform: uppercase;

  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
`;