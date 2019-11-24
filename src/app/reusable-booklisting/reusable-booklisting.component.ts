import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reusable-booklisting',
  templateUrl: './reusable-booklisting.component.html',
  styleUrls: ['./reusable-booklisting.component.scss']
})
export class ReusableBooklistingComponent implements OnInit {

  @Input('bookData') bookData : any;

  constructor() { }

  ngOnInit() {
  }

}
