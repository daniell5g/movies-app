import { useAuth } from '@hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native'

import { PrivateRoutes } from './private.routes';
import { PublicRoutes } from './public.routes'

const Routes = () => {
  const { loggedIn } = useAuth();

  return (
    <NavigationContainer>
      {loggedIn ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  )
}

export { Routes }