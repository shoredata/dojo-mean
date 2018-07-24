import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnewComponent } from './pnew.component';

describe('PnewComponent', () => {
  let component: PnewComponent;
  let fixture: ComponentFixture<PnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
