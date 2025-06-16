import "../../styles/header.module.css";
import { Clock } from 'lucide-react';


const DataRimeDisplay = () => {
    const now = new Date();

    // 월, 일, 요일
    const month = now.getMonth() + 1;
    const data = now.getDate();
    const weekday = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][now.getDay()];

    // 시간
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return (
        <div className="datetime-container">
            <span className="status">
                <span className="status-indicator"></span>
                VISION TO SOUND. READY.
            </span>
            <span className="time">
                <Clock size={16} style={{ marginRight: '4px', verticalAlign: 'middle', color: '#00A4C8' }} />
                {month}월 {data}일 {weekday} {hours}:{minutes}
            </span>
        </div>
    );
};

export default DataRimeDisplay;