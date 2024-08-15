import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';

import * as S from './styles';

interface Props extends TextInputProps {
  label: string;
  leftIcon?: React.ComponentProps<typeof Feather>['name'];
  isPassword?: boolean;
  testIDIcon?: string;
}

const CustomTextInput: React.FC<Props> = ({ label, leftIcon, testIDIcon, isPassword, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  return (
    <S.Container {...props} testID="container-input-custom">
      <S.Label testID="label-input-custom" isFocused={isFocused || !!text}>{label}</S.Label>
      <S.InputContainer>
        {leftIcon && (
          <Feather
            testID={testIDIcon}
            name={leftIcon}
            size={24}
            color='#fff'
            style={{ marginRight: 10 }}
          />
        )}
        <S.StyledTextInput
          testID="input-text-custom"
          secureTextEntry={isPassword}
          onFocus={() => setIsFocused(true)}
          value={text}
          onChangeText={(text) => setText(text)}
          {...props}
        />
        {text.length > 0 && (
          <TouchableOpacity onPress={() => setText('')}>
            <Feather name="x" size={24} color="#fff" style={{ marginRight: 10 }} />
          </TouchableOpacity>
        )}
      </S.InputContainer>
    </S.Container>
  );
};

export default CustomTextInput;
