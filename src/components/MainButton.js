import { ArrowUpRight } from "lucide-react";

const MainButton = (props) => {
  return(
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '19px',
      padding: '10px',
      background: 'linear-gradient(to right, rgba(208, 230, 236, 0.1), rgba(211, 233, 239, 0.2))',
      border: 'solid 1px rgba(42, 91, 99, 0.2)',
      borderRadius: '8px',
      transition: 'border-color 0.3s ease',
      cursor: 'pointer',
      justifyContent: 'space-between',
    }}
    onClick={props.onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(0, 164, 200, 0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(42, 91, 99, 0.2)';
    }}
    >
      <div >
        <div
          style={{
            width: '72px',
            height: '72px',
            backgroundImage: 'url(/automatMain.png)',
            backgroundSize: 'cover',        
            backgroundPosition: 'center',   
            backgroundRepeat: 'no-repeat',
            borderRadius: '5px'
          }}>
        </div>

      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'.replace,
        flex: 1,
        marginLeft: '19px',
      }}>
        <div style={{
          color: '#00A4C8',
          fontWeight: '600',
          fontSize: '17px'
        }}>
          {props.msg}
        </div>
        <div style={{
          color: '#545454',
          fontWeight: '500',
          fontSize: '13px'
        }}>
          {props.submsg}
        </div>
      </div>
      <ArrowUpRight 
         size={20} 
         style={{
           color: '#00A4C8',
           flexShrink: 0, /* 아이콘이 줄어들지 않도록 */
           marginLeft: '19px'
         }}
       />
    </div>
  )
}

export default MainButton;