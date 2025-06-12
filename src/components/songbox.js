import styles from '../styles/songbox.module.css'

function Songbox(){
  return(
    <div style={{backgound: 'linear-gradient(to right, rgba(208, 230, 236, 0.1), rgba(211, 233, 239, 0.2)',
                  padding: '39px 20px'}}>
      <div>
        <p>songname</p>
        <p>username</p>
      </div>
    </div>
  )

}

export default Songbox;