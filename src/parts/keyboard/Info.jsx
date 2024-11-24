import { css } from 'styled-system/css'

const Info = () => {
  return (
    <div className={StyledInfoWrapper}>
      <div>Modern Art</div>
      <h1>MACRO KEYBOARD</h1>
      <p>2024-10-19</p>
      <article>
        Bla nskdanlkwdnwa asdanwdalsndalwd . asdnjawd askdjawjdad asdna asljdnadw asdaiawoif asdaowijaoijd
        asidjaowdjowijd aosidoawjdo oasdiajwdiaojd aojdoawdiwo aosdlanosd. aosidjaw. aosdaiowdi. aosjdaowdjidjaoasd.
      </article>
    </div>
  )
}
export default Info

const StyledInfoWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5rem',
  height: '100%',
  color: 'white',
})
