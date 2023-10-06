import React, { Component } from 'react'

export default class countDownTimer extends Component {
    state: {
        downHour: any,
        downMinute: any,
        downSeconds: any,
    }

    constructor(props: any) {
        super(props);
        this.state = {
            downHour: 8,
            downMinute: 59,
            downSeconds: 59,
        }
    }

    componentDidMount(): void {
        this.countDownTimer()
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevState !== this.state.downSeconds) {
            this.countDownTimer();
        }
        return;
    }

    countDownTimer = () => {
        setTimeout(() => {
            if (this.state.downSeconds == 0) {
                if (this.state.downMinute == 0) {
                    this.setState({ downHour: this.state.downHour - 1, downMinute: 59, downSeconds: 59 });
                } else {
                    this.setState({ downMinute: this.state.downMinute - 1, downSeconds: 59 });
                }
            } else {
                this.setState({ downSeconds: this.state.downSeconds - 1 });
            }
        }, 1000);
    };

    render() {
        return (
            <div className="">
                {this.state.downHour} : {this.state.downMinute} : {this.state.downSeconds}
            </div>
        )
    }
}