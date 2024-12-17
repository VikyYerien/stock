import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { authGuard } from './guards/auth.guard';
import { UserFormComponent } from './views/user/user-form/user-form.component';
import { UserComponent } from './views/user/user/user.component';
import { UsersListComponent } from './views/user/users-list/users-list.component';
import { ProductComponent } from './views/product/product/product.component';
import { ProductsListComponent } from './views/product/products-list/products-list.component';
import { ProductFormComponent } from './views/product/product-form/product-form.component';
import { CategoryComponent } from './views/category/category/category.component';
import { CategoriesListComponent } from './views/category/categories-list/categories-list.component';
import { CategoryFormComponent } from './views/category/category-form/category-form.component';
import { DiscountComponent } from './views/discount/discount/discount.component';
import { DiscountsListComponent } from './views/discount/discounts-list/discounts-list.component';
import { DiscountFormComponent } from './views/discount/discount-form/discount-form.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [authGuard] 
  },
  {
    path: 'user/create',
    component: UserFormComponent,
    data: { mode: 'create' }
  },
  {
    path: 'user/edit/:id',
    component: UserFormComponent,
    data: { mode: 'edit' }
  },
  { 
    path: 'user/:id', 
    component: UserComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'users', 
    component: UsersListComponent, 
    canActivate: [authGuard] },
  { 
    path: 'product', 
    component: ProductComponent, 
    canActivate: [authGuard] },
  { 
    path: 'products', 
    component: ProductsListComponent, 
    canActivate: [authGuard] },
  {
    path: 'product/create',
    component: ProductFormComponent,
    data: { mode: 'create' }
  },
  {
    path: 'product/edit/:id',
    component: ProductFormComponent,
    data: { mode: 'edit' }
  },
  { 
    path: 'category', 
    component: CategoryComponent, 
    canActivate: [authGuard] },
  { 
    path: 'categories', 
    component: CategoriesListComponent, 
    canActivate: [authGuard] },
  {
    path: 'category/create',
    component: CategoryFormComponent,
    data: { mode: 'create' }
  },
  {
    path: 'category/edit/:id',
    component: CategoryFormComponent,
    data: { mode: 'edit' }
  },
  { 
    path: 'discount', 
    component: DiscountComponent, 
    canActivate: [authGuard] },
  { 
    path: 'discounts', 
    component: DiscountsListComponent, 
    canActivate: [authGuard] },
  {
    path: 'discount/create',
    component: DiscountFormComponent,
    data: { mode: 'create' }
  },
  {
    path: 'discount/edit/:id',
    component: DiscountFormComponent,
    data: { mode: 'edit' }
  },
  {
    path: 'cash-register/',
    component: CashRegisterComponent,
    data: { mode: 'edit' }
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
