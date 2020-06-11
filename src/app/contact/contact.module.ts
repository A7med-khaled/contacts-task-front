import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '**',
    component: ContactListComponent
  }
]
@NgModule({
  declarations: [ContactListComponent, ContactCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ContactModule { }
