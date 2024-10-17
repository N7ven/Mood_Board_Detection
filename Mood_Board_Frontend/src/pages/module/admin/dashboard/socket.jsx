import io from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://okotech.ai';
export const socket = io(URL, {
    path: '/ws/socket.io',
    transports: ['websocket']
 });