import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InfoComponent } from './pages/info/info.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/home/news/news.component';
import { ProceduresComponent } from './pages/home/procedures/procedures.component';
import { CardComponent } from './pages/home/procedures/card/card.component';
import { AboutComponent } from './pages/home/about/about.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeChildComponent } from './pages/home/home-child/home-child.component';

const routes: Routes = [
  {
    path: '',
    component:  LoginComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'homeChild',
        component: HomeChildComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'procedures',
        component: ProceduresComponent,
      },
      {
        path: 'procedures/:folderName',
        component: CardComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: '',
        redirectTo: 'homeChild',
        pathMatch: "full"
      },
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: "full"
  },
  {
    path: '**',
    component: PdfViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
