import { useThemeSwitcher } from '@hooks/useThemeSwitcher';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { CONFIG_ACCESSIBILITY_KEY } from '../../../configs/constants';
import { AsyncStorageImpl } from '../../../libs/storage/async-storage';
import type { ThemeName } from '../../../theme';
import type { IConfigAccessibilityViewModel } from './interface';

const useConfigAccessibilityViewModel = () => {
  const { changeTheme } = useThemeSwitcher()
  const navigation = useNavigation()

  const [selected, setSelected] = useState<ThemeName>('default')

  const options = [
    { label: 'Normal', value: 'default', testID: 'default-picker-item' },
    { label: 'Protanopia', value: 'protanopia', testID: 'protanopia-picker-item' },
    { label: 'Deuteranopia', value: 'deuteranopia', testID: 'deuteranopia-picker-item' },
    { label: 'Tritanopia', value: 'tritanopia', testID: 'tritanopia-picker-item' },
  ];

  const handleChange = useCallback(async () => {
    const storage = new AsyncStorageImpl()

    changeTheme(selected)
    await storage.setItem(CONFIG_ACCESSIBILITY_KEY, selected)

    navigation.navigate('SignInPage')
  }, [selected])

  const viewModel: IConfigAccessibilityViewModel = {
    options,
    selected,
    setSelected,
    handleChange,
  };

  return viewModel
};

export { useConfigAccessibilityViewModel };