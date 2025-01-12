import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PeptideService } from 'src/services/peptide.service';


@Component({
  selector: 'app-peptide',
  templateUrl: './peptide.component.html',
  styleUrls: ['./peptide.component.scss']
})

export class PeptideComponent implements OnInit {
  symbolName: any = '';
  showScore: boolean = false;
  public symbolData: any = '==';

  score: any = [
    { name: 'Greater than', symbol: '>', comparison: 'greaterthan' },
    { name: 'Lesser than', symbol: '<', comparison: 'lesserthan' },
    { name: 'Equal to', symbol: '==', comparison: 'equal' },
    { name: 'Greater than or equal to', symbol: '>=', comparison: 'greterthanequal' },
    { name: 'Lesser than or equal to', symbol: '<=', comparison: 'lesserthanequal' },
    // { name: 'Range' },
  ]

  category: any = [
    'Accession', 'Score', 'Peptide sequence', 'Peptide Length', 'Peptide Mass', 'Peptide modification'
  ]; //'Peptide Length', 'Peptide Mass'
  title: any = '';
  public category_Value: any;
  displayedColumns = ['S.No', 'accession', 'score', 'peptideSeq', 'action']; //'peptidelength', 'avgMass', 'variety',
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  peptide_Form!: FormGroup;
  isLoading: boolean = false;

  selectedCategory: string = '';
  categoryToColumnsMap: { [key: string]: { columns: string[], headers: string[] } } = {
    Accession: { columns: ['position', 'accession', 'peptideSeq', 'action'], headers: ['S.No', 'Accession', 'Peptide Sequence', 'Details'] },
    Score: { columns: ['position', 'accession', 'score', 'peptideSeq', 'action'], headers: ['S.No', 'Accession', 'Score', 'Peptide Sequence', 'Details'] },
    'Peptide sequence': { columns: ['position', 'accession', 'peptideSeq', 'action'], headers: ['S.No', 'Accession', 'Peptide Sequence', 'Details'] },
    'Peptide modification': { columns: ['position', 'peptideModification', 'action'], headers: ['S.No', 'Peptide Modification', 'Details'] },
    'Peptide Length': { columns: ['position', 'accession', 'peptideSeq', 'peptideSeqLength', 'action'], headers: ['S.No', 'Accession', 'Peptide Sequence', 'Peptide Length', 'Details'] },
    'Peptide Mass': { columns: ['position', 'accession', 'peptideSeq', 'avgMass', 'action'], headers: ['S.No', 'Accession', 'Peptide Sequence', 'Peptide Mass', 'Details'] }
  };
  displayedHeaders: string[] = [];
  isReadonly: boolean = true;
  constructor(private route: ActivatedRoute,
    private peptide: PeptideService,
    private fb: FormBuilder,
    private router: Router,
    private toster: ToastrService) {
    this.peptide_Form = this.fb.group({
      categ_pep: ['0', Validators.required],
      search_pep: ['', Validators.required],
      symbols_Pep: [this.score[0].name],
      comparisonValue: ['']
    })

    if (this.route.snapshot.paramMap.get('id') != null && this.route.snapshot.paramMap.get('category') && this.route.snapshot.paramMap.get('comparison') && this.route.snapshot.paramMap.get('compareName')) {
      this.isReadonly = false;
      const params = this.route.snapshot.paramMap.get('id');
      let categoryValue = this.route.snapshot.paramMap.get('category');
      let comparison = this.route.snapshot.paramMap.get('comparison');
      let compareName = this.route.snapshot.paramMap.get('compareName');
      this.peptide_Form.get('search_pep')?.setValue(params)
      this.peptide_Form.get('categ_pep')?.setValue(categoryValue)
      this.peptide_Form.get('symbols_Pep')?.setValue(compareName);
      this.peptide_Form.get('comparisonValue')?.setValue(comparison);
      this.Select_Category(categoryValue)
      this.getAnotherData();
    }

  }



