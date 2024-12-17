import { Component, inject, OnInit } from '@angular/core';
import { DiscountService } from '../../../services/discount.service';
import { Discount } from 'src/app/models/Discount';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-discounts-list',
  templateUrl: './discounts-list.component.html',
  styleUrls: ['./discounts-list.component.css']
})
export class DiscountsListComponent implements OnInit {
  discounts: Discount[] = [];
  filteredDiscounts: Discount[] = [];
  searchTerm: string = '';
  loading = true;
  errorMessage = '';
  authService = inject(AuthService)

  constructor(private discountService: DiscountService, private router:Router) {}

  ngOnInit(): void {
    this.loadDiscounts();
  }

  loadDiscounts(): void {
    const org = this.authService.getCurrentOrganization();
    this.discountService.getDiscounts(org).subscribe({
      next: (data) => {
        this.discounts = data;
        this.filteredDiscounts = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las categorías.';
        this.loading = false;
        console.error(error);
      },
    });
  }

  deleteDiscount(id: string) {
    this.discountService.deleteDiscount(id).subscribe(
      () => {
        this.loadDiscounts();
      }
    )
  }

  filterDiscounts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredDiscounts = this.discounts.filter(
      (category) =>
        category.name.toLowerCase().includes(term));
  }

  navigate(id: string) {
    this.router.navigate(['discount/edit/'+ id])
  }
}
