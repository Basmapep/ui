import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSequenceComponent } from './selected-sequence.component';

describe('SelectedSequenceComponent', () => {
  let component: SelectedSequenceComponent;
  let fixture: ComponentFixture<SelectedSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedSequenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
