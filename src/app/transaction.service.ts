import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  //mock data
  private transactions: Transaction[] = [
    { id: '1', date: '2022-10-01T00:00:00Z', comments: 'Utility bill' },
    { id: '2', date: '2022-10-15T00:00:00Z', comments: '' }
  ];


  getTransactions(): Transaction[] {
    return this.transactions;
  }
  
  getTransaction(id: string) {
    return this.transactions.find(transaction => transaction.id === id);
  }

  getTransactionById(id: string): Observable<Transaction> {
    const transaction = this.transactions.find(t => t.id === id);
    return of(transaction);
  }

  updateTransaction(id: string, comments: string) {
    const transaction = this.getTransaction(id);
    if (transaction) {
      transaction.comments = comments;
    }
  }
}

export interface Transaction {
  id: string;
  date: string;
  comments: string;
}
