import videojs, { VideoJsPlayer } from 'video.js';
import { PLUGIN_VERSION } from './version';

const Plugin = videojs.getPlugin('plugin');

export class VideoJsUpnextPlugin extends Plugin {
  // Include the version number.
  VERSION = PLUGIN_VERSION;

  defaultOptions: VideoJsUpnextPluginOptions = {
    title: '',
    interval: 10
  };

  constructor(player: VideoJsPlayer, options?: VideoJsUpnextPluginOptions) {
    super(player);
    const mergedOptions = videojs.mergeOptions(this.defaultOptions, options);

    player.ready(() => this.onPlayerReady(player, mergedOptions));

    player.on('ended', () => this.onVideoEnded(player));
  }

  onPlayerReady = (player: VideoJsPlayer, options: VideoJsUpnextPluginOptions) => {
    console.log('onPlayerReady mergedOptions', options);
    player.addClass('vjs-upnext');
  };

  onVideoEnded = (player: VideoJsPlayer) => {
    console.log('Player ended');

    player.addClass('vjs-upnext--showing');
    // const endCard = player.getChild('endCard');
    // endCard.showCard((canceled) => {
    //   player.removeClass('vjs-upnext--showing');
    //   if (!canceled) {
    //     // Load the next video
    //     // ...
    //   }
    // });
  };
}

videojs.registerPlugin('upnext', VideoJsUpnextPlugin);

declare module 'video.js' {
  export interface VideoJsPlayer {
    upnext: (options?: Partial<VideoJsUpnextPluginOptions>) => VideoJsUpnextPluginOptions;
  }
}

export interface VideoJsUpnextPluginOptions {
  title: string;
  interval: number;
}
// console.log(videojs.getPlugins());
