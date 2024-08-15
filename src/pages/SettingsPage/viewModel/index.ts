import { useThemeSwitcher } from '@hooks/useThemeSwitcher';
import { useCallback, useState } from 'react';
import type { ThemeName } from 'src/theme';

import { CONFIG_ACCESSIBILITY_KEY } from '../../../configs/constants';
import { AsyncStorageImpl } from '../../../libs/storage/async-storage';
import type { ISettingsViewModel } from './interface';

const useSettingsViewModel = () => {
  const { changeTheme, theme } = useThemeSwitcher()

  const [selected, setSelected] = useState<ThemeName>('default')

  const handleChange = useCallback(async () => {
    const storage = new AsyncStorageImpl()

    changeTheme(selected)
    await storage.setItem(CONFIG_ACCESSIBILITY_KEY, selected)
  }, [selected])

  const viewModel: ISettingsViewModel = {
    selected,
    theme,
    setSelected,
    handleChange,
  };

  return viewModel
};

export { useSettingsViewModel };