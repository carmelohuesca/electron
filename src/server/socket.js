const env = require('./environment');

module.exports = app => {
    const server = app.listen(env.SOCKET_PORT);
    const io = require('socket.io').listen(server);
    let usersOnline = 0;
    const emitUsers = usersOnline => {
        io.emit('users', usersOnline.toString());
        const message = usersOnline === 1 ? [usersOnline, 'usuario en linea'].join(' ') : [usersOnline, 'usuarios en linea'].join(' ');
        displayMsg(message);
    };

    const displayMsg = msg => {
        if (env.PLATFORM_ENV === 'development') {
            console.log('\x1b[32m', msg);
        }
    };

    io.on('connection', (socket) => {
        usersOnline++;
        socket.on('disconnect', () => {
            usersOnline--;
            emitUsers(usersOnline);
        });
        emitUsers(usersOnline);
    });
};