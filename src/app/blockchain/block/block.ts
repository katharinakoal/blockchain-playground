import MerkleTools from '@settlemint/merkle-tools';
import { Transaction } from '../transaction/transaction';
import { Settings } from '../blockchain.settings';
import * as crypto from 'crypto-browserify';

export class Block {
  private _blockHash: string;
  private _isValid: boolean;
  private _nonce: number;

  public transactions: Transaction[];
  public readonly creationDate: Date;
  public previousBlockHash: string;
  public readonly signature: string;
  public nextBlock: Block;

  public get blockHash(): string {
    return this._blockHash;
  }
  public get isValid(): boolean {
    return this._isValid;
  }
  public get nonce(): number {
    return this._nonce;
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
    this._blockHash = this.mine();
    this._isValid = true;
  }

  public calculateBlockHash(referenceBlockHash?: string): string {
    const referenceBlockHashToCalculate = referenceBlockHash
      ? referenceBlockHash
      : this.previousBlockHash;
    return crypto
      .createHash(Settings.hashAlgorithm)
      .update(this.calculateMerkleRootHash())
      .update(referenceBlockHashToCalculate)
      .update(this.creationDate.toDateString())
      .update(this._nonce.toString())
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

  private mine(): string {
    this._nonce = -1;
    let minedHash = '';
    const searchPattern = Settings.difficultyPattern();
    do {
      this._nonce++;
      minedHash = this.calculateBlockHash();
    } while (!(this._nonce > Settings.maximumNonce || minedHash.startsWith(searchPattern)));
    return minedHash;
  }

  public checkValidity(previousBlockHashToCheck?: string): boolean {
    const blockHashToCheck = this.calculateBlockHash(previousBlockHashToCheck);

    this._isValid = this._blockHash === blockHashToCheck;

    if (previousBlockHashToCheck) {
      this.previousBlockHash = previousBlockHashToCheck;
    }

    if (this.nextBlock) {
      return this.nextBlock.checkValidity(blockHashToCheck);
    }

    return this._isValid;
  }
}
