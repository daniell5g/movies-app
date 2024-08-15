import { ItemMovieCardFavorite } from '@components/ItemMovieCardFavorite';
import { AntDesign, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import type { Movie } from '@utils/interfaces';
import React from 'react'

import { useFavoritesStore } from '../../store/favoritesStore';
import * as S from './styles'

export const FavoritePage = () => {
  const { favorites } = useFavoritesStore();
  const navigation = useNavigation();

  const componentMovieItem = ({ item }: { item: Movie }) =>
  (
    <ItemMovieCardFavorite info={item} />
  )

  return (
    <S.Container>
      <S.Header>
        <S.ActionRight onPress={() => navigation.navigate('HomePage')}>
          <Feather name='arrow-left' size={24} color='#fff' />
        </S.ActionRight>

        <S.SessionMoviesTitle>
          Meus filmes favoritos
        </S.SessionMoviesTitle>
      </S.Header>

      <S.SessionMovies>
        <S.ListMovies
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={componentMovieItem}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <S.ListEmptyComponent>
                <AntDesign name='inbox' size={38} color='#e5e5e5' />
                <S.EmptyText>
                  Não há filmes favoritos
                </S.EmptyText>
              </S.ListEmptyComponent>
            )
          }}
        />
      </S.SessionMovies>
    </S.Container>
  )
}