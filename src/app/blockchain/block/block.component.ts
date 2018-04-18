import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../transaction/transaction';
import { Block } from './block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() block: Block;
  @Output() hashChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  updateBlockHash() {
    this.block.checkValidity();
    this.hashChange.emit(this.block.blockHash);
  }
}
