import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-crypto',
  imports: [CommonModule,FormsModule],
  templateUrl: './search-crypto.component.html',
  styleUrl: './search-crypto.component.css'
})
export class SearchCryptoComponent {

  term = '';

@Output() searchChange = new EventEmitter<string>();
@Output() clearSearch = new EventEmitter<void>();

private searchTimeout?: any;

onInput() {
  // debounce user typing (e.g. 400ms)
  clearTimeout(this.searchTimeout);
  this.searchTimeout = setTimeout(() => {
    if (this.term.trim()) {
      this.searchChange.emit(this.term.trim().toLowerCase());
    } else {
      this.clearSearch.emit();
    }
  }, 400);
}

clear() {
  this.term = '';
  this.clearSearch.emit();
}
}
