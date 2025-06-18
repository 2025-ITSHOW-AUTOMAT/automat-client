import styles from "../../styles/about.module.css";

const About = ({ image, userName, title, description, icons = [] }) => {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.aboutWrapper}>
                <div className={styles.titleImage}>
                    {image && <img src={image} alt={userName} className={styles.image} />}
                </div>
                <div className={styles.titleContent}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.userName}>{userName}</div>    
                </div>
                <div className={styles.iconGroup}>
                    {icons.map((IconComponent, index) => (
                        <IconComponent key={index} className={styles.sendIcon} />
                    ))}
                </div>
            </div>
            <hr className={styles.aboutLine} />
            <div className={styles.description}>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default About;