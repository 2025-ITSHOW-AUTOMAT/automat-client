import { GoArrowUpRight } from "react-icons/go";
const FooterButton = (props) => {
  return(
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '14px 0',
      backgroundColor: 'white',
      border: 'solid 1px #B2D4DA',
      borderRadius: '10px',
      gap: '13px',
    }}>
      <div style={{
        color: '#1C1C1C',
        fontWeight: '600',
        fontSize: '12px'
      }}>
        {props.msg}
      </div>
      <GoArrowUpRight size={14} color="#00A4C8"/>

    </div>
  )
}

export default FooterButton;