import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from 'src/app/models/Category';
import { AuthService } from 'src/app/services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  authService = inject(AuthService);
  categoryForm: FormGroup;
  isEditMode: boolean = false;
  category: Category = new Category;
  btnTxt = 'Crear Categoría';
  categoryId!: string | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
      //branchId: [''],
    });
  }

  ngOnInit(): void {
    const mode = this.route.snapshot.data['mode'];
    this.isEditMode = mode === 'edit';
    if(this.isEditMode) this.btnTxt = 'Editar Categoría';
    this.categoryId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.categoryId) {
      this.loadCategoryData(this.categoryId);
    }
    this.categoryForm.patchValue({ 
      
      });
  }

  get f() {
    return this.categoryForm.controls;
  }

  // Método para cargar datos del usuario en modo edición
  loadCategoryData(id: string): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description,
        });
      },
      error: (err) => console.error('Error al cargar los datos del usuario', err),
    });
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    this.category.name = this.f['name'].value;
    this.category.description = this.f['description'].value;
    this.category.organizationId = this.authService.getCurrentOrganization();
    //A agregar en un futuro si se usan organizaciones como madre y las operaciones se hacen a travez se sucursales
    //this.category.branchId = this.authService.getCurrentbranch();

    if (this.isEditMode && this.categoryId) {
      this.updateCategory(this.categoryId, this.category);
    } else {
      this.createCategory(this.category);
    }
  }

  // Método para crear un nuevo usuario
  createCategory(category: Category): void {
    this.categoryService.createCategory(category).subscribe({
      next: () => {
        alert('Categoría creada exitosamente');
        this.router.navigate(['/categories']);
      },
      error: (err) => console.error('Error al crear la Categoría', err),
    });
  }

  // Método para actualizar un usuario existente
  updateCategory(id: string, category: Category): void {
    this.categoryService.updateCategory(id, category).subscribe({
      next: () => {
        alert('Categoría actualizada exitosamente');
        this.router.navigate(['/categories']);
      },
      error: (err) => console.error('Error al actualizar la Categoría', err),
    });
  }
}