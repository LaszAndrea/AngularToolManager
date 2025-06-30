import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToolComponent } from './add-tool-component';

describe('AddToolComponent', () => {
  let component: AddToolComponent;
  let fixture: ComponentFixture<AddToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
