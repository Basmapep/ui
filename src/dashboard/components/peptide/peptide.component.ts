import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
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
  category: any = [
    'Accession', 'Score', 'Peptide sequence', 'Peptide modification', 'Peptide Length', 'Peptide Mass'
  ];
  title: any = '';
  public category_Value: any;
  displayedColumns = ['accession', 'description', 'score', 'peptidelength', 'avgMass', 'peptideModification', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // peptide_Form!: FormGroup;
  isLoading: boolean = true;

  peptide_Form = this.fb.group({
    categ_pep: ['', Validators.required],
    search_pep: ['', Validators.required]
  })

  constructor(private route: ActivatedRoute,
    private peptide: PeptideService,
    private fb: FormBuilder,
    private router: Router,
    private toster: ToastrService) {
    if (this.route.snapshot.paramMap.get('params') != null) {
      const params = this.route.snapshot.paramMap.get('params');
      this.category_Value = params;
      const val = this.route.snapshot.paramMap.get('val');
      this.title = val;
      this.getTableData(params, val)
      this.peptide_Form.get('categ_pep')!.setValue(params)
    }
  }



  ngOnInit() {

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  Select_Category(category: any) {
    this.category_Value = category.target.value
  }

  getTableData(category_Value: any, search: any) {
    this.isLoading = true
    this.peptide.getPeptide(category_Value, search).subscribe((data: any[]) => {
      if (data.length > 0) {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        if (category_Value == 'Score') {
          this.dataSource.data = data.filter(item => item.score == search)
        }
        else if (category_Value == 'Peptide Length') {
          this.dataSource.data = data.filter(item => item.peptideSeqLength == search)
        }
        else if (category_Value == 'Peptide Mass') {
          this.dataSource.data = data.filter(item => item.avgMass == search)
        }
        else {
          this.dataSource.data = data;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }

      } else {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    }, (error) => {
      this.toster.error(error.message)
    })
  }

  getAnotherData() {
    if (this.peptide_Form.valid) {
      this.isLoading = true;
      if (this.peptide_Form.value.categ_pep != null && this.peptide_Form.value.search_pep != null) {
        this.peptide.getPeptide(this.peptide_Form.value.categ_pep, this.peptide_Form.value.search_pep).subscribe((data: any[]) => {
          if (data.length > 0) {
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
            if (this.peptide_Form.value.categ_pep == 'Score') {
              this.dataSource.data = data.filter(item => item.score == this.peptide_Form.value.search_pep)
            }
            else if (this.peptide_Form.value.categ_pep == 'Peptide Length') {
              this.dataSource.data = data.filter(item => item.peptideSeqLength == this.peptide_Form.value.search_pep)
            }
            else if (this.peptide_Form.value.categ_pep == 'Peptide Mass') {
              this.dataSource.data = data.filter(item => item.avgMass == this.peptide_Form.value.search_pep)
            }
            else {
              this.dataSource.data = data;
            }
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

  goToValue(element: any) {
    this.router.navigate(['components/select-Sequence'])
    this.peptide.setSequenceDate(element)
  }
}
