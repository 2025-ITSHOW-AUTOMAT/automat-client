import Frame from "../components/frame"
import Dock from "../components/home/dock";
import Header from "../components/home/header"
import Project from "../components/home/project";
import styles from "../styles/home.module.css";

const Home = () => {
    return (
        <Frame>
            <Header />
            <div className={styles.projectContainer}>
                <Project />
                <Project />
            </div>
            <Dock />
        </Frame>
    )    
}

export default Home;