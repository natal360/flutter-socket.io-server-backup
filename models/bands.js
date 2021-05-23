const Band = require("./band");


class Bands {

  constructor(){
    this.bands = [];
  }

  // = new Band  無くても可能だが 調べるのに便利 
  addBand( band = new Band()){
    this.bands.push( band );
  }

  getBands(){
    return this.bands;
  }

  deleteBand( id = '' ){
    this.bands = this.bands.filter( band => band.id !== id);
    return this.bands;
  }

  voteBand( id = '' ){
    this.bands = this.bands.map( band => {
      if ( band.id === id ){
        band.votes++;
        return band;
      } else {
        return band;  //　数値が変わらないよう id が違う場合今の状態を返す
      }
    });
  }
}

module.exports = Bands;