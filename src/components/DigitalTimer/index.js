// Write your code here
import { Component } from "react";
import './index.css'

const initialTimeLimit = 25

class DigitalTimer extends Component {
    state ={
        timeLimit: initialTimeLimit,
        seconds: initialTimeLimit * 60,
        isTimerRunning: false,
        isIncrementDecrementVisble: true
    }

    getTime = () => {
        const {seconds} = this.state
        const minute = parseInt(seconds / 60) < 10 ? '0' + parseInt(seconds / 60) : parseInt(seconds / 60)
        const rem = parseInt(seconds % 60) < 10 ? '0' + parseInt(seconds % 60) : parseInt(seconds % 60)
        return `${minute}:${rem}`
    }

    tick = () => {
        const {seconds} = this.state
        if(seconds > 0) {
            if(seconds === 1) {
                this.toggleIsTimerRunning()    
            }
            this.setState(prevState => ({seconds: prevState.seconds - 1}))
        } else {
            this.toggleIsTimerRunning()
        }
    }

    startTimer = () => {
        this.timerId = setInterval(this.tick, 1000)
    }


    toggleIsTimerRunning = () => {
        const {seconds} = this.state
        if(seconds === 0 ) return;

        this.setState(prevState => {
            if(!prevState.isTimerRunning) {
                this.startTimer()
            } else {
                clearInterval(this.timerId)
            }
            return {isTimerRunning: !prevState.isTimerRunning, isIncrementDecrementVisble: false}
        })
    }

    onIncreamentTimeLimit = () => {
        this.setState(prevState => ({
            timeLimit: prevState.timeLimit + 1,
            seconds: (prevState.timeLimit + 1) * 60
        }))
    }

    ondecreamentTimeLimit = () => {
        this.setState(prevState => ({
            timeLimit: prevState.timeLimit - 1,
            seconds: (prevState.timeLimit - 1) * 60
        }))
    }

    onReset = () => {
        clearInterval(this.timerId);

        this.setState(prevState => ({
            isTimerRunning: false,
            timeLimit: initialTimeLimit,
            seconds: initialTimeLimit * 60,
            isIncrementDecrementVisble: true
        }))
    }

    render() {
        const {timeLimit, isTimerRunning, isIncrementDecrementVisble} = this.state
        return (
            <div className="app-container">
                <h1 className="main-heading">Digital Timer</h1>
                <div className="digital-timer-container">
                    <div className="timer-bg">
                        <div className="timer-container">
                            <h1 className="timer">{this.getTime()}</h1>
                            <p className="timer-status">{isTimerRunning ? 'Running' : 'Paused'}</p>
                        </div>
                    </div>
                    <div className="controller-container">
                        <div className="start-pause-reset">
                            <div className="btn-container">
                                    <img alt={isTimerRunning? 'pause icon' : 'play icon'} src={`https://assets.ccbp.in/frontend/react-js/${isTimerRunning? 'pause' : 'play'}-icon-img.png`} className="icon"/>
                                <button className="btn btn-text" onClick={this.toggleIsTimerRunning}>
                                    {isTimerRunning ? 'Pause' : 'Start'}
                                </button>
                                {/* <p className="btn-text">{isTimerRunning ? 'Pause' : 'Start'}</p> */}
                            </div>
                            <div className="btn-container">
                                    <img alt="reset icon" src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png" className="icon"/>
                                <button className="btn btn-text" onClick={this.onReset}>
                                    Reset
                                </button>
                                {/* <p className="btn-text">Reset</p> */}
                            </div>
                        </div>
                        <div className="set-timer-limit-container">
                            <p>Set Timer limit</p>
                            <div className="set-timer-limit-controller">
                                <button onClick={this.ondecreamentTimeLimit} disabled={!isIncrementDecrementVisble}>
                                    -
                                </button>
                                <p>
                                    {timeLimit}
                                </p>
                                <button onClick={this.onIncreamentTimeLimit} disabled={!isIncrementDecrementVisble}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DigitalTimer