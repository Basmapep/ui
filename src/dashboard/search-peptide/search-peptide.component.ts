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
  symbolName: any = '';
  showScore: boolean = false;
  public symbolData: any = '';

  score: any = [
    { name: 'Greater than', symbol: '>' },
    { name: 'Lesser than', symbol: '<' },
    { name: 'Equal to', symbol: '==' },
    { name: 'Greater than or equal to', symbol: '>=' },
    { name: 'Lesser than or equal to', symbol: '<=' },
    { name: 'Range' },
  ]
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
   
    if (category.target.value === 'Score' || category.target.value == 'Peptide Length' || category.target.value == 'Peptide Mass') {
      this.showScore = true;
    } else {
      this.showScore = false;
      this.symbolData = '';
      this.symbolName = '';
    }
  }
  Select_Symbol(event: any) {
    let selected_Score = this.score.filter((item: any) => item.name == event.target.value)
    this.symbolData = selected_Score[0].symbol
    // this.download_Form.get('skills')?.value
    
    // this.download_Form.get('skills')?.value.forEach((ite: any) => {
    //   ite.symbol = selected_Score[0].symbol
    // })
    this.symbolName = selected_Score[0].name
  }
  gotopeptide() {
    const search = this.peptform.value.search
    if (search != '' && this.category_Value != undefined && this.category_Value != 0) {
      this.route.navigate(['/components/peptide', { params: this.category_Value, val: search }])
    }
  }


}
