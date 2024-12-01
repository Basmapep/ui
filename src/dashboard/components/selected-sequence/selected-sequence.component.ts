import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PeptideService } from 'src/services/peptide.service';

@Component({
  selector: 'app-selected-sequence',
  templateUrl: './selected-sequence.component.html',
  styleUrls: ['./selected-sequence.component.scss']
})
export class SelectedSequenceComponent implements OnInit {

  displayedColumns = ['accession', 'description', 'score',
    'peptidelength', 'avgMass', 'peptideModification', 'entry', 'peptideMatchedProducts', 'peptideMhp', 'peptideSeq', 'peptideSeqStart', 'precursorCharge', 'precursorIntensity', 'precursorMz', 'precursorRetentionTime', 'falsePositiveRate'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private peptide: PeptideService) {
    this.getAllSequenceData();
  }

  ngOnInit(): void {
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

}
