import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToolTypesComponent } from './add-tool-types-component';

describe('AddToolTypesComponent', () => {
  let component: AddToolTypesComponent;
  let fixture: ComponentFixture<AddToolTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToolTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToolTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
