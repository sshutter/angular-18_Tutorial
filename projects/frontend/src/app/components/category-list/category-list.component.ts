import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Category } from '../../../../../models/category.interface';
import { takeUntil, Subject } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit, OnDestroy {
  cats: Category[] = [];
  private subs$ = new Subject();
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getAllCategories()
      .pipe(takeUntil(this.subs$))
      .subscribe((res) => {
        this.cats = res.filter((c) => (c.title !== 'Uncategorized' ? c : null));
      });
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
