import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from '../../../services/discount.service';
import { Discount } from 'src/app/models/Discount';
import { AuthService } from 'src/app/services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.css']
})
export class DiscountFormComponent implements OnInit {

  authService = inject(AuthService);
  discountForm: FormGroup;
  isEditMode: boolean = false;
  discount: Discount = new Discount();
  btnTxt = 'Crear Descuento';
  discountId!: string | null;
  currencies = ['USD', 'ARS'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private discountService: DiscountService
  ) {
    this.discountForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: [''],
        percentage: [''],
        ammountGroup: this.fb.group(
          {
            currency: [''],
            ammount: [''],
          },
          { validators: currencyAmmountValidator }
        )
      },
      { validators: atLeastOneRequiredValidator }
    );
  }

  ngOnInit(): void {
    const mode = this.route.snapshot.data['mode'];
    this.isEditMode = mode === 'edit';
    if (this.isEditMode) this.btnTxt = 'Editar Descuento';
    this.discountId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.discountId) {
      this.loadDiscountData(this.discountId);
    }
  }

  get f() {
    return this.discountForm.controls;
  }

  get ammountGroup() {
    return this.discountForm.get('ammountGroup') as FormGroup;
  }

  loadDiscountData(id: string): void {
    this.discountService.getDiscountById(id).subscribe({
      next: (discount) => {
        this.discountForm.patchValue({
          name: discount.name,
          description: discount.description,
          percentage: discount.percentage,
          ammountGroup: {
            currency: discount.ammount.currency,
            ammount: discount.ammount.ammount
          }
        });
      },
      error: (err) => console.error('Error al cargar los datos del descuento', err),
    });
  }

  onSubmit(): void {
    if (this.discountForm.invalid) {
      return;
    }

    this.discount.name = this.f['name'].value;
    this.discount.description = this.f['description'].value;
    this.discount.percentage = this.f['percentage'].value;
    const ammountGroup = this.ammountGroup.value;
    this.discount.ammount = {
      currency: ammountGroup.currency,
      ammount: ammountGroup.ammount
    };
    this.discount.organizationId = this.authService.getCurrentOrganization();

    if (this.isEditMode && this.discountId) {
      this.updateDiscount(this.discountId, this.discount);
    } else {
      this.createDiscount(this.discount);
    }
  }

  createDiscount(discount: Discount): void {
    this.discountService.createDiscount(discount).subscribe({
      next: () => {
        alert('Descuento creado exitosamente');
        this.router.navigate(['/discounts']);
      },
      error: (err) => console.error('Error al crear el descuento', err),
    });
  }

  updateDiscount(id: string, discount: Discount): void {
    this.discountService.updateDiscount(id, discount).subscribe({
      next: () => {
        alert('Descuento actualizado exitosamente');
        this.router.navigate(['/discounts']);
      },
      error: (err) => console.error('Error al actualizar el descuento', err),
    });
  }
}

function currencyAmmountValidator(control: AbstractControl): ValidationErrors | null {
  const currency = control.get('currency')?.value;
  const ammount = control.get('ammount')?.value;
  if ((currency && !ammount) || (!currency && ammount)) {
    return { incompleteAmmount: true };
  }
  return null;
}

function atLeastOneRequiredValidator(control: AbstractControl): ValidationErrors | null {
  const percentage = control.get('percentage')?.value;
  const currency = control.get('ammountGroup.currency')?.value;
  const ammount = control.get('ammountGroup.ammount')?.value;

  if (!percentage && (!currency || !ammount)) {
    return { atLeastOneRequired: true };
  }
  return null;
}
