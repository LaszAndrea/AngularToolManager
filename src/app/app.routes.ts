import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login';
import { Register } from '../register/register';
import { HomeComponent } from '../home-component/home-component';
import { AddToolTypesComponent } from '../add-tool-types-component/add-tool-types-component';
import { AddToolComponent } from '../add-tool-component/add-tool-component';
import { ModifyToolTypesComponent } from '../modify-tool-types-component/modify-tool-types-component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: Register},
    { path: 'home', component: HomeComponent},
    { path: 'addToolType', component: AddToolTypesComponent},
    { path: 'addTool', component: AddToolComponent},
    { path: 'modifyToolType/:id', component: ModifyToolTypesComponent}
];
