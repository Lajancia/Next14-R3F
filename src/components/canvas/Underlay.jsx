'use client'
import styled from 'styled-components'

const Grid = styled.div`
  background-color: #1e1e1e;
  position: absolute;
  width: 100%;
  height: 100%;

  color: #373737;

  justify-content: center;
  align-items: center;

  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`
const Center = styled.div`
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center; /* Vertically center */
  height: 100%; /* Adjust as needed */
  font-size: 15rem;
`

export default function Underlay() {
  return (
    <Grid>
      <Center>
        MODERN OBJECT <br />
        DESIGN
      </Center>
    </Grid>
  )
}
