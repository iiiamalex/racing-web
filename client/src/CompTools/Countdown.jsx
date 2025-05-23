import React, { useEffect, useState } from "react";

export default function Countdown({ targetDateISO }) {
    const calculate = () => {
        const diff = Date.parse(targetDateISO) - Date.now();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff % 86400000) / 3600000),
            minutes: Math.floor((diff % 3600000) / 60000),
            seconds: Math.floor((diff % 60000) / 1000),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculate());

    useEffect(() => {
        const iv = setInterval(() => setTimeLeft(calculate()), 1000);
        return () => clearInterval(iv);
    }, [targetDateISO]);

    return (
        <div className="countdown-grid">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
                <div key={unit}>
                    <span>{timeLeft[unit]}</span>
                    <p>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
                </div>
            ))}
        </div>
    );
}
