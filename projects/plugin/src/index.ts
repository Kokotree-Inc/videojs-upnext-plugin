import videojs, { VideoJsPlayer } from 'video.js';
import { PLUGIN_VERSION } from './version';

const Plugin = videojs.getPlugin('plugin');
const Component = videojs.getComponent('Component');

const getUpnextTemplate = (options: VideoJsUpnextPluginOptions) => {
  return `
<div class="vjs-upnext-overlay"></div>
<div class="vjs-upnext-container">
 
  <div class="vjs-upnext-header-container"><span class="vjs-upnext-header-title">${options.headText}</span></div>
  <div class="vjs-play-next-container">
    <div class="vjs-play-next-banner-container">
      <div class="img"></div>
    </div>
    <div class="vjs-upnext-title">${options.getTitle()}</div>
    <div class="vjs-upnext-progress-container">
      <svg viewBox="0 0 90 90" preserveAspectRatio="xMinYMin meet">
        <circle class="vjs-upnext-progress-circle-background" cx="40" cy="40" r="40"></circle>
        <circle id="vjs-upnext-progress-circle" class="vjs-upnext-progress-circle" cx="40" cy="40" r="40"></circle>
          <svg viewBox="0 0 24 24" width="60" height="80">
            <path transform="rotate(90 12 12) translate(1,-4)" fill="#fff" d="M8 5v14l11-7z"></path>
          </svg>
      </svg>
    </div>
  </div>
   <div class="vjs-upnext-cancel-button"><a title="${options.cancelText}">x</a></div>
</div>
    `;
};

export class EndCard extends Component {
  videoJsPlayer: VideoJsPlayer;
  pluginOptions: VideoJsUpnextPluginOptions;

  controlSelectors = {
    upnextContainer: '.vjs-upnext-container',
    upnextTitle: '.vjs-upnext-title',
    upnextCancel: '.vjs-upnext-cancel-button',
    upnextNext: '.vjs-upnext-autoplay-icon',
    upnextPlayContainer: '.vjs-play-next-container',
    upnextProgressCircle: 'vjs-upnext-progress-circle'
  };

  constructor(videoJsPlayer: VideoJsPlayer, pluginOptions: VideoJsUpnextPluginOptions, componentOptions: videojs.ComponentOptions) {
    super(videoJsPlayer, componentOptions);

    this.videoJsPlayer = videoJsPlayer;
    this.pluginOptions = pluginOptions;
    this.on(this.videoJsPlayer, 'ended', this.handleVideoEnded);

    // this.handleVideoEnded();
  }

  private toggleControls = (enabled: boolean) => {
    this.videoJsPlayer.controls(enabled);
  };

  private removeUpnextControl = (upnextContainer: HTMLDivElement) => {
    upnextContainer.remove();
    this.toggleControls(true);
  };

  private animateProgressCircle = (duration: number) => {
    const circle = document.getElementById(this.controlSelectors.upnextProgressCircle) as SVGCircleElement | null;
    if (!circle) {
      return;
    }

    const circumference = circle.r.baseVal.value * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    console.log('Animation working');
    const animation = (timestamp: number) => {
      const progress = timestamp / 1000;
      circle.style.strokeDashoffset = `${circumference - (circumference * progress) / duration}`;

      if (progress < duration) {
        window.requestAnimationFrame(animation);
      } else {
        console.log('Animation finished');
        this.pluginOptions.playNext();
      }
    };

    window.requestAnimationFrame(animation);
  };

  private handleVideoEnded = () => {
    console.log('Video ended');

    const { videoJsPlayer, pluginOptions, toggleControls, removeUpnextControl, controlSelectors } = this;

    const upnextContainer = document.createElement('div');
    upnextContainer.innerHTML = getUpnextTemplate(pluginOptions);

    upnextContainer.style.setProperty('--video-image-url', `url(${pluginOptions.getVideoImageUrl()})`);

    videoJsPlayer.el().appendChild(upnextContainer);

    console.log('animateProgressCircle');

    this.animateProgressCircle(pluginOptions.interval);

    toggleControls(false);

    const nextClose = upnextContainer.querySelector(controlSelectors.upnextCancel);
    if (nextClose) {
      nextClose.addEventListener('click', () => {
        console.log('Close clicked');
        pluginOptions.cancel();
        removeUpnextControl(upnextContainer);
      });
    }

    const playNextContainer = upnextContainer.querySelector(controlSelectors.upnextPlayContainer);
    if (playNextContainer) {
      playNextContainer.addEventListener('click', () => {
        console.log('Play next clicked');
        pluginOptions.playNext();
        removeUpnextControl(upnextContainer);
      });
    }
  };
}

videojs.registerComponent('EndCard', EndCard);

export class VideoJsUpnextPlugin extends Plugin {
  // Include the version number.
  public static VERSION = PLUGIN_VERSION;

  defaultOptions: VideoJsUpnextPluginOptions = {
    interval: 20,
    headText: 'Up Next',
    cancelText: 'Cancel',
    getTitle: function (): string {
      throw new Error('Function not implemented.');
    },
    playNext: function (): void {
      throw new Error('Function not implemented.');
    },
    cancel: function (): void {
      throw new Error('Function not implemented.');
    },
    getVideoImageUrl: function (): string {
      throw new Error('Function not implemented.');
    }
  };

  constructor(player: VideoJsPlayer, options?: VideoJsUpnextPluginOptions) {
    super(player);

    const mergedOptions = videojs.mergeOptions(this.defaultOptions, options);

    player.ready(() => this.onPlayerReady(player, mergedOptions));
  }

  onPlayerReady = (player: VideoJsPlayer, options: VideoJsUpnextPluginOptions) => {
    console.log('onPlayerReady mergedOptions', options);

    // Create an instance of EndCard and add it to the player.
    const endCard = new EndCard(player, options, {});
    player.addChild(endCard);
  };
}

videojs.registerPlugin('upnext', VideoJsUpnextPlugin);

declare module 'video.js' {
  export interface VideoJsPlayer {
    upnext: (options?: Partial<VideoJsUpnextPluginOptions>) => VideoJsUpnextPluginOptions;
  }
}

export interface VideoJsUpnextPluginOptions {
  interval: number;
  headText: string;
  cancelText: string;
  getTitle: () => string;
  getVideoImageUrl: () => string;
  playNext: () => void;
  cancel: () => void;
}
// console.log(videojs.getPlugins());