  ngOnInit() {

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  Select_Category(category: any) {
    this.selectedCategory = category
    this.isReadonly = false;
    if (category === 'Score' || category == 'Peptide Length' || category == 'Peptide Mass') {
      this.showScore = true;
      // this.peptide_Form.get('comparisonValue')?.setValue(this.score[0].comparison)
      // this.peptide_Form.get('symbols_Pep')?.setValue(this.score[0].name)
    } else {
      this.showScore = false;
      this.symbolName = '';
      this.peptide_Form.get('comparisonValue')?.setValue('equal');
    }
    const mapping = this.categoryToColumnsMap[this.selectedCategory];
    if (mapping) {
      this.dataSource.data = []
      this.displayedColumns = mapping.columns;
      this.displayedHeaders = mapping.headers;
    } else {
      this.displayedColumns = [];
      this.displayedHeaders = [];
    }
  }
  Select_Symbol(event: any) {
    let selected_Score = this.score.filter((item: any) => item.name == event.target.value)
    this.symbolData = selected_Score[0].symbol
    this.peptide_Form.get('comparisonValue')?.setValue(selected_Score[0].comparison)
    this.symbolName = selected_Score[0].name
  }

  updateDisplayedColumns(category: any) {
    this.selectedCategory = category.target.value
    this.isReadonly = false;
    this.peptide_Form.get('search_pep')?.setValue('')
    if (category.target.value === 'Score' || category.target.value == 'Peptide Length' || category.target.value == 'Peptide Mass') {
      this.showScore = true;
      this.peptide_Form.get('comparisonValue')?.setValue(this.score[0].comparison)
      this.peptide_Form.get('symbols_Pep')?.setValue(this.score[0].name)
    } else {
      this.showScore = false;
      this.symbolName = '';
      this.peptide_Form.get('comparisonValue')?.setValue('equal');
    }
    const mapping = this.categoryToColumnsMap[this.selectedCategory];
    if (mapping) {
      this.dataSource.data = []
      this.displayedColumns = mapping.columns;
      this.displayedHeaders = mapping.headers;
    } else {
      this.displayedColumns = [];
      this.displayedHeaders = [];
    }
  }

  getAnotherData() {
    if (this.peptide_Form.valid) {
      this.isLoading = true;
      if (this.peptide_Form.value.categ_pep != null && this.peptide_Form.value.search_pep != null) {
        const search = this.peptide_Form.value.search_pep;
        this.peptide.getPeptide(this.peptide_Form.value.categ_pep, this.peptide_Form.value.search_pep.trim(), this.peptide_Form.value.comparisonValue).subscribe((data: any[]) => {
          if (data.length > 0) {
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
            data.map((ite: any, i: any) => {
              ite.action = "action",
                ite.position = i + 1
            });
            // if (this.peptide_Form.value.categ_pep == 'Score') {
            //   // this.dataSource.data = data.filter(item => item.score == this.peptide_Form.value.search_pep)
            //   if (this.symbolData == '>') {
            //     const filteredResults = data.filter(ite => ite.score > search);
            //     this.dataSource.data = filteredResults;
            //    
            //     // this.allDataTable = filteredResults;
            //   }
            //   else if (this.symbolData == '<') {
            //     const filteredResults = data.filter(ite => ite.score < search);
            //     this.dataSource.data = filteredResults;
            //     // this.allDataTable = filteredResults;
            //   } else if (this.symbolData == '==') {
            //     const filteredResults = data.filter(ite => ite.score == search);
            //     this.dataSource.data = filteredResults;
            //     // this.allDataTable = filteredResults;
            //   } else if (this.symbolData == '>=') {
            //     const filteredResults = data.filter(ite => ite.score >= search);
            //     this.dataSource.data = filteredResults;
            //     // this.allDataTable = filteredResults;
            //   } else if (this.symbolData == '<=') {
            //     const filteredResults = data.filter(ite => ite.score <= search);
            //     this.dataSource.data = filteredResults;
            //     // this.allDataTable = filteredResults;
            //   }
            // }
            // else if (this.peptide_Form.value.categ_pep == 'Peptide Length') {
            //   // this.dataSource.data = data.filter(item => item.peptideSeqLength == this.peptide_Form.value.search_pep)
            //   if (this.symbolData == '>') {
            //     const filteredResults = data.filter(ite => ite.peptideSeqLength > search);
            //    
            //    
            //    
            //     this.dataSource.data = filteredResults;
            //   }
            //   else if (this.symbolData == '<') {
            //     const filteredResults = data.filter(ite => ite.peptideSeqLength < search);
            //     this.dataSource.data = filteredResults;
            //   } else if (this.symbolData == '==') {
            //     const filteredResults = data.filter(ite => ite.peptideSeqLength == search);
            //     this.dataSource.data = filteredResults;
            //   } else if (this.symbolData == '>=') {
            //     const filteredResults = data.filter(ite => ite.peptideSeqLength >= search);
            //     this.dataSource.data = filteredResults;
            //   } else if (this.symbolData == '<=') {
            //     const filteredResults = data.filter(ite => ite.peptideSeqLength <= search);
            //     this.dataSource.data = filteredResults;
            //   }
            // }
            // else if (this.peptide_Form.value.categ_pep == 'Peptide Mass') {
            //   // this.dataSource.data = data.filter(item => item.avgMass == this.peptide_Form.value.search_pep)
            //   if (this.symbolData == '>') {
            //     const filteredResults = data.filter(ite => ite.avgMass > search);
            //     this.dataSource.data = filteredResults;
            //   }
            //   else if (this.symbolData == '<') {
            //     const filteredResults = data.filter(ite => ite.avgMass < search);
            //     this.dataSource.data = filteredResults;
            //   } else if (this.symbolData == '==') {
            //     const filteredResults = data.filter(ite => ite.avgMass == search);
            //     this.dataSource.data = filteredResults;
            //   } else if (this.symbolData == '>=') {
            //     const filteredResults = data.filter(ite => ite.avgMass >= search);
            //     this.dataSource.data = filteredResults;
            //   } else if (this.symbolData == '<=') {
            //     const filteredResults = data.filter(ite => ite.avgMass <= search);
            //     this.dataSource.data = filteredResults;
            //   }
            // }
            // else {
            this.dataSource.data = data;
            // }
          } else {
            this.dataSource.data = [];
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
          }
        }, (error) => {
          this.toster.error(error.message)
        })
      }
    }
  }
  showSelected: boolean = false
  goToValue(element: any) {
    this.router.navigate(['components/select-Sequence',
      {
        id: this.peptide_Form.get('search_pep')?.value,
        category: this.peptide_Form.value.categ_pep,
        comparison: this.peptide_Form.get('comparisonValue')?.value,
        compareName: this.peptide_Form.get('symbols_Pep')?.value
      }])
    this.peptide.setSequenceDate(element)

    // this.getAllSequenceData(element);
  }

  tabelData: any[] = [];
  getAllSequenceData(element: any) {
    this.tabelData = []
    this.peptide.getSequenceData().subscribe((result: any) => {
      this.tabelData.push(result)
      this.showSelected = true;
    })
  }

  backToSearch() {
    this.showSelected = false;
  }
}
