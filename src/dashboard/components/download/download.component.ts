import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PeptideService } from 'src/services/peptide.service';
import { ngxCsv } from 'ngx-csv';


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  category: any = [
    'Accession', 'Score', 'Peptide sequence', 'Peptide modification', 'Peptide Length', 'Peptide Mass'
  ];
  isLoading: boolean = true;

  @ViewChild('element') elements!: QueryList<ElementRef>;

  score: any = [
    { name: 'Greater than', symbol: '>' },
    { name: 'Lesser than', symbol: '<' },
    { name: 'Equal to', symbol: '==' },
    { name: 'Greater than or equal to', symbol: '>=' },
    { name: 'Lesser than or equal to', symbol: '<=' },
  ]

  title: any = '';
  displayedColumns = ['accession', 'description', 'peptideSeq', 'peptideSeqLength', 'score', 'avgMass', 'peptideModification'];
  download_Form!: FormGroup;
  public score_result: any = '';
  showScore: { [key: number]: boolean } = {};
  public symbolData: any = '';
  symbolName: any = '';
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public category_Value: any;

  constructor(private route: ActivatedRoute,
    private peptide: PeptideService,
    private fb: FormBuilder
  ) {
    this.download_Form = this.fb.group({
      skills: this.fb.array([])
    });

    this.addSkills();
  }
  ngOnInit(): void {

  }
  get Download_skills(): FormArray {
    return this.download_Form.get('skills') as FormArray;
  }
  addSkills() {
    this.Download_skills.push(
      this.fb.group({
        category_Pep: ['0', Validators.required],
        search_Pep: ['', Validators.required],
        symbols_Pep: [''],
        // symbols_Pep: [this.score[0]?.name],
        symbols_pep1: ['']
      })
    )

  }

  removeSkills(id: any) {
    if (id > 0) {
      this.Download_skills.removeAt(id)
      delete this.showScore[id];
    }
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // this.elements.forEach((element) => {
    //   const width = element.nativeElement.getBoundingClientRect().width;
    // });
  }


  Select_Symbol(event: any) {
    let selected_Score = this.score.filter((item: any) => item.name == event.target.value)
    this.symbolData = selected_Score[0].symbol
    this.symbolName = selected_Score[0].name
  }

  Select_Category(category: any, index: any, element: HTMLElement) {
    if (category.target.value != 0 && category.target.value != undefined) {
      this.score_result = category.target.value;
      // this.showScore[index] = category.target.value === 'Score';

      if (category.target.value === 'Score' || category.target.value == 'Peptide Length' || category.target.value == 'Peptide Mass') {
        this.showScore[index] = true;
      } else {
        this.showScore[index] = false;
        this.Download_skills.controls[0].value.symbols_Pep = '';
        this.symbolData = '';
        this.symbolName = '';
      }
      this.category_Value = category.target.value
    }
  }

  getTableData() {
    let tmdata = []
    if (this.Download_skills.valid) {
      this.isLoading = true;
      tmdata.push(this.Download_skills.controls)
      tmdata.forEach(element => {
        this.peptide.getPeptide(element[element.length - 1].value.category_Pep, element[element.length - 1].value.search_Pep).subscribe((data: any[]) => {
          if (data.length > 0) {
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
            if (this.score_result == 'Score') {
              if (this.symbolData == '>') {
                const filteredResults = data.filter(ite => ite.score > element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              }
              else if (this.symbolData == '<') {
                const filteredResults = data.filter(ite => ite.score < element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              } else if (this.symbolData == '==') {
                const filteredResults = data.filter(ite => ite.score == element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              } else if (this.symbolData == '>=') {
                const filteredResults = data.filter(ite => ite.score >= element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              } else if (this.symbolData == '<=') {
                const filteredResults = data.filter(ite => ite.score <= element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              }
            }
            else if (this.score_result == 'Peptide Length') {
              if (this.symbolData == '>') {
                const filteredResults = data.filter(ite => ite.peptideSeqLength > element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              }
              else if (this.symbolData == '<') {
                const filteredResults = data.filter(ite => ite.peptideSeqLength < element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              } else if (this.symbolData == '==') {
                const filteredResults = data.filter(ite => ite.peptideSeqLength == element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              } else if (this.symbolData == '>=') {
                const filteredResults = data.filter(ite => ite.peptideSeqLength >= element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              } else if (this.symbolData == '<=') {
                const filteredResults = data.filter(ite => ite.peptideSeqLength <= element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              }
            }
            else if (this.score_result == 'Peptide Mass') {
              if (this.symbolData == '>') {
                const filteredResults = data.filter(ite => ite.avgMass > element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              }
              else if (this.symbolData == '<') {
                const filteredResults = data.filter(ite => ite.avgMass < element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              } else if (this.symbolData == '==') {
                const filteredResults = data.filter(ite => ite.avgMass == element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              } else if (this.symbolData == '>=') {
                const filteredResults = data.filter(ite => ite.avgMass >= element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              } else if (this.symbolData == '<=') {
                const filteredResults = data.filter(ite => ite.avgMass <= element[element.length - 1].value.search_Pep);
                this.dataSource.data = filteredResults;
              }
            }

            else {
              this.dataSource.data = data;
              setTimeout(() => {
                this.isLoading = false;
              }, 500);
            }



          } else {
            this.dataSource.data = []
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
          }
        })
      });
    }

  }

  downloadCsv() {
    let filterData = this.dataSource.data.map(item => ({
      accession: item.accession,
      description: item.description,
      peptideSeq: item.peptideSeq,
      peptideSeqLength: item.peptideSeqLength,
      score: item.score,
      falsePositiveRate: item.falsePositiveRate,
      avgMass: item.avgMass,
      peptideModification: item.peptideModification
    }))

    const options = {
      headers: ['Accession', 'Description', 'Peptide sequence', 'Peptide Length', 'score', 'False Positive Rate', 'AvgMass', 'Peptide Modification']
    };
    new ngxCsv(filterData, 'CSV Report', options);

  }

}
