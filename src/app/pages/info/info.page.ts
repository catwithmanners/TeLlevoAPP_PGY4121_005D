import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  infoId;
  titans;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.infoId = this.activatedRoute.snapshot.paramMap.get('id')
    this.http.get('https://attackontitanapi.herokuapp.com/api/titans/' + this.infoId)
    .subscribe(res => this.titans = res);
  }
}
