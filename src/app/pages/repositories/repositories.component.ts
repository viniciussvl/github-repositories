import { Component, Directive, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { GithubService } from 'src/app/services/github/github.service';
import { IRepository } from './repository.interface';


@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})


export class RepositoriesComponent implements OnInit {

  public isLoading: boolean = false;
  public page: number = 1;
  public queryParams: any =  {
    search: '',
    sort: 'created',
    direction: 'desc'
  };

  public pagination: any =  {
    perPage: 8,
    total: 0
  };

  public perPages: Array<Number> = [5, 10, 15];
  public originalRepositories: Array<IRepository> = [];
  public repositories: Array<IRepository> = [];

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.getRepositories();
  }

  getRepositories() {
    this.isLoading = true;
    this.githubService.getRepositories(this.queryParams).subscribe(repositories => {
      this.repositories = repositories;
      this.originalRepositories = repositories;
      this.pagination.total = repositories.length;
      this.isLoading = false;
    },
    error => {
      this.isLoading = false;
      console.log(error); 
    })
  }

  onSort(event: any) {
    console.log(event);
  }

  search(){
    let text = this.queryParams.search.toLowerCase();
    if(text.length >= 3){
      this.repositories = this.repositories.filter(function(repo: any){
        return repo.name.toLowerCase().includes(text) 
        || repo.description.toLowerCase().includes(text);
      })

      this.pagination.total = this.repositories.length;
    }

    if(text.length == 0) {
      this.repositories = this.originalRepositories;
      this.pagination.total = this.originalRepositories.length;
    }
  }
}
