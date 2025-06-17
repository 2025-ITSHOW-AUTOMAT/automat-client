const MainButton = (props) => {
  return(
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '19px',
      padding: '10px',
      background: 'linear-gradient(to right, rgba(208, 230, 236, 0.1), rgba(211, 233, 239, 0.2))',
      border: 'solid 1px rgba(0, 164, 200, 0.1)',
      borderRadius: '8px'
    }}>
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
        gap: '10px'
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

    </div>
  )
}

export default MainButton;