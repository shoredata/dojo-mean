import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnewComponent } from './qnew.component';

describe('QnewComponent', () => {
  let component: QnewComponent;
  let fixture: ComponentFixture<QnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
