import { css } from '../../../styled-system/css'

const gridStyles = css({
  backgroundColor: 'background',
  position: 'absolute',
  width: '100%',
  height: '100%',
  color: '#373737',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 425px)': { gridTemplateColumns: '1fr' },
  transition: 'all 0.5s',
})
const centerStyles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  fontSize: '12rem',
  transition: 'all 0.5s',
})

export default function Underlay() {
  return (
    <div className={gridStyles}>
      <div className={centerStyles}>
        MODERN OBJECT <br />
        DESIGN
      </div>
    </div>
  )
}