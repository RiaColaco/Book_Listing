import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableBooklistingComponent } from './reusable-booklisting.component';

describe('ReusableBooklistingComponent', () => {
  let component: ReusableBooklistingComponent;
  let fixture: ComponentFixture<ReusableBooklistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReusableBooklistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableBooklistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
