import { useThemeSwitcher } from '@hooks/useThemeSwitcher';
import { useCallback, useState } from 'react';

import { CONFIG_ACCESSIBILITY_KEY } from '../../../configs/constants';
import { AsyncStorageImpl } from '../../../libs/storage/async-storage';
import type { ThemeName } from '../../../theme';
import type { ISettingsViewModel } from './interface';

const useSettingsViewModel = () => {
  const { changeTheme, theme } = useThemeSwitcher()

  const [selected, setSelected] = useState<ThemeName>('default')
  const options = [
    { label: 'Normal', value: 'default' },
    { label: 'Protanopia', value: 'protanopia' },
    { label: 'Deuteranopia', value: 'deuteranopia' },
    { label: 'Tritanopia', value: 'tritanopia' },
  ]

  const handleChange = useCallback(async () => {
    const storage = new AsyncStorageImpl()

    changeTheme(selected)
    await storage.setItem(CONFIG_ACCESSIBILITY_KEY, selected)
  }, [selected])

  const viewModel: ISettingsViewModel = {
    options,
    theme,
    selected,
    setSelected,
    handleChange,
  };

  return viewModel
};

export { useSettingsViewModel };