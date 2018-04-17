import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction/transaction';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  public transactions: Array<Transaction>;

  constructor() {
    this.transactions = Array.apply(null, { length: 4 }).map(_ => new Transaction());
  }

  ngOnInit() {}
}
