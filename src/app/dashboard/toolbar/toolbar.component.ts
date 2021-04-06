import { UsersService } from 'src/app/shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isActive = true;
  counter:number = 0;
  unsubscribe = new Subject();
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    this.usersService.repo$
        .pipe(
        takeUntil(this.unsubscribe)
        )
        .subscribe(v => this.counter = v.length)
  }

}
