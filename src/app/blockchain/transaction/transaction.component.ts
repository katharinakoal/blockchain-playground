import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from './transaction';
import { WordArray } from 'crypto-js';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @Input() transaction: Transaction;
  @Input() index: number;
  @Output() hashChange = new EventEmitter<WordArray>();

  public hash: string;
  constructor() {}

  ngOnInit() {
    this.updateTransactionHash();
  }

  public updateTransactionHash(): void {
    const hashObject = this.transaction.calculateTransactionHash(this.index.toString());
    this.hash = hashObject.toString();
    this.hashChange.emit(hashObject);
  }
}
