const notes = [
	{
		letter: "Q",
        name: "C5",
		url: "https://freesound.org/data/previews/448/448548_9311684-lq.mp3"
	}, {
		letter: "W",
        name: "D5",
		url: "https://freesound.org/data/previews/448/448619_9311684-lq.mp3"
	}, {
		letter: "E",
        name: "E5",
		url: "https://freesound.org/data/previews/448/448612_9311684-lq.mp3"
	}, {
		letter: "A",
        name: "F5",
		url: "https://freesound.org/data/previews/448/448594_9311684-lq.mp3"
	}, {
		letter: "S",
        name: "G5",
		url: "https://freesound.org/data/previews/448/448553_9311684-lq.mp3"
	}, {
		letter: "D",
        name: "A6",
		url: "https://freesound.org/data/previews/448/448567_9311684-lq.mp3"
	}, {
		letter: "Z",
        name: "B6",
		url: "https://freesound.org/data/previews/448/448534_9311684-lq.mp3"
	}, {
		letter: "X",
        name: "C6",
		url: "https://freesound.org/data/previews/448/448551_9311684-lq.mp3"
	}, {
		letter: "C",
        name: "D6",
		url: "https://freesound.org/data/previews/448/448618_9311684-lq.mp3"
	}
];

class Key extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentKey = {};
        for(let key of notes) {
            if(key.letter === this.props.keyLetter) {
                currentKey = key;
                break;
            }
        }
        return (
            <div id={currentKey.name} className="drum-pad">
                <p>{currentKey.letter}</p>
                <audio controls hidden className="clip" id={currentKey.letter} src={currentKey.url}></audio>
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
                <div id="column-1" className="piano-col">
                    <Key keyLetter="Q" />
                    <Key keyLetter="A" />
                    <Key keyLetter="Z" />
                </div>
                <div id="column-2" className="piano-col">
                    <Key keyLetter="W" />
                    <Key keyLetter="S" />
                    <Key keyLetter="X" />
                </div>
                <div id="column-3" className="piano-col">
                    <Key keyLetter="E" />
                    <Key keyLetter="D" />
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
			lastSound: "Welcome!",
			volume: 5
		}
		this.increaseVolume = this.increaseVolume.bind(this);
        this.decreaseVolume = this.decreaseVolume.bind(this);
        this.muteVolume = this.muteVolume.bind(this);
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
	componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPressed);
    }
	handleKeyPressed(e) {
	    window.playNoteFromLetter(String.fromCharCode(e.keyCode).toUpperCase());
    }
    render() {
        {
            const clips = Array.from(document.getElementsByClassName('clip'));
            clips.forEach(clip => {
                clip.volume = this.state.volume / 10.0
            });
        }
        return (
            <div id="drum-machine">
                <div className="controls-container">
                    <p id="display">{this.state.lastSound}</p>
                    <div id="volume-controls">
							  	<button onClick={this.muteVolume} id="volume-mute" class="btn btn-block btn-danger"><i class="fas fa-volume-mute"></i></button>
							  	<p> </p>
                        <button onClick={this.decreaseVolume} id="volume-down" class="btn btn-block btn-info"><i class="fas fa-volume-down"></i></button>
                        <p id="current-volume" class="align-middle">{this.state.volume}</p>
							  <button onClick={this.increaseVolume} id="volume-up" class="btn btn-block btn-info"><i class="fas fa-volume-up"></i></button>
                    </div>
                </div>
                <Piano volume={this.state.volume} />
            </div>
        )
    }
} 

ReactDOM.render(
  <MusicApp />, document.getElementById("main")
);

$("document").ready(function () {
    $("#C5").css("background-color", "black");
    $("#C5").css("color", "white");
	$("#E5").css("background-color", "black");
    $("#E5").css("color", "white");
	$("#G5").css("background-color", "black");
    $("#G5").css("color", "white");
	$("#B6").css("background-color", "black");
    $("#B6").css("color", "white");
	$("#D6").css("background-color", "black");
    $("#D6").css("color", "white");
	
    $('.drum-pad').click(function () {
        let currentNote = {};
		for(let note of notes) {
			if(note.name === this.id) {
                currentNote = note;
                break;
			}
        }
        playNote(currentNote);
    });
});

function playNoteFromLetter(letter) {
    for(let note of notes) {
        if(note.letter === letter) {
            playNote(note);
            break;
        }
    }
}

function playNote(note) {
    $("#display").text(note.name);
    const playerElement = "#" + note.letter;
	 document.getElementById(note.letter).currentTime = 0;
    $(playerElement).trigger("play");
}