import MainButton from "../components/MainButton";
import Frame from "../components/frame"
//import Dock from "../components/home/dock";
import Header from "../components/home/header"
//import Project from "../components/home/project";
import styles from "../styles/home.module.css";

const Home = () => {
    return (
        <Frame children={
            <div className={styles.container}>
                <div className={styles.mainbox}>
                    <MainButton
                        msg='앨범 커스텀하러 가기'
                        submsg = 'AI를 활용해 나만의 앨범 만들기' />
                        
                    <MainButton
                        msg='다른 앨범 구경하기'
                        submsg = '다양한 앨범 구경하러 가기' />
                </div>
            </div>
        }>
        </Frame>
    )    
}

export default Home;