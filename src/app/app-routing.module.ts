import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const blockChainModule = './blockchain/blockchain.module#BlockchainModule';

const routes: Routes = [
  {
    path: 'blockchain',
    loadChildren: blockChainModule
  },
  { path: '', redirectTo: 'blockchain', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
