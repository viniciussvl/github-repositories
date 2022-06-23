import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github/github.service';
import { IRepositoryModel } from './repository.interface';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  public isLoading: Boolean = true;
  public pagination: any =  {
    page: 1,
    per_page: 3,
    total: 0,
    search: '',
    sort: 'created',
    direction: 'desc'
  };

  public perPages: Array<Number> = [3, 5, 10];
  public repositories: Array<IRepositoryModel> = [];

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.getRepositories();
  }

  getRepositories() {
    this.githubService.getRepositories(this.pagination).subscribe(repositories => {
      this.repositories = repositories;
    })

    console.log(this.pagination);
  }

  onSort(event: any) {
    console.log(event);
  }

  onSelectPerPageSize(event: any) {
    this.pagination.per_page = event.target.value;
    this.getRepositories();
  }
}
