import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReditComponent } from './redit.component';

describe('ReditComponent', () => {
  let component: ReditComponent;
  let fixture: ComponentFixture<ReditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
