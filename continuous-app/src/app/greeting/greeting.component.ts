import {Component, OnInit} from '@angular/core';
import {GreetingService} from '../greeting.service';
import {Greeting} from './Greeting';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  private greeting;
  private headers: string[];

  constructor(private greetingService: GreetingService) {
  }

  ngOnInit() {
    this.greeting = {
      message: 'greeting works!'
    };
    // this.showConfig();
    this.showConfigResponse();
  }

  showConfig() {
    this.greetingService.getGreeting()
      .subscribe((data: Greeting) => this.greeting = {
        message: data.message
      });
  }

  showConfigResponse() {
    this.greetingService.getGreetingResponse()
    // resp is of type `HttpResponse<Greeting>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        this.greeting = resp.body;
      });
  }
}
