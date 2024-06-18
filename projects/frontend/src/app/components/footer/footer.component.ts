import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  year: any;

  ngOnInit(): void {
    this.year = moment().year();
  }
}
