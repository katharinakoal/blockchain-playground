import { Component, OnInit } from '@angular/core';
import { Settings } from './blockchain.settings';
import { TransactionPool } from './transaction-pool';
import { Transaction } from './transaction/transaction';
import { Block } from './block/block';
import { Chain } from './chain/chain';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent implements OnInit {
  public blockchain: Chain;
  private transactionPool: TransactionPool<Transaction>;

  constructor() {
    this.blockchain = new Chain();
    // Build some sample transactions and populate pool
    this.transactionPool = new TransactionPool<Transaction>(
      Array.apply(null, { length: 20 }).map(_ => new Transaction())
    );
  }

  ngOnInit() {
    this.populateTestChain();
  }

  public addBlock() {
    this.populateTestChain();
  }

  private populateTestChain(): void {
    if (this.transactionPool.hasTransactions(Settings.transactionsPerBlock)) {
      this.blockchain.acceptBlock(
        new Block(this.transactionPool.getTransactions(Settings.transactionsPerBlock))
      );
      console.log('new block mined');
    }
  }
}
