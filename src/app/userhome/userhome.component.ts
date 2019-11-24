import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  @ViewChild('dataTable', {static:false}) table : ElementRef

  dataTable:any;

  public bookData = null;

  constructor(
    private user: UserService,
    private router: Router
  ) {
    this.user.user().subscribe(
      data => {console.log(data);
        this.user.books().subscribe(
          data => {console.log("book",data);
          this.bookData = data;
          
          },
          error => this.router.navigate(['/login'])
        )
      
      },
      error => this.router.navigate(['/login'])
    )

    
  }

  title = 'angulardatatables';
 // dtOptions: DataTables.Settings = {};

  ngOnInit() {

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
  }

  logout(){
    this.user.logout().subscribe(
      data =>{console.log(data), this.router.navigate(['/login']);
      },
      error =>console.error(error)
      
    )
  }
}
