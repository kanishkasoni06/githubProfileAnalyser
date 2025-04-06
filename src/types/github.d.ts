export interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
  }
  
  export interface CommitActivity {
    week: number;
    total: number;
    days: number[];
  }