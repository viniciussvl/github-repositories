import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github/github.service';
import { IRepositoryModel } from './repository.interface';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  public isLoading: boolean = false;
  public totalRepositories: number = 0;
  public pagination: any =  {
    page: 1,
    per_page: 7,
    search: '',
    sort: 'created',
    direction: 'desc'
  };

  public perPages: Array<Number> = [5, 7, 10];
  public repositories: Array<IRepositoryModel> = [];

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.getTotalRepositories();
    this.getRepositories();
  }

  getRepositories() {
    this.isLoading = true;
    this.githubService.getRepositories(this.pagination).subscribe(repositories => {
      this.repositories = repositories;
      this.isLoading = false;
    },
    error => {
      this.isLoading = false;
      console.log(error); 
    })
  }

  getTotalRepositories() {
    this.githubService.getTotalRepositories().subscribe(data => {
      this.totalRepositories = data.public_repos;
    })
  }

  onSort(event: any) {
    console.log(event);
  }
}
