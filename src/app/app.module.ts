import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfigService } from './services/config.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


function appConfigInit(appConfigService: ConfigService): () => Observable<any> {
  return () => 
    appConfigService.loadConfig()
    .pipe(
       tap(config => { ConfigService.config = config })
    );
 }
@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        ToastrModule.forRoot({
            progressBar: true,
            preventDuplicates: true
        })], providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appConfigInit,
            multi: true,
            deps: [ConfigService, HttpClient]
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
