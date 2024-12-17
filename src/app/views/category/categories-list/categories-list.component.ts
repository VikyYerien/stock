import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from 'src/app/models/Category';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm: string = '';
  loading = true;
  errorMessage = '';
  authService = inject(AuthService)

  constructor(private categoryService: CategoryService, private router:Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    const org = this.authService.getCurrentOrganization();
    this.categoryService.getCategories(org).subscribe({
      next: (data) => {
        this.categories = data;
        this.filteredCategories = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las categorías.';
        this.loading = false;
        console.error(error);
      },
    });
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.loadCategories();
      }
    )
  }

  filterCategories(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCategories = this.categories.filter(
      (category) =>
        category.name.toLowerCase().includes(term));
  }

  navigate(id: string) {
    this.router.navigate(['category/edit/'+ id])
  }
}
