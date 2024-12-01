import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeptideComponent } from './peptide.component';

describe('PeptideComponent', () => {
  let component: PeptideComponent;
  let fixture: ComponentFixture<PeptideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeptideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeptideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
