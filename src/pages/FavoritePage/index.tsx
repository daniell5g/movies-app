import React, { } from 'react'
import { useFavoritesStore } from 'src/store/favoritesStore';

import * as S from './styles'

export const FavoritePage = () => {
  const { favorites, removeFavorite } = useFavoritesStore();

  const handleRemoveFavorite = (movieId: number) => {
    removeFavorite(movieId);
  }

  return (
    <S.Container>

    </S.Container>
  )
}