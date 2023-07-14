import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = new Array<User>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getListOfUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    })
    this.userService.getCurrentUser().subscribe((currentUser) => {
      console.log(currentUser);
    })
  }
}
