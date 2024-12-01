import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [MatExpansionModule, CommonModule],
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  // readonly panelOpenState = signal(false);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMapTool() {
    this.router.navigate(['/components/piperMap'])
  }

  pepCalTool(){
    this.router.navigate(['/components/pepCal'])
  }

}
