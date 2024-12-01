import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PepcalToolComponent } from './pepcal-tool.component';

describe('PepcalToolComponent', () => {
  let component: PepcalToolComponent;
  let fixture: ComponentFixture<PepcalToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PepcalToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PepcalToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
