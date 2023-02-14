import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppTableComponent } from './app-table/app-table.component';
import { MaskPasswordPipe } from './mask-password.pipe';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([{ path: '', component: AppTableComponent }]),
  ],
  declarations: [AppComponent, AppTableComponent, MaskPasswordPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
