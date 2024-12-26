import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentsComponent } from "./components.component";
import { PeptideComponent } from "./peptide/peptide.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from "@angular/common";
import { componentsRoutingModule } from "./components-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PiperpepMapComponent } from './piperpep-map/piperpep-map.component';
import {MatInputModule} from '@angular/material/input';
import { PepcalToolComponent } from './pepcal-tool/pepcal-tool.component';
import { SelectedSequenceComponent } from './selected-sequence/selected-sequence.component';
import { BlastBasmaComponent } from './blast-basma/blast-basma.component';
import { LoadingComponent } from "../loading/loading.component";
import { UserHelpComponent } from "./user-help/user-help.component";
import { NgApexchartsModule } from "ng-apexcharts";



@NgModule({
    declarations: [
        ComponentsComponent,
        PeptideComponent,
        PiperpepMapComponent,
        PepcalToolComponent,
        SelectedSequenceComponent,
        BlastBasmaComponent,
        LoadingComponent,
        UserHelpComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        componentsRoutingModule,
        MatSlideToggleModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NgApexchartsModule
    ],
    providers: [],
    schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [ComponentsComponent]
})

export class ComponentsModule { }