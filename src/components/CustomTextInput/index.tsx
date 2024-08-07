import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';

import * as S from './styles';

interface Props extends TextInputProps {
  label: string;
  leftIcon?: React.ComponentProps<typeof Feather>['name'];
  isPassword?: boolean;
}

const CustomTextInput: React.FC<Props> = ({ label, leftIcon, isPassword, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  return (
    <S.Container {...props}>
      <S.Label isFocused={isFocused || !!text}>{label}</S.Label>
      <S.InputContainer>
        {leftIcon && <S.LeftIcon name={leftIcon} size={24} color='#fff' />}
        <S.StyledTextInput
          secureTextEntry={isPassword}
          onFocus={() => setIsFocused(true)}
          value={text}
          onChangeText={(text) => setText(text)}
          {...props}
        />
        {text.length > 0 && (
          <TouchableOpacity onPress={() => setText('')}>
            <S.ClearIcon name="x" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </S.InputContainer>
    </S.Container>
  );
};

export default CustomTextInput;
