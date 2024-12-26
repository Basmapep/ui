import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPeptideComponent } from './search-peptide.component';

describe('SearchPeptideComponent', () => {
  let component: SearchPeptideComponent;
  let fixture: ComponentFixture<SearchPeptideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPeptideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPeptideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
