import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
  padding-horizontal: 24px;
  padding-top: 140px;
  
  background-color: ${({ theme }) => theme.colors.neutral};
`;
