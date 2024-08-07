import styled from 'styled-components/native';

type ButtonProps = {
  disabled?: boolean;
}

export const Container = styled.View`
  flex: 1;

  align-items: center;
  padding-horizontal: 24px;
  padding-top: 140px;
  
  background-color: ${({ theme }) => theme.colors.neutral};
`
  ;
export const Form = styled.View`
  width: 100%;
  gap: 20px;

  margin-top: 100px;
`;

export const FormInputContainer = styled.View`
  width: 100%;
  flex-direction: column;
`

export const ErrorContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;

export const Error = styled.Text`
  color: #fc7676;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.secondaryRegular};
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  
  border-radius: 30px;
  padding: 15px;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  text-transform: uppercase;

  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#ccc'
})``

export const ButtonForgot = styled.TouchableOpacity`
    align-items: center;
    margin-top: 20px;
`;

export const ButtonForgotText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.secondaryRegular};
`
