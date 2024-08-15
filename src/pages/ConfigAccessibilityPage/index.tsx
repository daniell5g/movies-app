import { ImageLogo } from '@components/Logo'
import React, { } from 'react'
import RNPickerSelect from 'react-native-picker-select';

import * as S from './styles'
import { useConfigAccessibilityViewModel } from './viewModel';

export const ConfigAccessibilityPage = () => {
  const { options, selected, setSelected, handleChange } = useConfigAccessibilityViewModel()

  return (
    <S.Container>
      <ImageLogo />

      <S.Header>
        <S.Title>Configurações de Acessibilidade</S.Title>
        <S.Description>
          Antes de continuar, precisamos ajustar o aplicativo para proporcionar a melhor experiência possível para você.
        </S.Description>
      </S.Header>

      <S.Question>
        Se você possui alguma deficiência visual, por favor, selecione a opção que melhor descreve sua condição.
      </S.Question>

      <RNPickerSelect
        onValueChange={(value) => setSelected(value)}
        placeholder={{ label: 'Selecione uma opção', value: 'default' }}
        items={options}
        touchableWrapperProps={{ testID: 'picker-select' }}
        style={{
          placeholder: {
            color: '#fff',
          },
          inputAndroid: {
            backgroundColor: '#797979',
            color: '#fff',
          },
          inputIOS: {
            backgroundColor: '#797979',
            color: '#fff',
          },
        }}
      />

      <S.Button onPress={handleChange} testID="button-config-accessibility">
        <S.ButtonText>
          {selected === 'default' ? 'Desejo pular' : 'Definir configuração'}
        </S.ButtonText>
      </S.Button>
    </S.Container>
  )
}