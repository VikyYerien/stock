// users-list.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  loading = true;
  errorMessage = '';
  authService = inject(AuthService)

  constructor(private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const org = this.authService.getCurrentOrganization();
    this.userService.getUsers(org).subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        console.log(        this.filteredUsers, this.filteredUsers[0]       )
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los usuarios.';
        this.loading = false;
        console.error(error);
      },
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.loadUsers();
      }
    )
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term)
    );
  }

  navigate(id: string) {
    this.router.navigate(['user/edit/'+ id])
  }
}
