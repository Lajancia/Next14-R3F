import { css } from '../../../../styled-system/css'

export const StyledTextContent = css({
  position: 'absolute',
  width: '100%',
  height: '100dvh',
  zIndex: 1,
})

export const StyledContainer = css({
  position: 'relative',
  width: '100%',
  height: '100%',
})

export const StyledSection01 = css({
  position: 'absolute',
  zIndex: 1,
})

export const StyledHeaderContainer = css({
  position: 'absolute',
  zIndex: 10,
  width: '100%',
  height: '20vh',
  overflow: 'auto',
})

export const StyledAstronaut = css({
  display: 'none',
  width: '100%',
  height: '100%',
  lg: { display: 'block' },
})
