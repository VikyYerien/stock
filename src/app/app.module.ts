import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { ProductsListComponent } from './views/product/products-list/products-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './views/user/user/user.component';
import { UserFormComponent } from './views/user/user-form/user-form.component';
import { UsersListComponent } from './views/user/users-list/users-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../app/interceptors/http-interceptor';
import { ProductFormComponent } from './views/product/product-form/product-form.component';
import { CategoryComponent } from './views/category/category/category.component';
import { CategoriesListComponent } from './views/category/categories-list/categories-list.component';
import { CategoryFormComponent } from './views/category/category-form/category-form.component';
import { DiscountComponent } from './views/discount/discount/discount.component';
import { DiscountsListComponent } from './views/discount/discounts-list/discounts-list.component';
import { DiscountFormComponent } from './views/discount/discount-form/discount-form.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsListComponent,
    ProductFormComponent,
    HomeComponent,
    UserComponent,
    UserFormComponent,
    UsersListComponent,
    CategoryComponent,
    CategoriesListComponent,
    CategoryFormComponent,
    DiscountComponent,
    DiscountsListComponent,
    DiscountFormComponent,
    CashRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
