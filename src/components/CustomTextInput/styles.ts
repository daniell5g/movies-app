import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 20px;

  background-color: ${({ theme }) => theme.colors.tertiary};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;

  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.secondary};
`;

export const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.secondary};
  
  padding: 10px 10px 2px 5px;
`;

export const Label = styled.Text<{ isFocused: boolean }>`
  position: absolute;
  top: ${({ isFocused }) => (isFocused ? 5 : 20)}px;
  left: 47px;
  
  font-size: ${({ isFocused }) => (isFocused ? 12 : 16)}px;

  color: ${({ theme, isFocused }) => isFocused ? theme.colors.primary : theme.colors.secondary};
  transition: top 0.2s ease, font-size 0.2s ease;
`;
