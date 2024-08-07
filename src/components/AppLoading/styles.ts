import styled from "styled-components/native";

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #16171B;
`;

export const LoadingImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#EC8B00'
})``