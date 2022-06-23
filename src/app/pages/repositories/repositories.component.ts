import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { RepositoryModel } from './repository.model';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  public isLoading: Boolean = true;
  public pagination: any =  {
    page: 1,
    limit: 10,
    total: 0,
    search: ''
  };

  public paginationLimits: Array<Number> = [3, 5, 10];
  public repositories: Array<RepositoryModel> = [];

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.getRepositories();
  }

  getRepositories() {
    this.githubService.getRepositories().subscribe(repositories => {
      this.repositories = repositories;
    })  
    console.log(this.pagination);
  }

  onSort(event: any) {
    console.log(event);
  }

}
