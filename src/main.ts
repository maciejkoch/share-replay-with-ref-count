import { Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { interval, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <button (click)="toggle()">Toggle</button>
    @if(visible()) {
    <div>
      <div>Counter with refCount: {{ source1$ | async }}</div>
      <div>Counter without: {{ source2$ | async }}</div>
    </div>
    }
  `,
})
export class App {
  visible = signal(true);

  source1$ = interval(1000).pipe(
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  source2$ = interval(1000).pipe(shareReplay(1));

  toggle() {
    this.visible.update((state) => !state);
  }
}

bootstrapApplication(App);
