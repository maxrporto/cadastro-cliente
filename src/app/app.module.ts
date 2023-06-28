import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { SignInComponent } from './components/sign-in/sign-in.component';
// import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from './shared/services/auth.service';
// import { HeaderComponent } from './templates/header/header.component';
// import { FooterComponent } from './templates/footer/footer.component';
//import { NavegacaoComponent } from './templates/navegacao/navegacao.component';
// import { DashboardModule } from './components/dashboard.module';
// import { ListaComponent } from './view/pessoa/lista/lista.component';
// import { NovoComponent } from './view/pessoa/novo/novo.component';

@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    // SignInComponent,
    // SignUpComponent,
    // ForgotPasswordComponent,
    // VerifyEmailComponent,
    // HeaderComponent,
    // FooterComponent
    
    //NavegacaoComponent,
    // ListaComponent,
    // NovoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
