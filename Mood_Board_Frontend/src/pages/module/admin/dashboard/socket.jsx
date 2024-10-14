import io from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://20.204.226.52:9002/';
export const socket = io(URL);