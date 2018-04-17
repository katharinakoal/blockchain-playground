import MerkleTools from '@settlemint/merkle-tools';
import { Transaction } from '../transaction/transaction';
import { Settings } from '../blockchain.settings';
import * as crypto from 'crypto';

export class Block {
  private _blockHash: string;

  public transactions: Transaction[];
  public readonly creationDate: Date;
  public previousBlockHash: string;
  public readonly signature: string;
  public readonly nonce: number;

  public nextBlock: Block;

  public get blockHash(): string {
    return this._blockHash;
  }

  constructor(transactions?: Transaction[]) {
    this.transactions = new Array<Transaction>();
    this.creationDate = new Date();
    this.previousBlockHash = Settings.rootBlockHash;
    if (transactions) {
      this.transactions.push(...transactions);
    }
  }

  public addTransactions(...transactions: Transaction[]): void {
    this.transactions.push(...transactions);
  }

  public chainWith(previousBlock: Block): void {
    if (previousBlock) {
      this.previousBlockHash = previousBlock.blockHash;
      previousBlock.nextBlock = this;
    }
    this.calculateBlockHash();
  }

  public calculateBlockHash(): void {
      console.log('now');
    this._blockHash = crypto
      .createHash(Settings.hashAlgorithm)
      .update(this.calculateMerkleRootHash())
      .update(this.previousBlockHash)
      .update(this.creationDate.toDateString())
      .digest('hex');
  }

  private calculateMerkleRootHash(): string {
    const merkleTools = new MerkleTools();
    merkleTools.addLeaves(
      this.transactions.map(transaction => transaction.calculateTransactionHash())
    );
    merkleTools.makeTree();
    const merkleRoot = merkleTools.getMerkleRoot().toString('hex');
    merkleTools.resetTree();
    return merkleRoot;
  }
}
