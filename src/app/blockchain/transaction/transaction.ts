import { Settings } from '../blockchain.settings';
import * as crypto from 'crypto';
export class Transaction {
  constructor(public data: string = '') {
    if (!data) {
      this.data = crypto.randomBytes(4).toString('hex');
    }
  }

  public calculateTransactionHash(nonce: string): string {
    return crypto
      .createHash(Settings.hashAlgorithm)
      .update(this.data + nonce)
      .digest('hex');
  }
}
