import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { RegEx2StringComponent } from './reg-ex2-string/reg-ex2-string.component';
import { RegexTesterComponent } from './regex-tester/regex-tester.component';

const routes: Routes = [
  {path: 'regEx', component: RegEx2StringComponent},
  {path: 'util', component: RegexTesterComponent},
  {path: '', redirectTo: 'regEx', pathMatch: 'full'},
  {path: '**', redirectTo: 'regEx', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
