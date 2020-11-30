import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './race/race.component';
import { PonyComponent } from './pony/pony.component';
import { FromNowPipe } from './from-now.pipe';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor} from './jwt.interceptor';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';
import { PendingRacesComponent } from './races/pending-races/pending-races.component';
import { FinishedRacesComponent } from './races/finished-races/finished-races.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BetComponent,
    LiveComponent,
    PendingRacesComponent,
    FinishedRacesComponent
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, FormsModule, RouterModule.forRoot(ROUTES)],
  providers: [{ provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
