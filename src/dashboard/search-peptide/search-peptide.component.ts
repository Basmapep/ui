import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeptideService } from 'src/services/peptide.service';

@Component({
  selector: 'app-search-peptide',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-peptide.component.html',
  styleUrls: ['./search-peptide.component.scss']
})
export class SearchPeptideComponent implements OnInit {


  category: any = [
    'Accession', 'Score', 'Peptide sequence', 'Peptide modification', 'Peptide Length', 'Peptide Mass'
  ]
  public category_Value: any;
  peptform: FormGroup;
  public Search_Array: any[] = [];
  constructor(private route: Router, private fb: FormBuilder, private peptide: PeptideService) {
    this.peptform = this.fb.group({
      category_val: ['0', Validators.required],
      search: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    // AOS.init({ disable: 'mobile' });//AOS - 2
    // AOS.refresh();
  }

  Select_Category(category: any) {
    this.category_Value = category.target.value
  }

  gotopeptide() {
    const search = this.peptform.value.search
    if (search != '' && this.category_Value != undefined && this.category_Value != 0) {
      this.route.navigate(['/components/peptide', { params: this.category_Value, val: search }])
    }
  }


}
