import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionComponent } from './transaction/transaction.component';
import { BlockComponent } from './block/block.component';
import { ChainComponent } from './chain/chain.component';
import { BlockchainComponent } from './blockchain.component';

const routes: Routes = [
  {
    path: '',
    component: BlockchainComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [TransactionComponent, BlockComponent, ChainComponent, BlockchainComponent]
})
export class BlockchainModule {}
