import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AeditComponent } from './aedit.component';

describe('AeditComponent', () => {
  let component: AeditComponent;
  let fixture: ComponentFixture<AeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
