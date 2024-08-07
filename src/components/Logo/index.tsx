import logoPng from '../../assets/images/logo.png'
import * as S from './styles'

export const ImageLogo = () => {
  return (
    <S.ImageLogo
      testID="image-logo"
      source={logoPng}
      alt='Letras BRQ em branco e o a palavra movies em amarelo'
    />
  )
}