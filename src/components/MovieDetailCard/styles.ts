import styled from 'styled-components/native';

export const Card = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.tertiary};
  
  border-radius: 5px;
  padding: 10px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 6px;

  margin-bottom: 7px;
`;

export const CardHeaderTitle = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.secondary};
`

export const CardHeaderSubtitle = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
`
