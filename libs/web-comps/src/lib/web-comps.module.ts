import { NgModule, ModuleWithProviders, APP_INITIALIZER, NgZone } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { DIRECTIVES } from './stencal/proxies-list';
import { initialize } from './initialize';
// import { initialize } from './initialize';

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
  
})
export class WebCompsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WebCompsModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initialize,
          multi: true,
          deps: [DOCUMENT, NgZone]
        }
      ]
    };
  }
}
