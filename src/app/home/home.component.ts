import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../auth";
import {SpotifyService} from "../shared/services/spotify-services";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(public router: Router,
              private spotifyService: SpotifyService,
              private auth: AuthService) {
  }

  public login() {
    this.spotifyService.login().subscribe(
      success => {
        this.spotifyService.getCurrentUser()
          .subscribe(data => {
              localStorage.setItem('user', JSON.stringify(data));
              this.auth.user.next(data);
              this.router.navigateByUrl('main');
            },
            err => console.error(err));
      },
      err => {
        console.error(err);
      },
      () => {
      }
    );
  }

  ngOnInit() {
    this.auth.user.subscribe(data => {
      console.log(data);
    });

  }


}
