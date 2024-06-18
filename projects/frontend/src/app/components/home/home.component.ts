import { ApiService } from './../../../../../tools/src/lib/api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../../../../models/post.interface';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  filter,
  map,
  takeUntil,
  throwError,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Category } from '../../../../../models/category.interface';
import { CategoryListComponent } from '../category-list/category-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, CategoryListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  // @ts-ignore
  posts$: Observable<Post[]> = [];
  subs$ = new Subject();
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.subs$)).subscribe((params) => {
      const catTitle = params.get('title');

      if (this.router.url === `/post/category/${catTitle}`) {
        this.posts$ = this.apiService
          .getAllPosts()
          .pipe(
            map((posts) => posts.filter((p) => p.category.title === catTitle))
          );
      } else {
        this.posts$ = this.apiService.getAllPosts().pipe();
      }
    });
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
