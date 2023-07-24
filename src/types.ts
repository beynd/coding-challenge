export interface Account {
  instaName: string;
  instagramName: string;
  categories: string[];
  followers: number;
  audienceCountry: string;
  authenticEngagement: number;
  engagementAvg: number;
}

export interface CsvRow {
  "Influencer insta name": string;
  "instagram name": string;
  "category_1": string;
  "category_2": string;
  "Followers": string;
  "Audience country(mostly)": string;
  "Authentic engagement": string;
  "Engagement avg": string;
}

export interface Result {
  [key: string]: Account;
}
