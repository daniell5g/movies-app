import { useAuth } from '@hooks/useAuth';
import React, { } from 'react'
import { Text, TouchableOpacity } from 'react-native'

// import { ImageLogo } from '@components/Logo'
import * as S from './styles'

export const HomePage = () => {
  const { logout } = useAuth();

  return (
    <S.Container>
      <Text>Home</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Teste</Text>
      </TouchableOpacity>
    </S.Container>
  )
}