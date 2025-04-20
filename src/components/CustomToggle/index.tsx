import { css } from '../../../styled-system/css'

type CustomToggleProps = {
  toggleName: string
}
const CustomToggle = ({ toggleName }: CustomToggleProps) => {
  return (
    <button disabled={true} className={StyledToggle}>
      {toggleName}
    </button>
  )
}

const StyledToggle = css({
  padding: '0.2rem 0.5rem',
  backgroundColor: 'MainText',
  color: 'background',
  borderRadius: '0.5rem',
  margin: '0.5rem 0.5rem 0.5rem 0',
  fontSize: '1rem',
})

export default CustomToggle
