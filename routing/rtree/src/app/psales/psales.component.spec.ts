import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsalesComponent } from './psales.component';

describe('PsalesComponent', () => {
  let component: PsalesComponent;
  let fixture: ComponentFixture<PsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
