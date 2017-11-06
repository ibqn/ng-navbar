import { Component, OnInit, HostListener, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';


export enum NavState {
  Init = 'init',
  Fixed = 'fixed',
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  animations: [
    trigger('scrollAnimation', [
      state(`${NavState.Init}`, style({
        backgroundColor: 'transparent',
        position: 'static',
      })),
      state(`${NavState.Fixed}`, style({
        backgroundColor: '#343a40',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1030,
      })),
      transition(`${NavState.Fixed} => ${NavState.Init}`, animate('100ms ease-out')),
      transition(`${NavState.Init} => ${NavState.Fixed}`, animate('100ms ease-in'))
    ])
  ]
})
export class NavbarComponent implements OnInit {
  NavState = NavState;

  private _navState: NavState;

  public get navState() { return this._navState; }

  @HostListener('window:scroll', ['$event'])
  scrolling = (e: Event) => {
    const position = this.el.nativeElement.offsetTop || 0;
    const scroll = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

    this._navState = scroll >= position ? NavState.Fixed : NavState.Init;

    console.log(`scrolling ${scroll} and possition ${position}`);
    console.log(`nav state is ${this.navState}`);
  }

  constructor(private el: ElementRef, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this._navState = NavState.Init;
  }
}
