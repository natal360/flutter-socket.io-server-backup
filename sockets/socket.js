const { io } = require('../index');


// Sockets
io.on('connection', client => {
  console.log('Client connect');



  client.on('disconnect', () => {
    console.log('Client disconnect');
  });

  // index.html emit
  client.on('mensaje', (payload)=>{
    console.log('Mensaje',payload);

    io.emit('mensaje', { admin: 'Nuevo mensaje '});

  });


});