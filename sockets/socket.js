const { io } = require('../index');

const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();  // Bandsの使用

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Heroes del Silencio'));
bands.addBand( new Band('Metallica'));

console.log(bands);

// Sockets
io.on('connection', client => {
  console.log('Client connect');

  // connection時に bandsで定義した全体取得のデータを active-bands として送る
  client.emit('active-bands',bands.getBands());



  client.on('disconnect', () => {
    console.log('Client disconnect');
  });

  // index.html emit
  client.on('mensaje', (payload) => {
    console.log('Mensaje',payload);
    io.emit('mensaje', { admin: 'Nuevo mensaje '});
  });

  // 機能の追加 
  client.on('vote-band', payload => {
    bands.voteBand(payload.id);
    // voteBand で値を追加後全体データを取得
    // 注意 io.emit
    io.emit('active-bands',bands.getBands());
  })

  // リストの追加
  client.on('add-band', payload => {
    // payload.name  name の受け取り
    // addBand は Band型　を受け取るので newBandの作成
    const newBand = new Band( payload.name );
    bands.addBand(newBand);
    io.emit('active-bands',bands.getBands());
  })

  client.on('delete-band', payload => {
    bands.deleteBand(payload.id);
    io.emit('active-bands',bands.getBands());
  })


  // バックアップ
  // client.on('emitir-mensaje', (payload) => {
  //   console.log(payload);
  //   // io.emit('nuevo-mensaje', payload); // emite a todos!
  //   client.broadcast.emit('nuevo-mensaje', payload); // emite a todos!
  // })

  //　クライアント側の 【送信テスト】 を受け取る
  client.on('送信テスト', (payload) => {
    console.log(payload); // デバッグ用　ターミナル表示
    client.broadcast.emit('HTML表示', payload); // ブラウザへタイトルが【HTML表示】のpayloadを渡す
  })

});