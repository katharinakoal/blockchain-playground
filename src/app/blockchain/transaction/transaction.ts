import { Settings } from '../blockchain.settings';
import * as crypto from 'crypto-browserify';
export class Transaction {
  constructor(public data: string = '') {
    if (!data) {
      this.data = `TXN ${crypto.randomBytes(4).toString('hex')}`;
    }
  }

  public calculateTransactionHash(): string {
    return crypto
      .createHash(Settings.hashAlgorithm)
      .update(this.data)
      .digest('hex');
  }
}
