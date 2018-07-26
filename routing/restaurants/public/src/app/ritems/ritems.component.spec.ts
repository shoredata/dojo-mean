import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RitemsComponent } from './ritems.component';

describe('RitemsComponent', () => {
  let component: RitemsComponent;
  let fixture: ComponentFixture<RitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
