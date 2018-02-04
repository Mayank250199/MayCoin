const SHA256 = require('crypto-js/sha256');


class Coin{
  constructor(index,time,data,preHash = ''){
    this.index   = index;
    this.time    = time;
    this.data    = data;
    this.preHash = preHash;
    this.Hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(){
    return SHA256(this.index + this.prevHash+ this.time +JSON.stringify(this.data)+this.nonce).toString();
  }

  mineBlock(difficulty){
    while(this.Hash.substring(0,difficulty) !== Array(difficulty+1).join("0") ){
      this.nonce++;
      this.Hash = this.calculateHash();
    }
    console.log('Block Mined:' + this.Hash);
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }
  createGenesisBlock(){
    return new Coin(0,"04/02/2018","Genesis block",0);
  }
  getCoin(){
    return this.chain[this.chain.length-1];
  }
  addCoin(newCoin){
    newCoin.preHash = this.getCoin().Hash;
    //newCoin.Hash = newCoin.calculateHash();
newCoin.mineBlock(this.difficulty);
    this.chain.push(newCoin);
  }

checkValidchain(){
  for(var i=1; i<this.chain.length; i++){
    var currentCoin = this.chain[i];
    var preCoin = this.chain[i-1];

    if(currentCoin.Hash !== currentCoin.calculateHash()){
      return false;
    }

    if(preCoin.Hash !== preCoin.calculateHash()){
      return false;
    }
  }
  return true;
}


}

let mayCoin = new Blockchain();
console.log("mining Block-1: ");
mayCoin.addCoin(new Coin(1,"03/02/2018",{amount:4}));

console.log("mining Block-2: ");
mayCoin.addCoin(new Coin(2,"04/02/2018",{amount:11}));

// console.log('is this Blockchain is valid '+ mayCoin.checkValidchain());
//
// mayCoin.chain[1].data = {amount:100};
// console.log('is this Blockchain is valid '+ mayCoin.checkValidchain());
// console.log(JSON.stringify(mayCoin,null,4));
