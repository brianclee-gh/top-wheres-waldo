import React, { useEffect, useState } from 'react';

function NavBar({startGame, endGame, resetGame, score, time}) {

    const [gameTimer, setGameTimer] = useState(0);

    const characterData = score.map((val) => {

        const show = val.found ? 'hidden' : 'show';
        return (
            React.createElement('div', {id: val.name, className: show}, val.name)
        )
    })

    const timer = () => {
        if (time.start === 0) return;

        if (time.end === 0) {

            const diff = (Date.now() - time.start) / 1000;
            setGameTimer(Math.round(diff));

            return
        }

        const diff = ((time.end - time.start) / 1000);
        setGameTimer(Math.round(diff))
    };

    useEffect(() => {
        const interval = setInterval(() => {
            timer()
        }, 1000)
        return () => clearInterval(interval)
    })


    return (
        <div id='NavBar'>
            <div id="wadhuheck">Timer: {gameTimer}</div>
            <div>{characterData}</div>
            <button id='startBtn' onClick={startGame}>Start</button>
            <button id='endBtn' onClick={endGame}>End</button>
            <button id='resetBtn' onClick={resetGame}>New Game</button>
        </div>
    )
};

export default NavBar;
