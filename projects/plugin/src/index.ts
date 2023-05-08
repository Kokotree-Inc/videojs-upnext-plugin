import videojs, { VideoJsPlayer } from 'video.js';

const Plugin = videojs.getPlugin('plugin');

export class VideoJsUpnextPlugin extends Plugin {
  constructor(player: VideoJsPlayer, options?: VideoJsUpnextPluginOptions) {
    super(player);
    player.ready(() => {
      console.log('VideoJsUpnextPlugin is ready');
      console.log('options', options);
    });
  }
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
console.log(videojs.getPlugins());
