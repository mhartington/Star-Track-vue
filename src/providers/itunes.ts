import { timeout } from 'rxjs/operators/timeout';
import { retryWhen } from 'rxjs/operators/retryWhen';
import { delay } from 'rxjs/operators/delay';
import { Observable } from 'rxjs/Observable';

export function load(term: string) {
  return Observable.create((observer: any) => {
    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        term
      )}&media=music`
    )
      .then(response => response.json()) // or text() or blob() etc.
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  }).pipe(retryWhen(error => error.pipe(delay(500))), timeout(5000));
}

export function loadSong(songId: string) {
  return Observable.create((observer: any) => {
    fetch(`https://itunes.apple.com/lookup?id=${songId}`)
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  }).pipe(retryWhen(error => error.pipe(delay(500))), timeout(5000));
}
