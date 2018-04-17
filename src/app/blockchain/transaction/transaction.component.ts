import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from './transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @Input() transaction: Transaction;
  @Input() index: number;
  @Output() hashChange = new EventEmitter<string>();

  public hash: string;
  constructor() {}

  ngOnInit() {
    this.updateTransactionHash();
  }

  public updateTransactionHash(): void {
    const dirty = !!this.hash;
    this.hash = this.transaction.calculateTransactionHash();
    if (dirty) this.hashChange.emit(this.hash);
  }
}
