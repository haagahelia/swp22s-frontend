import React from "react";

export default function Clock() {
    const [time, setTime] = React.useState(new Date());
    
    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    
    return (
        <div>
        <div>{time.toLocaleTimeString()}</div>
        </div>
    );
    }
