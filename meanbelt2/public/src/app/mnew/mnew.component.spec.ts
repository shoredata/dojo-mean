import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnewComponent } from './mnew.component';

describe('MnewComponent', () => {
  let component: MnewComponent;
  let fixture: ComponentFixture<MnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
