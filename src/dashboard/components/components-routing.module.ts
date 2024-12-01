import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PeptideComponent } from "./peptide/peptide.component";
import { ComponentsComponent } from "./components.component";
import { ToolsComponent } from "./tools/tools.component";
import { PiperpepMapComponent } from "./piperpep-map/piperpep-map.component";
import { PepcalToolComponent } from "./pepcal-tool/pepcal-tool.component";
import { SelectedSequenceComponent } from "./selected-sequence/selected-sequence.component";


const Comproutes: Routes = [
    {
        path: "", component: ComponentsComponent,
        // children: [{
        //     path: 'peptide',
        //     component: PeptideComponent
        // }]
    },
    {
        path: "peptide", component: PeptideComponent,

    },
    {
        path: 'piperMap', component: PiperpepMapComponent
    },
    {
        path: 'pepCal', component: PepcalToolComponent
    },
    {
        path: 'select-Sequence', component: SelectedSequenceComponent
    }

]


@NgModule({
    imports: [RouterModule.forChild(Comproutes)],
    exports: [RouterModule]
})

export class componentsRoutingModule { }
