import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SystemsComponent } from './systems/systems.component';
import { SettingsComponent } from './settings/settings.component';
import { SystemItemComponent } from './systems/system-item/system-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfigService } from './services/config.service';
import { HttpClient } from '@angular/common/http';

export function appConfigInit(appConfigService: ConfigService) {
  return () => {
    return appConfigService.loadConfig()
  };
}
@NgModule({
  declarations: [
    AppComponent,
    SystemsComponent,
    SettingsComponent,
    SystemItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInit,
      multi: true,
      deps: [ConfigService, HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
