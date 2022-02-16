import cryptoJs from 'crypto-js'

class CryptoHelper {
  public key:string
  constructor(key:string) {
    this.key = key
  }
  public encrypt(word:string|undefined):string {
    if (!word) {
      return ''
    }
    const encrypted = cryptoJs.MD5(word)
    return encrypted.toString()
  }
}

export default CryptoHelper