import { NavigationContainer } from '@react-navigation/native'

import { PublicRoutes } from './public.routes'

const Routes = () => {
  return (
    <NavigationContainer>
      <PublicRoutes />
    </NavigationContainer>
  )
}

export { Routes }