import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'systems', loadChildren: () => import('./systems/systems.module').then(m => m.SystemsModule) },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [
    WelcomeComponent,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
