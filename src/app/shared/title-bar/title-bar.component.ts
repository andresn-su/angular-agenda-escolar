import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'an-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  @Input() titleToolbar;

  constructor() { }

  ngOnInit(): void {
  }

}
