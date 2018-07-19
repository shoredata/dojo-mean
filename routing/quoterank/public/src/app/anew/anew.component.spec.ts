import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnewComponent } from './anew.component';

describe('AnewComponent', () => {
  let component: AnewComponent;
  let fixture: ComponentFixture<AnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
