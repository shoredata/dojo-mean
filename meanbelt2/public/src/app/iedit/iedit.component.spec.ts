import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IeditComponent } from './iedit.component';

describe('IeditComponent', () => {
  let component: IeditComponent;
  let fixture: ComponentFixture<IeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
