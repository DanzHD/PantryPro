import {useEffect, useState} from "react";

export default function useTimer() {
    const [timeleft, setTimeLeft] = useState(0)

    useEffect(() => {
        if (timeleft <= 0) return;

        const timeout = setTimeout(() => {
            setTimeLeft(timeleft - 1)

        }, 1000)

        return  () => clearTimeout(timeout)

    }, [timeleft]);

    function start(seconds: number) {
        setTimeLeft(seconds)
    }

    return { timeleft, start }

}