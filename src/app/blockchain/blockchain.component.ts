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

  constructor() {
    this.blockchain = new Chain();
    this.populateTestChain();
  }

  ngOnInit() {}

  private populateTestChain(): void {
    // Build some sample transactions and populate pool
    const transactionPool = new TransactionPool<Transaction>(
      Array.apply(null, { length: 16 }).map(_ => new Transaction())
    );

    while (transactionPool.hasTransactions(Settings.transactionsPerBlock)) {
      const newBlock = new Block(transactionPool.getTransactions(Settings.transactionsPerBlock));
      newBlock.chainWith(null);
      this.blockchain.blocks.push(newBlock);
    }
  }
}
