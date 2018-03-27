<template>
  <div class='ion-page'>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>Search</ion-title>
      </ion-toolbar>
      <ion-toolbar color="success">
        <ion-searchbar
          placeholder=""
          showCancelButton="true"
          debounce="0"
          :value="searchInput"
          @ionInput="searchInput = $event.target.value; onInput$.next($event.target.value)"
          @ionClear="searchCleared($event)">
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid fixed no-padding>
        <div v-if="!searchInput" padding>
          <h1>Trending Bands</h1>
          <ion-item
            v-for="trending of ['Pink Floyd', 'August Burns Red', 'Alkaline Trio']"
            :key="trending"
            @click="setSearch(trending)">
            {{trending}}
          </ion-item>
        </div>

        <!-- Welp there's an error -->
        <div v-if="isError" text-center padding>
          <ion-icon color="secondary" name="warning" big></ion-icon>
          <h1>Uh-oh...</h1>
          <h2>It's not me, it's you!</h2>
          <h2>It appears there is a connection problem</h2>
        </div>

        <!-- Alright, we're searching -->
        <div padding text-center color="dark" v-if="showSpinner">
          <ion-spinner></ion-spinner>
        </div>

        <ion-list v-if="!showCard">
          <ion-item
            v-for="track of listing"
            :key="track.id"
            @click="goToDetail(track)">
            <ion-thumbnail slot="start" >
              <img :src="track.artworkUrl100" alt="">
            </ion-thumbnail>
              <ion-label>
                <h2>{{track.trackName}}</h2>
                <h3>{{track.artistName}}</h3>
                <p>{{track.collectionName}}</p>

              </ion-label>
              <ion-note slot="end">
                {{track.trackTimeMillis | msToMins}}
              </ion-note>
          </ion-item>
        </ion-list>

        <div v-if="showCard">

          <Music-Card :track="track" />
            <ion-button
              size="block"
              color="success"
              @click="clear()"
              >
              <ion-icon slot="icon-only" name="close" ></ion-icon>
            </ion-button>
        </div>
      </ion-grid>
    </ion-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Inject } from "vue-property-decorator";
import { debounceTime } from "rxjs/operators/debounceTime";
import { tap } from "rxjs/operators/tap";
import { switchMap } from "rxjs/operators/switchMap";
import { filter } from "rxjs/operators/filter";
import { load } from "@/providers/itunes";
import { Subject } from "rxjs/Subject";
import MusicCard from "@/components/MusicCard.vue";
@Component({
    components: {
      MusicCard
    }
})
export default class SearchPage extends Vue {
  private searchInput: string = "";
  private onInput$: any;
  private isError: boolean = false;
  public showSpinner: boolean = false;
  public track = null;
  public showCard = false;
  public listing = [];

  private setSearch(trending: string) {
    this.searchInput = trending;
    this.onInput$.next(trending);
  }
  private searchCleared(event: any) {
    this.searchInput = "";
    this.listing = [];
  }
  private goToDetail(track: any) {
    this.showCard = true
    this.track = track
    // this.$router.push({ name: 'trackDetail', params: { id: track.trackId }})
  }
  protected mounted() {
    this.onInput$ = new Subject<string>();
    this.onInput$
      .pipe(
        filter((term: any) => {
          if (term) {

            this.showSpinner = true;
            this.isError = false;
            console.log(this.showSpinner)
            return term;
          } else {
            this.listing = [];
            this.showSpinner = false;
          }
        }),
        debounceTime(500),
        switchMap((term: string) => load(term)),
        tap(() => {
          this.showSpinner = false;
        })
      )
      .subscribe(
        ( results: any ) => (this.listing = results.results),
        ( err: any ) => {
          this.showSpinner = false;
          this.isError = true;
          console.log(err);
        }
      );
  }
  clear() {
    this.track = null;
    this.showCard = false;
  }
}
</script>
