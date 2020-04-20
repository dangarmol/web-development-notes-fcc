const notes = [
	{
		letter: "Q",
        name: "C5",
        colour: "black",
		url: "https://freesound.org/data/previews/448/448548_9311684-lq.mp3"
	}, {
		letter: "W",
        name: "D5",
        colour: "white",
		url: "https://freesound.org/data/previews/448/448619_9311684-lq.mp3"
	}, {
		letter: "E",
        name: "E5",
        colour: "black",
		url: "https://freesound.org/data/previews/448/448612_9311684-lq.mp3"
	}, {
		letter: "A",
        name: "F5",
        colour: "white",
		url: "https://freesound.org/data/previews/448/448594_9311684-lq.mp3"
	}, {
		letter: "S",
        name: "G5",
        colour: "black",
		url: "https://freesound.org/data/previews/448/448553_9311684-lq.mp3"
	}, {
		letter: "D",
        name: "A6",
        colour: "white",
		url: "https://freesound.org/data/previews/448/448567_9311684-lq.mp3"
	}, {
		letter: "Z",
        name: "B6",
        colour: "black",
		url: "https://freesound.org/data/previews/448/448534_9311684-lq.mp3"
	}, {
		letter: "X",
        name: "C6",
        colour: "white",
		url: "https://freesound.org/data/previews/448/448551_9311684-lq.mp3"
	}, {
		letter: "C",
        name: "D6",
        colour: "black",
		url: "https://freesound.org/data/previews/448/448618_9311684-lq.mp3"
	}
];

//TODO Colour the volume number using jQuery!
//TODO Colour the keys using jQuery!
//TODO Colour the keys onClick using jQuery!

class Key extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentKey = {};
        for(let key of notes) {
            if(key.letter = this.props.keyLetter) {
                currentKey = key;
                break;
            }
        }
        return (
            <div id={currentKey.name} className="drum-pad">
                <p>{currentKey.letter}</p>
                {/*<audio controls volume="0.9" id="audio-example-loud"></audio>}*/}
                <audio className="clip" id={currentKey.letter} src={currentKey.url}></audio>
            </div>
        )
    }
}

class Piano extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="piano-keyboard">
                <div id="row-1" className="piano-row">
                    <Key keyLetter="Q" />
                    <Key keyLetter="W" />
                    <Key keyLetter="E" />
                </div>
                <div id="row-2" className="piano-row">
                    <Key keyLetter="A" />
                    <Key keyLetter="S" />
                    <Key keyLetter="D" />
                </div>
                <div id="row-3" className="piano-row">
                    <Key keyLetter="Z" />
                    <Key keyLetter="X" />
                    <Key keyLetter="C" />
                </div>
            </div>
        )
    }
}

class MusicApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lastSound = "",
			volume = 5
		}
		this.increaseVolume = this.increaseVolume.bind(this);
		this.decreaseVolume = this.decreaseVolume.bind(this);
	}
	increaseVolume() {
		this.setState({
			volume: (this.state.volume + 1 >= 10) ? 10 : this.state.volume + 1
		});
	}
	decreaseVolume() {
		this.setState({
			volume: (this.state.volume - 1 <= 0) ? 0 : this.state.volume - 1
		});
    }
    muteVolume() {
        this.setState({
			volume: 0
		});
    }
    
    render() {
        return (
            <div id="drum-machine">
                <div className="controls-container">
                    <p id="display">{this.state.lastSound}</p>
                    <div id="volume-controls">
                        <button id="volume-up" class="btn btn-block btn-info"><i class="fas fa-volume-up"></i></button>
                        <p id="current-volume">{this.state.volume}</p>
                        <button id="volume-down" class="btn btn-block btn-info"><i class="fas fa-volume-down"></i></button>
                        <button id="volume-mute" class="btn btn-block btn-danger"><i class="fas fa-volume-mute"></i></button>
                    </div>
                </div>
                <Piano volume={this.state.volume} />
            </div>
        )
    }
} 

ReactDOM.render(
  <MusicApp />,
  document.getElementById('main')
);