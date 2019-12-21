import { async, TestBed } from '@angular/core/testing';
import { WebCompsModule } from './web-comps.module';

describe('WebCompsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebCompsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebCompsModule).toBeDefined();
  });
});
