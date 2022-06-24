import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
    sort: 'created_at',
    direction: 'desc'
  };

  public pagination: any =  {
    perPage: 8,
    total: 0
  };

  public filter: string = 'all';

  public perPages: Array<Number> = [5, 10, 15];
  public originalRepositories: Array<any> = [];
  public repositories: Array<IRepository> = [];

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.getRepositories();
  }

  getRepositories() {
    this.isLoading = true;
    this.githubService.getRepositories().subscribe(repositories => {
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

  search(){
    const text = this.queryParams.search.toLowerCase();

    this.repositories = this.originalRepositories;

    if(text.length >= 1){
      this.repositories = this.repositories.filter(function(repo: any){
        return repo.name.toLowerCase().includes(text) || repo.description.toLowerCase().includes(text);
      })
    }

    this.repositories = (this.filter != 'all') ? this.filterByField(this.repositories) : this.repositories;
    this.pagination.total = this.repositories.length;
  }
  
  onSort(column: string) {
    this.queryParams.sort = column;
    this.queryParams.direction = (this.queryParams.direction == 'desc') ? 'asc' : 'desc';
    const direction = this.queryParams.direction;

    this.repositories.sort(function(a: any, b: any) {  
      let columnA = (column == 'id') ? a[column] : a[column].toLowerCase();
      let columnB = (column == 'id') ? b[column] : b[column].toLowerCase();

      if(direction == 'desc') {
        return columnA > columnB ? 1 : -1
      } else {
        return columnA < columnB ? 1 : -1
      }
    });
  }

  onFilter(event: any): void {
    const field = event.target.value;
    this.filter = field;

    this.repositories = this.originalRepositories;
    this.search();
  }

  filterByField(repositories: any) {
    const filter = this.filter;
    const items = repositories.filter(function(repo: any){
      return repo[filter] == true
    })

    return items;
  }
}
