import { useNavigation } from '@react-navigation/native';

import { CONFIG_ACCESSIBILITY_KEY } from '../../../configs/constants';
import { AsyncStorageImpl } from '../../../libs/storage/async-storage';
import type { ISplashViewModel } from './interface';

const useSplashViewModel = () => {
  const navigation = useNavigation()

  async function handleCheckNextPage() {
    const storage = new AsyncStorageImpl()
    const configAccessibility = await storage.getItem(CONFIG_ACCESSIBILITY_KEY)

    if (configAccessibility !== null) {
      navigation.navigate('SignInPage')
      return
    }

    navigation.navigate('ConfigAccessibilityPage')
  }

  const viewModel: ISplashViewModel = {
    handleCheckNextPage,
  };

  return viewModel
};

export { useSplashViewModel };