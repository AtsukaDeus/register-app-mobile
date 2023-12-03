import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistencesPageRoutingModule } from './assistences-routing.module';

import { AssistencesPage } from './assistences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistencesPageRoutingModule
  ],
  declarations: [AssistencesPage]
})
export class AssistencesPageModule {}
