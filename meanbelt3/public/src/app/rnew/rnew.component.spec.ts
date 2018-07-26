import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnewComponent } from './rnew.component';

describe('RnewComponent', () => {
  let component: RnewComponent;
  let fixture: ComponentFixture<RnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
