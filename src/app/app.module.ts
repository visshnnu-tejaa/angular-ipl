import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { MatchDetailsComponent } from './screens/match-details/match-details.component';
import { MatchCardComponent } from './components/match-card/match-card.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SignupComponent } from './screens/signup/signup.component';
import { LoginComponent } from './screens/login/login.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { MatchesEffect } from './state/match/match.effects';
import { matchReducer } from './state/match/match.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchDetailsComponent,
    MatchCardComponent,
    HeaderComponent,
    LoaderComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ app: matchReducer }),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([MatchesEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
