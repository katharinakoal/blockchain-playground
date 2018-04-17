import { Component, OnInit, Input } from '@angular/core';
import { Block } from '../block/block';

@Component({
  selector: 'app-chain',
  templateUrl: './chain.component.html',
  styleUrls: ['./chain.component.scss']
})
export class ChainComponent implements OnInit {
  @Input() block: Block;

  constructor() {}

  ngOnInit() {}
}
