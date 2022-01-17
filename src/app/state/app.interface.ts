import { Match } from './match/match.interface';
import { User } from './user/user.interface';

export interface AppState {
  matches: Match[] | null;
  user: User | null;
  loading: boolean;
  error: string;
}
