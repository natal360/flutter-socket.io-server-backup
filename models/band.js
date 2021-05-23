const { v4: uuidV4 } = require('uuid')  // as v4


class Band {
  constructor( name = 'no-name' ){

    this.id = uuidV4();   // 一意のid作成 uuid  ()忘れ id 全て uuidV4 になる 
    this.name = name;
    this.votes = 0
  }
}

module.exports = Band;