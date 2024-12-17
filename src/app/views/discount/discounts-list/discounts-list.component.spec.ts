import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsListComponent } from './discounts-list.component';

describe('DiscountsListComponent', () => {
  let component: DiscountsListComponent;
  let fixture: ComponentFixture<DiscountsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountsListComponent]
    });
    fixture = TestBed.createComponent(DiscountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
