<template>
  <div class='ion-page'>
    <ion-header>
      <ion-toolbar color="success">
        <ion-back-button></ion-back-button>
        <ion-title>{{track.trackName}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <Music-Card :track="track" />
    </ion-content>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Watch
  } from "vue-property-decorator";
  import MusicCard from "@/components/MusicCard.vue";
  import {
    loadSong
  } from "@/providers/itunes";
  
  @Component({
    data() {
      return {
        track: undefined
      };
    },
    components: {
      MusicCard
    }
  })
  export default class TrackDetailPage extends Vue {
    private trackName = null;
    constructor() {
      super();
    }
    protected beforeMount() {
      const params = this.$route.params.id;
      let req = loadSong(params).subscribe((res: any) => {
        this.$data.track = res.results[0];
        req.unsubscribe();
      });
    }
  }
</script>
