// Functions for a global playlist queue

let originalQueue: string[] = [];
let queue: string[] = [];


/**
 * Adds a song to the queue
 * 
 * @param song - A path to the desired song
 */
export function add(song: string) {
    originalQueue.push(song);
    queue.push(song);
}

/**
 * Adds a songs to the queue
 * 
 * @param songs - A list of paths to the desired songs
 */
export function addList(songs: string[]) {
    originalQueue = [...originalQueue, ...songs];
    queue = [...queue, ...songs];
}

/**
 * Pops from the queue
 * 
 * @returns The song at the top of the stack and removes it
 */
export function pop() {
    const popped = queue.shift();
    originalQueue = originalQueue.filter(x => x !== popped);
    return popped;
}

/**
 * View the top item from the quee
 * @returns The item at the front of the queue
 */
export function peek() {
    return queue[queue.length - 1];
}

/**
 * Applies shuffling and unshuffling to the queue
 * 
 * @param shuffle true if the queue is shuffle
 */
export function shuffle(shuffle: boolean) {
    if (shuffle) {
        for (let i = queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [queue[i], queue[j]] = [queue[j], queue[i]];
        }
    } else {
        queue = [...originalQueue]
    }
        
}