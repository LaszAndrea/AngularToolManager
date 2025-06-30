import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyToolTypesComponent } from './modify-tool-types-component';

describe('ModifyToolTypesComponent', () => {
  let component: ModifyToolTypesComponent;
  let fixture: ComponentFixture<ModifyToolTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyToolTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyToolTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
