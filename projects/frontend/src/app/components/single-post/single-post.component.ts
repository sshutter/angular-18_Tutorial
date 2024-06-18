import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../../../models/post.interface';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../../tools/src/lib/api.service';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [CommonModule, CategoryListComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss',
})
export class SinglePostComponent implements OnInit {
  // @ts-ignore
  post: Observable<Post>;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.post = this.apiService.getPostById(id);
    });
  }
}
