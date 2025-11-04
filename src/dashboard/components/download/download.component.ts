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
  ]; //'Peptide modification', 'Peptide Length', 'Peptide Mass'
  isLoading: boolean = false;

  @ViewChild('element') elements!: QueryList<ElementRef>;

  score: any = [
    { name: 'Greater than', symbol: '>', comparison: 'greaterthan' },
    { name: 'Lesser than', symbol: '<', comparison: 'lesserthan' },
    { name: 'Equal to', symbol: '==', comparison: 'equal' },
    { name: 'Greater than or equal to', symbol: '>=', comparison: 'greaterthanequal' },
    { name: 'Lesser than or equal to', symbol: '<=', comparison: 'lesserthanequal' },
  ]

  title: any = '';
  displayedColumns = ['position', 'accession', 'peptideSeq', 'peptideSeqLength', 'score',];
  download_Form!: FormGroup; //'description', 'peptideSeqLength', 'variety', 'avgMass', 'peptideModification'
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
    private fb: FormBuilder,
  ) {
    this.download_Form = this.fb.group({
      skills: this.fb.array([]),
      comparisonValue: ['']
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
        search_Pep: ['', Validators.required], //, Validators.pattern(/^\S*$/)
        symbols_Pep: [''],
        symbol: [''],
        symbols_pep1: [''],
        // comparisonValue: ['']
      })
    )
  }

  removeSkills(id: any) {
    if (id > 0) {
      this.Download_skills.removeAt(id)
      delete this.showScore[id];
    }
  }

  currentPage = 0; // Default page index
  pageSize = 10; // Page size (update as per your setup)

  // Update the current page when the page changes
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  Select_Symbol(event: any) {
    let selected_Score = this.score.filter((item: any) => item.name == event.target.value)
    this.download_Form.get('comparisonValue')?.setValue(selected_Score[0].comparison)
    this.symbolData = selected_Score[0].symbol
    this.download_Form.get('skills')?.value

    this.download_Form.get('skills')?.value.forEach((ite: any) => {
      ite.symbol = selected_Score[0].symbol
      // ite.comparisonValue = selected_Score[0].comparison
    })
    this.symbolName = selected_Score[0].name
  }

  Select_Category(category: any, index: any, element: HTMLElement) {
    if (category.target.value != 0 && category.target.value != undefined) {
      this.score_result = category.target.value;
      if (category.target.value === 'Score' || category.target.value == 'Peptide Length' || category.target.value == 'Peptide Mass') {
        this.showScore[index] = true;
        this.download_Form.get('comparisonValue')?.setValue(this.score[0].comparison)
        // this.Download_skills.at(0).patchValue({
        //   symbols_Pep: this.score[0].name
        // });
      } else {
        this.showScore[index] = false;
        this.Download_skills.controls[0].value.symbols_Pep = '';
        this.symbolData = '';
        this.symbolName = '';
        this.download_Form.get('comparisonValue')?.setValue('equal')
      }
      this.category_Value = category.target.value
    }
  }

  fields: any = {
    accession: '',
    score: '',
    age: '',
    sex: '',
  };

  allDataTable: any[] = [];
  searchValue: any;
  getTableData(index: any) {

    // 
    const symbols = this.download_Form.value.skills[index]

    if (this.Download_skills.controls.length == 1) {
      // this.Download_skills.controls[0].value.comparisonValue = 'equal';
      let tmdata: any = []
      if (this.Download_skills.valid) {
        this.isLoading = true;
        tmdata.push(this.Download_skills.controls, this.symbolData)
        const categ = this.download_Form.get('category_Pep')?.value
        tmdata.forEach((element: any) => {
          this.peptide.getPeptide(element[element.length - 1]?.value?.category_Pep,
            element[element.length - 1]?.value?.search_Pep.trim(),
            element[element.length - 1]?.value?.symbols_Pep).subscribe((data: any[]) => {

              if (data.length > 0) {

                setTimeout(() => {
                  this.isLoading = false;
                }, 500);

                // if (element[element.length - 1].value.category_Pep == 'Score') {
                //   if (tmdata[1] == '>') {
                //     const filteredResults = data.filter(ite => ite.score > element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;

                //     this.allDataTable = filteredResults;
                //   }
                //   else if (tmdata[1] == '<') {
                //     const filteredResults = data.filter(ite => ite.score < element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   } else if (tmdata[1] == '==') {
                //     const filteredResults = data.filter(ite => ite.score == element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   } else if (tmdata[1] == '>=') {
                //     const filteredResults = data.filter(ite => ite.score >= element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   } else if (tmdata[1] == '<=') {
                //     const filteredResults = data.filter(ite => ite.score <= element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   }
                // }
                // else if (element[element.length - 1].value.category_Pep == 'Peptide Length') {
                //   if (this.symbolData == '>') {
                //     const filteredResults = data.filter(ite => ite.peptideSeqLength > element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   }
                //   else if (this.symbolData == '<') {
                //     const filteredResults = data.filter(ite => ite.peptideSeqLength < element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   } else if (this.symbolData == '==') {
                //     const filteredResults = data.filter(ite => ite.peptideSeqLength == element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   } else if (this.symbolData == '>=') {
                //     const filteredResults = data.filter(ite => ite.peptideSeqLength >= element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   } else if (this.symbolData == '<=') {
                //     const filteredResults = data.filter(ite => ite.peptideSeqLength <= element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   }
                // }
                // else if (element[element.length - 1].value.category_Pep == 'Peptide Mass') {
                //   if (this.symbolData == '>') {
                //     const filteredResults = data.filter(ite => ite.avgMass > element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   }
                //   else if (this.symbolData == '<') {
                //     const filteredResults = data.filter(ite => ite.avgMass < element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   } else if (this.symbolData == '==') {
                //     const filteredResults = data.filter(ite => ite.avgMass == element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   } else if (this.symbolData == '>=') {
                //     const filteredResults = data.filter(ite => ite.avgMass >= element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   } else if (this.symbolData == '<=') {
                //     const filteredResults = data.filter(ite => ite.avgMass <= element[element.length - 1].value.search_Pep);
                //     this.dataSource.data = filteredResults;
                //     this.allDataTable = filteredResults;
                //   }
                // }

                // else {
                this.dataSource.data = data;
                // this.dataSource = new MatTableDataSource(data);
                this.allDataTable = data;
                setTimeout(() => {
                  this.isLoading = false;
                }, 500);
                // }



              } else {
                this.dataSource.data = []
                this.allDataTable = [];
                setTimeout(() => {
                  this.isLoading = false;
                }, 500);
              }
            })
        });
      }
    } else {
      if (this.score_result == 'Score') {
        this.isLoading = true;
        // let tmdata: any = []
        // tmdata.push(this.Download_skills.controls, ...this.symbolData)
        if (symbols.symbols_Pep == 'Greater than') {
          // tmdata.forEach((element: any) => {
          const filteredResults = this.allDataTable.filter((item: any) => {
            const score = parseFloat(item.score);
            return !isNaN(score) && score > symbols.search_Pep;
          });
          this.dataSource.data = filteredResults;
          // this.searchValue = element[element.length - 1].value.search_Pep;
          // this.dataSource.filter = this.searchValue.trim().toLowerCase();
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          // })


        }
        else if (symbols.symbols_Pep == 'Lesser than') {
          const filteredResults = this.allDataTable.filter((item: any) => {
            const score = parseFloat(item.score);
            return !isNaN(score) && score < symbols.search_Pep;
          });
          this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);

        } else if (symbols.symbols_Pep == 'Equal to') {
          const filteredResults = this.allDataTable.filter((item: any) => {
            const score = parseFloat(item.score);
            return !isNaN(score) && score == symbols.search_Pep;
          }); this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);

        } else if (symbols.symbols_Pep == 'Greater than or equal to') {
          const filteredResults = this.allDataTable.filter((item: any) => {
            const score = parseFloat(item.score);
            return !isNaN(score) && score >= symbols.search_Pep;
          }); this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);

        } else if (symbols.symbols_Pep == 'Lesser than or equal to') {
          const filteredResults = this.allDataTable.filter((item: any) => {
            const score = parseFloat(item.score);
            return !isNaN(score) && score <= symbols.search_Pep;
          }); this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      }

      else if (this.score_result == 'Peptide Length') {
        this.isLoading = true;
        // let tmdata: any = []
        // tmdata.push(this.Download_skills.controls, ...this.symbolData)
        if (symbols.symbols_Pep == 'Greater than') {
          // tmdata.forEach((element: any) => {
          const searchValue = Number(symbols.search_Pep); // Convert to number
          if (isNaN(searchValue)) {

            return;
          }

          const filteredResults = this.allDataTable.filter((item: any) => {
            const peptideSeqLength = Number(item.peptideSeqLength); // Convert to number
            if (isNaN(peptideSeqLength)) {

              return false; // Skip items where conversion fails
            }
            return peptideSeqLength > searchValue; // Apply the condition
          });
          this.dataSource.data = filteredResults
          // this.searchValue = element[element.length - 1].value.search_Pep;
          // this.dataSource.filter = this.searchValue.trim().toLowerCase();
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          // })
        }
        else if (symbols.symbols_Pep == 'Lesser than') {
          const filteredResults = this.allDataTable.filter(ite => ite.peptideSeqLength < symbols.search_Pep);
          this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);

        } else if (symbols.symbols_Pep == 'Equal to') {
          const filteredResults = this.allDataTable.filter(ite => ite.peptideSeqLength == symbols.search_Pep);
          this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);

        } else if (symbols.symbols_Pep == 'Greater than or equal to') {
          const filteredResults = this.allDataTable.filter(ite => ite.peptideSeqLength >= symbols.search_Pep);
          this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);

        } else if (symbols.symbols_Pep == 'Lesser than or equal to') {
          const filteredResults = this.allDataTable.filter(ite => ite.peptideSeqLength <= symbols.search_Pep);
          this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      }

      else if (this.score_result == 'Peptide Mass') {
        this.isLoading = true;
        // let tmdata: any = []
        // tmdata.push(this.Download_skills.controls, ...this.symbolData)
        if (symbols.symbols_Pep == 'Greater than') {
          // tmdata.forEach((element: any) => {
          const filteredResults = this.allDataTable.filter((item: any) => item.avgMass > symbols.search_Pep)
          this.dataSource.data = filteredResults
          // this.searchValue = element[element.length - 1].value.search_Pep;
          // this.dataSource.filter = this.searchValue.trim().toLowerCase();
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          // })


        }
        else if (symbols.symbols_Pep == 'Lesser than') {
          const filteredResults = this.allDataTable.filter(ite => ite.avgMass < symbols.search_Pep);
          this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);

        } else if (symbols.symbols_Pep == 'Equal to') {
          const filteredResults = this.allDataTable.filter(ite => ite.avgMass == symbols.search_Pep);
          this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);

        } else if (symbols.symbols_Pep == 'Greater than or equal to') {
          const filteredResults = this.allDataTable.filter(ite => ite.avgMass >= symbols.search_Pep);
          this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);

        } else if (symbols.symbols_Pep == 'Lesser than or equal to') {
          const filteredResults = this.allDataTable.filter(ite => ite.avgMass <= symbols.search_Pep);
          this.dataSource.data = filteredResults;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      }

      else if (this.score_result == 'Accession') {
        this.isLoading = true;
        const filteredResults = this.allDataTable.filter((item: any) => item.accession == symbols.search_Pep)
        this.dataSource.data = filteredResults
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }

      else if (this.score_result == 'Peptide sequence') {
        this.isLoading = true;
        const filteredResults = this.allDataTable.filter((item: any) => item.peptideSeq == symbols.search_Pep)
        this.dataSource.data = filteredResults
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }

      else if (this.score_result == 'Peptide modification') {
        this.isLoading = true;
        const filteredResults = this.allDataTable.filter((item: any) => item.peptideModification == symbols.search_Pep)
        this.dataSource.data = filteredResults
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    }
  }
  filter = {};
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): boolean {
      let searchString = JSON.parse(filter);
      let nameFound = data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1
      let positionFound = data.position.toString().trim().indexOf(searchString.position) !== -1
      let weightFound = data.weight.toString().trim().indexOf(searchString.weight) !== -1
      if (searchString.topFilter) {
        return nameFound || positionFound || weightFound
      } else {
        return nameFound && positionFound && weightFound
      }
    }
    return myFilterPredicate;
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
