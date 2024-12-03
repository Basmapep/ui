import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/authentication/login/login.component';
import { SignUpComponent } from 'src/authentication/sign-up/sign-up.component';
import { AuthGuard } from 'src/constants/auth.guard';
import { DownloadComponent } from 'src/dashboard/components/download/download.component';
import { TeamComponent } from 'src/dashboard/components/team/team.component';
import { ToolsComponent } from 'src/dashboard/components/tools/tools.component';
import { ContactComponent } from 'src/dashboard/contact/contact/contact.component';
import { FileSubmissionComponent } from 'src/dashboard/file-submission/file-submission.component';
import { HomeComponent } from 'src/dashboard/home/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, },
  { path: 'login', component: LoginComponent },
  { path: 'Sign-up', component: SignUpComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'team', component: TeamComponent },
  {
    path: "tools", component: ToolsComponent,},
  // { path: 'peptide', component: PeptideComponent },
  { path: 'components', loadChildren: () => import('../dashboard/components/components.module').then((m) => m.ComponentsModule) },
  { path: 'download', component: DownloadComponent },
  { path: 'submission', component: FileSubmissionComponent,canActivate: [AuthGuard], },
    { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
