import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingAllComponent } from './listing-all.component';

describe('ListingAllComponent', () => {
  let component: ListingAllComponent;
  let fixture: ComponentFixture<ListingAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
