import { Component, OnInit, Input } from '@angular/core';
import { Chain } from './chain';

@Component({
  selector: 'app-chain',
  templateUrl: './chain.component.html',
  styleUrls: ['./chain.component.scss']
})
export class ChainComponent implements OnInit {
  @Input() chain: Chain;

  constructor() {}

  ngOnInit() {}
}
