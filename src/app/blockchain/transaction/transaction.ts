import { SHA256, WordArray } from 'crypto-js';
export class Transaction {
  constructor(public data: string = '') {}

  public calculateTransactionHash(nonce: string): WordArray {
    return SHA256(this.data + nonce);
  }
}
