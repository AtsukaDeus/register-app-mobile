import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistencesPage } from './assistences.page';

const routes: Routes = [
  {
    path: '',
    component: AssistencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistencesPageRoutingModule {}
