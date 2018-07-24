import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InewComponent } from './inew.component';

describe('InewComponent', () => {
  let component: InewComponent;
  let fixture: ComponentFixture<InewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
