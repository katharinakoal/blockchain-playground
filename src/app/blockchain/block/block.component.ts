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
    this.transactions = new Array<Transaction>(
      new Transaction('a'),
      new Transaction('b'),
      new Transaction('c')
    );
  }

  ngOnInit() {}
}
