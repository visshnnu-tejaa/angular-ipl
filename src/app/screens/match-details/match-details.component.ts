import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css'],
})
export class MatchDetailsComponent implements OnInit {
  match: any;
  error: any;
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    let id = this.route.snapshot.paramMap.get('id');
    this.matchService.getServiceById(id).subscribe(
      (data) => {
        console.log(data);
        this.match = data;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.error = err;
        this.loading = false;
      }
    );
  }
}
