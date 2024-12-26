import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeptideService } from 'src/services/peptide.service';
import * as AOS from 'aos';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexAxisChartSeries
} from "ng-apexcharts";
// AOS.init({
//   duration: 400,
//   once: true
// });
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  //Scroll Animation
  scrollDirection: 'up' | 'down' = 'up'; // Tracks scroll direction
  private lastScrollTop: number = 0; // Tracks the last scroll position
  isInitial: boolean = true; // Tracks the initial animation state


  category: any = [
    'Accession', 'Score', 'Peptide sequence', 'Peptide modification', 'Peptide Length', 'Peptide Mass'
  ]
  @ViewChild("chart") chart!: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;
  @ViewChild("chart1") chart1!: ChartComponent;
  // public chartOptions1: Partial<ChartOptions1>;

  public category_Value: any;
  peptform: FormGroup;
  public Search_Array: any[] = [];
  public chartOptions: ChartOptions = {
    series: [44, 55, 41, 17, 15], // Provide a default value
    chart: {
      type: 'pie',
      height: 350
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E']
  };
  public chartOptions1: ChartOptions1 = {
    series: [
      {
        name: "basic",
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }
    ],
    chart: {
      type: "bar",
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany"
      ]
    }
  };
  constructor(private route: Router, private fb: FormBuilder, private peptide: PeptideService) {
    this.peptform = this.fb.group({
      category_val: ['0', Validators.required],
      search: ['', Validators.required],
    })



    // this.chartOptions = {
    //   series: [44, 55, 13, 43, 22],
    //   chart: {
    //     width: 380,
    //     type: "pie"
    //   },
    //   labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: "bottom"
    //         }
    //       }
    //     }
    //   ]
    // };
  }

  ngOnInit(): void {
    // AOS.init({ disable: 'mobile' });//AOS - 2
    // AOS.refresh();
    setTimeout(() => {
      this.isInitial = false; // After the animation is completed, remove 'initial'
    }, 2000);
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

  goToBasmaLast() {
    this.route.navigate(['/components/basmaBlast'])
  }

  pepCalTool() {
    this.route.navigate(['/components/pepCal'])
  }
  dynamicLink: string = '';

  navigateTo(link: string) {
    window.location.href = link;
  }



  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (this.isInitial) return; // Skip scroll logic during initial animation

    if (currentScrollTop > this.lastScrollTop) {
      // Scrolling down
      this.scrollDirection = 'down';
    } else {
      // Scrolling up
      this.scrollDirection = 'up';
    }

    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Avoid negative scroll values
  }





}
