import About from './aboutItem';
import styles from '../../styles/about.module.css';

const AboutDock = ({ aboutItems = [] }) => {
    const allItems = [...aboutItems, ...aboutItems, ...aboutItems];

    return (
        <div className={styles.aboutDockWrapper}>
            <div className={styles.aboutDockScroll}>
                {allItems.map((item, index) => (
                    <About
                        key={index}
                        image={item.image}
                        userName={item.userName}
                        title={item.title}
                        description={item.description}
                        icons={item.icons}
                    />
                ))}
            </div>
        </div>
    )
}

export default AboutDock;