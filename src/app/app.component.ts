import { Component, OnInit } from '@angular/core';
import MerkleTools from '@settlemint/merkle-tools';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blockchain playground';

  mroot: string;

  constructor() {}

  ngOnInit() {
    const merkleTools = new MerkleTools(); // no options, defaults to sha-256 hash type

    merkleTools.addLeaves(['x', 'y', 'z'], true); // we must indicate these values need to be hashed

    merkleTools.makeTree();

    const merkleRoot = merkleTools.getMerkleRoot();

    const proof0 = merkleTools.getProof(0);
    const proof1 = merkleTools.getProof(1);
    const proof2 = merkleTools.getProof(2);

    console.log(proof0);

    merkleTools.resetTree(); // use this when done with this tree and you intend on creating a new one
  }
}
