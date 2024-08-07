import styled from 'styled-components/native';

export const Container = styled.Pressable`
  flex: 1;

  border-radius: 5px;
  
  padding: 4px;
  margin-bottom: 10px;
`;

export const ImagePoster = styled.Image`
  width: 100%;
  height: 230px;
  border-radius: 8px;
`;

export const Badge = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  bottom: 10px;

  height: 30px;
  width: 30px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 100px; 
`;

export const BadgeText = styled.Text`
  font-size: 10px;
  font-family: ${({ theme }) => theme.fonts.bold};

  color: ${({ theme }) => theme.colors.neutral};
`