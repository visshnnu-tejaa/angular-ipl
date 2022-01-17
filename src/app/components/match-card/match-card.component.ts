import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css'],
})
export class MatchCardComponent implements OnInit {
  @Input() match: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClick() {
    this.router.navigate(['/details', this.match._id]);
  }
}
