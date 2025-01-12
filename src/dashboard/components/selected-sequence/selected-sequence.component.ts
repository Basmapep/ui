import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PeptideService } from 'src/services/peptide.service';

@Component({
  selector: 'app-selected-sequence',
  templateUrl: './selected-sequence.component.html',
  styleUrls: ['./selected-sequence.component.scss']
})
export class SelectedSequenceComponent implements OnInit {
  params: any = '';
  category: any = '';
  comparison: any = '';
  compareName: any = '';
  displayedColumns = ['accession', 'description', 'score',
    'peptidelength', 'avgMass', 'peptideModification', 'entry', 'peptideMatchedProducts', 'peptideMhp', 'peptideSeq', 'peptideSeqStart', 'precursorCharge', 'precursorIntensity', 'precursorMz', 'precursorRetentionTime', 'falsePositiveRate'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private peptide: PeptideService, private route: ActivatedRoute, private router: Router) {
    if (this.route.snapshot.paramMap.get('id') != null && this.route.snapshot.paramMap.get('category') && this.route.snapshot.paramMap.get('comparison') && this.route.snapshot.paramMap.get('compareName')) {
      this.params = this.route.snapshot.paramMap.get('id');
      this.category = this.route.snapshot.paramMap.get('category');
      this.comparison = this.route.snapshot.paramMap.get('comparison');
      this.compareName = this.route.snapshot.paramMap.get('compareName');
    }
    this.getAllSequenceData();
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  tabelData: any[] = [];
  getAllSequenceData() {
    this.peptide.getSequenceData().subscribe((result: any) => {
      this.dataSource.data.push(result);
      this.tabelData.push(result)
    })
  }

  backToSearch() {
    this.router.navigate(['/search', {
      id: this.params,
      category: this.category,
      comparison: this.comparison,
      compareName: this.compareName
    }])
  }

}
