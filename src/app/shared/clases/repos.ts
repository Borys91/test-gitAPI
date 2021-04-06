export class Repo {
  full_name: string;
  stargazers_count: string;
  description:string;
  isFavorite:boolean;
  owner:any;
  id:number;

  constructor(repo: any = {}) {
    this.full_name = repo.full_name || void 0;
    this.stargazers_count = repo.stargazers_count || void 0;
    this.description = repo.description || void 0;
    this.owner = repo.owner || void 0;
    this.isFavorite = false;
    this.id = repo.id || void 0;
  }
}
