export interface OrgEventRes {
  events: Array<object>;
}

export interface VolEventsRes {
  numEvents: number;
  totalHours: number;
  fromDate: string;
  toDate: string;
  events: Array<object>;
}

export interface AdminEventRes {
  events: Array<object>;
}
