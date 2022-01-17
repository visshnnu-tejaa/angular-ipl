import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatchService } from 'src/app/services/match.service';
import { AppState } from 'src/app/state/app.interface';
import {
  getMatchesRequest,
  setLoaderStatus,
} from 'src/app/state/match/match.actions';
import { getLoading, getMatches } from 'src/app/state/match/match.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  matches: any = [];
  filteredMatches: any = [];
  error: any;
  loading: boolean = false;

  team: string;
  year: string;
  filterMessage: string = '';

  // pagination
  p: number = 1;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(setLoaderStatus({ status: true }));
    this.store
      .select(getLoading)
      .subscribe((status) => (this.loading = status));
    this.store.dispatch(getMatchesRequest());
    this.store.select(getMatches).subscribe((matches) => {
      this.matches = matches;
      return (this.filteredMatches = matches);
    });
  }

  // getAllMatches() {
  //   this.loading = true;
  //   this.matchService.getServices().subscribe(
  //     (data) => {
  //       this.matches = data;
  //       this.filteredMatches = data;
  //       console.log(this.matches);
  //       this.loading = false;
  //     },
  //     (err) => {
  //       this.error = err;
  //       this.loading = false;
  //     }
  //   );
  // }

  filterMatches(team?: string, year?: string) {
    this.filteredMatches = [];
    if (team && !year) {
      this.filterMessage = `Filtering by team ${team}`;
      this.filteredMatches = this.matches.filter(
        (match: any) => match.team1.includes(team) || match.team2.includes(team)
      );
    } else if (!team && year) {
      this.filterMessage = `Filtering by year ${year}`;
      this.filteredMatches = this.matches.filter(
        (match: any) => match.season == year
      );
    } else if (!team && !year) {
      this.filteredMatches = this.matches;
      this.filterMessage = '';
    } else {
      this.filterMessage = `Filtering by team ${team} and ${year}`;
      this.filteredMatches = this.matches.filter(
        (match: any) => match.team1.includes(team) || match.team2.includes(team)
      );
      this.filteredMatches = this.filteredMatches.filter(
        (match: any) => match.season == year
      );
    }

    console.log(this.filteredMatches);
    this.team = '';
    this.year = '';
  }
}
