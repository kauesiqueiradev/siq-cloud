import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoComponent } from './pages/info/info.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MixedContentInterceptor } from './interceptor/http-interceptor';
import { AsideComponent } from './components/aside/aside.component';
import { CardComponent } from './pages/home/procedures/card/card.component';
import { ProceduresComponent } from './pages/home/procedures/procedures.component';
import { NewsComponent } from './pages/home/news/news.component';
import { AboutComponent } from './pages/home/about/about.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './auth/auth.guard';
import { HomeChildComponent } from './pages/home/home-child/home-child.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InfoComponent,
    HeaderComponent,
    AsideComponent,
    CardComponent,
    ProceduresComponent,
    NewsComponent,
    AboutComponent,
    PdfViewerComponent,
    HomeChildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxExtendedPdfViewerModule,
    MatSnackBarModule,
    NgbModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: MixedContentInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
