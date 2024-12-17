import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { QuoteService } from 'src/app/services/quote.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  quoteText: string = '';
  quoteAuthor: string = '';
  currentUser!: User;

  constructor(private authService: AuthService, private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.fetchQuote();
    this.currentUser = this.getCurrentUser();
  }

  fetchQuote(): void {
    this.quoteService.getRandomQuote().subscribe(
      (response) => {
        this.quoteText = response.quote;
        this.quoteAuthor = response.author;
      },
      (error) => {
        console.error('Error al obtener la frase:', error);
      }
    );
  }

  getCurrentUser(){
    return this.authService.getCurrentUser();
  }
}
