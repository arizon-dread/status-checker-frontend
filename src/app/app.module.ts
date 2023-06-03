import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SystemsComponent } from './systems/systems.component';
import { SettingsComponent } from './settings/settings.component';
import { SystemItemComponent } from './systems/system-item/system-item.component';

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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
