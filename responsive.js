class GameOver {
    constructor() {
        this.playing = false;
        this.prevGameOver = false;
        this.gameover = false;
    }
}

class Color {
    constructor() {
        this.color = 'red';
    }
}

export let color = new Color();

export const classGameOver = new GameOver();

export let otherDaddy = document.getElementById('otherDaddy');
export let flipPhone = document.getElementById('flipPhone');
export let widenScreen = document.getElementById('widenScreen');

otherDaddy.removeChild(flipPhone);
otherDaddy.removeChild(widenScreen);