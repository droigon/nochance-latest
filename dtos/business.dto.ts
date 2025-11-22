export interface ReviewData {
  initials?: string; // Optional - can be generated from name
  name: string;
  rating: number; // 1 to 5
  date: string;
  invited?: boolean; // Optional property
  text: string;
  response?: string; // Optional property
  responseDate?: string; // Optional property
}
