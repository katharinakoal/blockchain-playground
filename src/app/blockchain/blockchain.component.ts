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
  constructor() {
    this.populateTestChain();
  }

  ngOnInit() {}

  private populateTestChain(): void {
    // Build some sample transactions and populate pool
    const transactionPool = new TransactionPool<Transaction>(
      Array.apply(null, { length: 4 }).map(_ => new Transaction())
    );

    const block = new Block();
    block.addTransactions(
      transactionPool.getTransaction(),
      transactionPool.getTransaction(),
      transactionPool.getTransaction(),
      transactionPool.getTransaction()
    );
    block.chainWith(null);

    console.log(block);
  }
}
