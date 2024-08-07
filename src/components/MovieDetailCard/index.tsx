import { Feather } from '@expo/vector-icons';
import React from 'react';

import * as S from './styles';

interface MovieDetailCardProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  title: string;
  subtitle: string;
}

const MovieDetailCard: React.FC<MovieDetailCardProps> = ({ iconName, title, subtitle }) => (
  <S.Card>
    <S.CardHeader>
      <Feather name={iconName} size={16} color='#fff' />
      <S.CardHeaderTitle>{title}</S.CardHeaderTitle>
    </S.CardHeader>
    <S.CardHeaderSubtitle>{subtitle}</S.CardHeaderSubtitle>
  </S.Card>
);

export default MovieDetailCard;