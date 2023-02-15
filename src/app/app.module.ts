import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppTableComponent } from './app-table/app-table.component';
import { MaskPasswordPipe } from './mask-password.pipe';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([{ path: '', component: AppTableComponent }]),
  ],
  providers: [DialogService],
  declarations: [
    AppComponent,
    AppTableComponent,
    MaskPasswordPipe,
    DialogComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
