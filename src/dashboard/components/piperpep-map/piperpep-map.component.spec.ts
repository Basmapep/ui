import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiperpepMapComponent } from './piperpep-map.component';

describe('PiperpepMapComponent', () => {
  let component: PiperpepMapComponent;
  let fixture: ComponentFixture<PiperpepMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiperpepMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiperpepMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
