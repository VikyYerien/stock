import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  authService = inject(AuthService);
  userForm: FormGroup;
  identifyerTypes: string[] = ['DNI', 'RUC', 'Passport', 'CUIT', 'CUIL'];
  roles: string[] = ['Administrador', 'Usuario', 'Cliente'];
  genderTypes: string[] = ['Hombre', 'Mujer']
  isEditMode: boolean = false;
  User: User = new User;
  userId: string | null = null;
  hiddenPasswordInput = false;
  btnTxt = 'Crear Usuario';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      identifyerType: ['', Validators.required],
      identifyerValue: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?\d{7,15}$/)]],
      passWord: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      active: [true],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const mode = this.route.snapshot.data['mode'];
    this.isEditMode = mode === 'edit';
    if(this.isEditMode) this.btnTxt = 'Editar Usuario';
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.userId) {
      this.loadUserData(this.userId);
    }

    if (!this.isEditMode) {
      this.hiddenPasswordInput = true;
      this.userForm.get('identifyerValue')?.valueChanges.subscribe(value => {
        this.userForm.patchValue({ passWord: value });
        this.userForm.get('passWord')?.disable();
      });
    } else {
      this.userForm.get('passWord')?.enable();
      this.userForm.patchValue({ 
        name: this.User.name,
        lastName: this.User.lastName,
        identifyerType: this.User.identifyer.type,
        identifyerValue: this.User.identifyer.value,
        email: this.User.email,
        phone: this.User.phone,
        passWord: this.User.passWord,
        gender: this.User.gender
       });
    }
  }

  get f() {
    return this.userForm.controls;
  }

  // Método para cargar datos del usuario en modo edición
  loadUserData(id: string): void {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          name: user.name,
          lastName: user.lastName,
          identifyerType: user.identifyer.type,
          identifyerValue: user.identifyer.value,
          email: user.email,
          phone: user.phone,
          passWord: user.passWord,
          role: user.role,
          active: user.active,
          gender: user.gender,
        });
      },
      error: (err) => console.error('Error al cargar los datos del usuario', err),
    });
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    // _id: string;    
    // name: string;
    // lastName: string;
    // identifyer: Identifyer;    
    // email: string;
    // phone: string;
    // role: string;
    // active: string;
    // passWord: string; 
    // gender: string;
    // organizacionId: string;    
    // branchId: string;
    this.User.name = this.f['name'].value;
    this.User.lastName = this.f['lastName'].value;
    this.User.identifyer.type = this.f['identifyerType'].value;
    this.User.identifyer.value = this.f['identifyerValue'].value;
    this.User.email = this.f['email'].value;
    this.User.phone = this.f['phone'].value;
    this.User.passWord = this.f['passWord'].value;
    this.User.role = this.f['role'].value;
    this.User.active = this.f['active'].value;
    this.User.gender = this.f['gender'].value;
    this.User.organizationId = this.authService.getCurrentOrganization();
    //this.User.branchId = '';

    if (this.isEditMode && this.userId) {
      this.updateUser(this.userId, this.User);
    } else {
      this.createUser(this.User);
    }
  }

  // Método para crear un nuevo usuario
  createUser(user: User): void {
    this.userService.createUser(user).subscribe({
      next: () => {
        alert('Usuario creado exitosamente');
        this.router.navigate(['/users']);
      },
      error: (err) => console.error('Error al crear el usuario', err),
    });
  }

  // Método para actualizar un usuario existente
  updateUser(id: string, user: User): void {
    this.userService.updateUser(id, user).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente');
        this.router.navigate(['/users']);
      },
      error: (err) => console.error('Error al actualizar el usuario', err),
    });
  }
}
