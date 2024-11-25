import { css } from 'styled-system/css'
import Image from 'next/image'

const Info = () => {
  return (
    <div className={StyledInfoWrapper}>
      <div className={StyledCategory}>Modern Art</div>
      <h1 className={StyledTitle}>MACRO KEYBOARD</h1>
      <div className={StyledCircle}>
        <button className={circleButton({ color: '#fff' })} />
        <button className={circleButton({ color: '#000' })} />
        <button className={circleButton({ color: '#F99417' })} />
      </div>
      <p className={StyledDate}>2024-10-19</p>
      <article className={StyledText}>
        Bla nskdanlkwdnwa asdanwdalsndalwd . asdnjawd askdjawjdad asdna asljdnadw asdaiawoif asdaowijaoijd
        asidjaowdjowijd aosidoawjdo oasdiajwdiaojd aojdoawdiwo aosdlanosd. aosidjaw. aosdaiowdi. aosjdaowdjidjaoasd.
      </article>
      <div className={StyledImages}>
        <Image
          src='/img/keyboard/keyboard-1.png'
          alt='Example Image'
          width={1000}
          height={1000}
          className={StyledImage}
        />
        <Image
          src='/img/keyboard/keyboard-2.png'
          alt='Example Image'
          width={1000}
          height={1000}
          className={StyledImage}
        />
        <Image
          src='/img/keyboard/keyboard-3.png'
          alt='Example Image'
          width={1000}
          height={1000}
          className={StyledImage}
        />
      </div>
    </div>
  )
}
export default Info

const StyledInfoWrapper = css({
  display: 'flex',
  width: '90%',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5rem',
  marginTop: '15%',
  height: '75%',
  color: 'white',
  gap: '1rem',
})

const StyledCategory = css({
  fontSize: '2rem',
  lineHeight: '0.1rem',
  color: 'white',
})

const StyledTitle = css({
  fontSize: '5rem',
  lineHeight: '100%',
  color: 'white',
})

const StyledCircle = css({
  display: 'flex',
  gap: '1rem',
})

const StyledDate = css({
  fontSize: '2.5rem',
  color: 'white',
})

const StyledText = css({
  fontSize: '1.5rem',
  color: 'white',
})

const circleButton = (props) =>
  css({
    width: '3rem',
    height: '3rem',
    backgroundColor: props.color,
    border: 'none',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '4.4rem',
    fontSize: '1.5rem',
    cursor: 'pointer',
  })

const StyledImages = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
})

const StyledImage = css({
  width: '25%',
  height: '16rem',
  objectFit: 'cover',
})
