import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // I Really wanted to implement testing here, but I cannot for the life of me, get async functions to work
  // I've tried using 'done', I've tried making the function async and awaiting it, and I've tried just about
  // everything else to no avail. I ended up changing the auth service login to a promise rather than an
  // observable, so the attempt at the bottom here shows a test from that being the way login worked previously.

  // it('should throw error for wrong credentials', () => {
  //     service.login("rick", "pass").pipe(first())
  //     .subscribe(
  //       data => {},
  //       error => {
  //         expect(error.error.message).toBe("Invalid Credentials");
  //       }
  //     )
  // });

  // it('should return user for proper credentials', async () => {
    // const result = await service.login("c137@onecause.com", "#th@nH@rm#y#r!$100%D0p#");
    // expect(result.name).toBe("Rick");
    // expectAsync(
    //   service.login("c137@onecause.com", "#th@nH@rm#y#r!$100%D0p#").pipe(first()).toPromise()
    //   ).toBeResolvedTo({
    //     email: "c137@onecause.com",
    //     id: 5, 
    //     name: "Rick",
    //     password: "JDJhJDEyJDRXMGlFekFMR0huTi9zeDlBc2FDZGVHNWhpZnJIM3VPOVhuWFR5V01OTERoODBkMUU0b1Zx",
    //     token: service.generateToken(),
    //     username: "c137@onecause.com"
    //   })
    // service.login("c137@onecause.com", "#th@nH@rm#y#r!$100%D0p#").pipe(first())
    // .subscribe(
    //   data => {
    //     expect(data.name).toBe("Rick");
    //     done();
    //   },
    //   error => {}
    // );
  // })

  // it('should return user for proper credentials', waitForAsync(inject([AuthenticationService], (authService: AuthenticationService) => {
  //   authService.login("c137@onecause.com", "#th@nH@rm#y#r!$100%D0p#").pipe(first())
  //   .subscribe(
  //     data => {
  //       expect(data.name).toBe("Rick");
  //     },
  //     error => {}
  //   );
  // })))
});
