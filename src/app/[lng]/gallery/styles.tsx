import { css } from '../../../../styled-system/css'

export const StyledHeaderContainer = css({ width: '100%', height: '18dvh', lg: { height: '20dvh' } })
export const StyledFlexContainer = css({ width: '100vw', height: '72dvh', lg: { height: '70dvh' } })
export const StyledFooter = css({
  overflow: 'hidden',
  zIndex: 1,
  position: 'absolute',
  bottom: 0,
  height: '10vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
})
