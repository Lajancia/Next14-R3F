import styled from 'styled-components'

const Info = () => {
  return (
    <StyledInfoWrapper>
      <div>Modern Art</div>
      <h1>MACRO KEYBOARD</h1>
      <p>2024-10-19</p>
      <article>
        Bla nskdanlkwdnwa asdanwdalsndalwd . asdnjawd askdjawjdad asdna asljdnadw asdaiawoif asdaowijaoijd
        asidjaowdjowijd aosidoawjdo oasdiajwdiaojd aojdoawdiwo aosdlanosd. aosidjaw. aosdaiowdi. aosjdaowdjidjaoasd.
      </article>
    </StyledInfoWrapper>
  )
}
export default Info

const StyledInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem;
  height: 100%;
  color: white;
`
