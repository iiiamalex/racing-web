import React, {useEffect, useState} from 'react';

const Countdown = ({targetDate}) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="countdown-grid">
            <div><span>{timeLeft.days || 0}</span><p>Days</p></div>
            <div><span>{timeLeft.hours || 0}</span><p>Hours</p></div>
            <div><span>{timeLeft.minutes || 0}</span><p>Minutes</p></div>
            <div><span>{timeLeft.seconds || 0}</span><p>Seconds</p></div>
        </div>
    );
};

export default Countdown;