import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AdminComponent} from './components/admin/admin.component';
import {PromoComponent} from './components/promo/promo.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'admin/promo', component: PromoComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {
}
