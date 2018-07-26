import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RlistComponent } from './rlist.component';

describe('RlistComponent', () => {
  let component: RlistComponent;
  let fixture: ComponentFixture<RlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
