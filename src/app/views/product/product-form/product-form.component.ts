import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { inject } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  authService = inject(AuthService);
  productForm: FormGroup;
  currencies = ['USD', 'ARS'];
  isEditMode: boolean = false;
  product: Product = new Product();
  productId: string | null = null;
  btnTxt = 'Crear Producto';
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService:CategoryService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      code: ['', Validators.required],
      priceAmmount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      priceCurrency: ['', Validators.required],
      imgUrls: [[], Validators.required],
      batchNumber: ['', Validators.required],
      discounts: [['']], // Agregar dinámicamente
      categoryId: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    const mode = this.route.snapshot.data['mode'];
    this.isEditMode = mode === 'edit';
    if(this.isEditMode) this.btnTxt = 'Editar Producto';
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.productId) {
      this.loadProductData(this.productId);
    }
  }

  get f() {
    return this.productForm.controls;
  }

  // Método para cargar datos del producto en modo edición
  loadProductData(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          priceAmmount: product.price.ammount,
          priceCurrency: product.price.currency,
          imgUrls: product.imgUrls,
          batchNumber: product.batchNumber.value,
          categoryId: product.categoryId,
          code: product.code,
          stock: product.stock,
        });
      },
      error: (err) => console.error('Error al cargar los datos del producto', err),
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories(this.authService.getCurrentOrganization()).subscribe({
      next: (categories:Category[]) => {
        this.categories = categories
      },
      error: (err) => console.error('Error al cargar los datos del producto', err),
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.product.name = this.f['name'].value;
    this.product.description = this.f['description'].value;
    this.product.price = {
      ammount: this.f['priceAmmount'].value,
      currency: this.f['priceCurrency'].value
    };
    this.product.code = this.f['code'].value;
    this.product.imgUrls = this.f['imgUrls'].value;
    this.product.batchNumber.type = 'Lote';
    this.product.batchNumber.value = this.f['batchNumber'].value;
    this.product.categoryId = this.f['categoryId'].value;
    this.product.stock = this.f['stock'].value;
    this.product.organizationId = this.authService.getCurrentOrganization();

    if (this.isEditMode && this.productId) {
      this.updateProduct(this.productId, this.product);
    } else {
      this.createProduct(this.product);
    }
  }

  createProduct(product: Product): void {
    this.productService.createProduct(product).subscribe({
      next: () => {
        alert('Producto creado exitosamente');
        this.router.navigate(['/products']);
      },
      error: (err) => console.error('Error al crear el producto', err),
    });
  }

  updateProduct(id: string, product: Product): void {
    this.productService.updateProduct(id, product).subscribe({
      next: () => {
        alert('Producto actualizado exitosamente');
        this.router.navigate(['/products']);
      },
      error: (err) => console.error('Error al actualizar el producto', err),
    });
  }
}
