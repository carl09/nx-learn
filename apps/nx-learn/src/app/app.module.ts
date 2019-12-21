import { WebCompsModule } from '@nx-learn/web-comps';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebCompsModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
