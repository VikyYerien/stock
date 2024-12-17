import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  authService = inject(AuthService);
  filteredProducts: Product[] = [];
  searchTerm = '';
  searchTerm2 = '';
  loading = true;
  errorMessage ='';
  tableView = true;

  constructor(private productService: ProductService, private router:Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(): void {
    this.productService.getProducts(this.authService.getCurrentOrganization()).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching products:', error)
        this.errorMessage = 'Error al cargar los productos.';
        this.loading = false;
      }
    );
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(term));
  }

  filterProductsByCategory(){
    if(this.searchTerm2 == 'all') {
      this.filterProducts();
    } else {
      this.filterProducts();
      this.filteredProducts = this.filteredProducts.filter(
        (product) => product.categoryId == this.searchTerm2
      );
    }
  }

  deleteProduct(id:string){
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.getProducts();
      }
    )
  }

  getCategories() {
    this.categoryService.getCategories(this.authService.getCurrentOrganization()).subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
      },
    })
  }

  getCategory(id: string) {
    let categoryName = this.categories.filter(e => e._id == id)[0]?.name;
    return categoryName;
  }

  navigate(id: string) {
    this.router.navigate(['product/edit/'+ id])
  }

  changeAvailability(product:Product) {
    this.productService.updateProduct(product._id, product).subscribe(
      {
        next: () => {},
        error: (err) => console.error('Error al actualizar el usuario', err),
      }
    )
  }
}
