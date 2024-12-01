import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeptideService } from 'src/services/peptide.service';

@Component({
  selector: 'app-pepcal-tool',
  templateUrl: './pepcal-tool.component.html',
  styleUrls: ['./pepcal-tool.component.scss']
})
export class PepcalToolComponent implements OnInit {
  public category_Value: any;
  peptform: FormGroup;
  public Search_Array: any[] = [];

  category: any = [
    'Accession', 'Score', 'Peptide sequence', 'Peptide modification', 'Peptide Length', 'Peptide Mass'
  ]

  nTerminus:any=[
    "Acetyl","Biotin","5-FAM","5-TAMRA","DABCYL","Fmoc","Pyr","Myr","z","DOTA"
  ]
  cTerminus:any=[
    "Amide","Aldehyde","AFC","CMK","EDANS"
  ]

  aaCode:any=[
    "single-letter","triple-letter"
  ]
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private peptide: PeptideService
  ) {
    this.peptform = this.fb.group({
      nTerminus:['0',Validators.required],
      cTerminus:['0',Validators.required],
      aaCodeUsed:['0',Validators.required],
      sequence: ['', Validators.required],
    })
  }


  ngOnInit(): void {
  }

  Select_Category(category: any) {
    this.category_Value = category.target.value
  }


  gotopeptide() {

  }
}
