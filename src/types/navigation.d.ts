declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamList { }
  }
}

export type ParamList = {
  SplashPage: undefined;
  ConfigAccessibilityPage: undefined;
  SignInPage: undefined;
  HomePage: undefined;
  DetailsPage: {
    movieId: number;
  }
  FavoritePage: undefined;
};
