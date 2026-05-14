// Functions for a global playlist queue

let queue: string[] = [];
let history: string[] = []
const MAX_LENGTH: number = 400;

function debug() {
    return;
    if (import.meta.env.DEV) {
        console.log("queue" + queue);
        console.log("history" + history);
    }
}

/**
 * Adds a song to the queue
 * 
 * @param song - A path to the desired song
 */
export function add(song: string) {
    if (queue.length >= MAX_LENGTH) {
        console.log("Queue full");
        return
    }
    queue.push(song);
    debug();
}

/**
 * Adds a songs to the queue
 * 
 * @param songs - A list of paths to the desired songs
 */
export function addList(songs: string[]) {
    if (queue.length + songs.length > MAX_LENGTH) {
        console.log("Too many songs");
        return
    }
    queue = [...queue, ...songs];
    debug();
}

/**
 * View the current song in the queue
 * @returns The item at the front of the queue
 */
export function peek() {
    debug();
    return queue[0];
}

/**
 * Applies shuffling and unshuffling to the queue
 * 
 */
export function shuffle() {
    for (let i = queue.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * i) + 1;
        [queue[i], queue[j]] = [queue[j], queue[i]];
    }   
    debug();
}

/**
 * Sets the order of the queue going forwards
 * 
 */
export function setOrder(songs: string[]) {
    while(songs[0] != queue[0]) {
        const first = songs.shift();

        if (first !== undefined) {
            songs.push(first);
        }
    }
    queue = songs;
    debug();
}

/**
 * Starts playing the next song
 */
export function next() {
    const popped = queue.shift();
    if (popped === undefined) {
        return
    }
    if (!queue.includes(popped)) {
        queue.push(popped);
    }

    while(history.length >= MAX_LENGTH) {
        history.shift();
    }

    history.push(popped);
    debug();
}

/**
 * Queues up a song from history
 */
export function previous() {
    const popped = history.pop();
    if (popped === undefined) {
        return
    }
    add(popped)
    debug();
}
