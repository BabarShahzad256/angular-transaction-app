import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const transactionId = this.route.snapshot.paramMap.get('id');
    if(transactionId){
      this.transactionService.getTransactionById(transactionId).subscribe(transaction => {
        this.transactionForm = this.fb.group({
          id: [{ value: transaction.id, disabled: true }],
          date: [{ value: this.dateFormat(transaction.date), disabled: true }],
          comments: [transaction.comments, [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
        });
      });
    }
  }

  updateTransaction(): void {
    if (this.transactionForm.valid) {
      const id = this.transactionForm.get('id').value;
      const comment = this.transactionForm.get('comments').value;

      this.transactionService.updateTransaction(id, comment);
      this.router.navigate(['/transaction-list']);
    }
  }

  dateFormat(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
}
