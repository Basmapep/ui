import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlastBasmaComponent } from './blast-basma.component';

describe('BlastBasmaComponent', () => {
  let component: BlastBasmaComponent;
  let fixture: ComponentFixture<BlastBasmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlastBasmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlastBasmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
