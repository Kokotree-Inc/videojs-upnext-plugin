import videojs, { VideoJsPlayer } from 'video.js';
import { PLUGIN_VERSION } from './version';
import './upnext-styles.css';

// Get the plugin and component classes from video.js
const Plugin = videojs.getPlugin('plugin');
const Component = videojs.getComponent('Component');

/**
 * Returns the HTML for the upnext template.
 * @param options - The options for the upnext template.
 * @returns The HTML for the upnext template.
 */
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

/**
 * The component that displays the upnext overlay.
 */
export class UpnextCard extends Component {
  /**
   * The Video.js player instance.
   */
  videoJsPlayer: VideoJsPlayer;

  /**
   * The plugin options.
   */
  pluginOptions: VideoJsUpnextPluginOptions;

  /**
   * CSS selectors for the upnext controls.
   */
  controlSelectors = {
    /**
     * The upnext container selector.
     */
    upnextContainer: '.vjs-upnext-container',

    /**
     * The upnext cancel button selector.
     */
    upnextCancel: '.vjs-upnext-cancel-button',

    /**
     * The play next container selector.
     */
    upnextPlayContainer: '.vjs-play-next-container',

    /**
     * The upnext progress circle selector.
     */
    upnextProgressCircle: 'vjs-upnext-progress-circle'
  };

  /**
   * The ID of the current timeout that is waiting to execute.
   *
   * @type {any}
   */
  private timeoutId: any;

  /**
   * Constructs a new instance of the UpnextCard component.
   * @param videoJsPlayer - The video.js player instance.
   * @param pluginOptions - The options for the upnext plugin.
   * @param componentOptions - The component options.
   */
  constructor(videoJsPlayer: VideoJsPlayer, pluginOptions: VideoJsUpnextPluginOptions, componentOptions: videojs.ComponentOptions) {
    super(videoJsPlayer, componentOptions);

    this.videoJsPlayer = videoJsPlayer;
    this.pluginOptions = pluginOptions;

    this.on(this.videoJsPlayer, 'ended', this.handleVideoEnded);
  }

  /**
   * Toggles the video controls on or off.
   * @param enabled - Whether or not to enable the controls.
   */
  private toggleControls = (enabled: boolean) => {
    console.log('toggleControls', enabled);
    this.videoJsPlayer.controls(enabled);
  };

  /**
   * Removes the upnext control and toggles video player controls on.
   * @param upnextContainer - The upnext control element to be removed.
   */
  private removeUpnextControl = (upnextContainer: HTMLDivElement) => {
    upnextContainer.remove();
    this.toggleControls(true);
    clearTimeout(this.timeoutId);
  };

  /**
   * Plays the next video and removes the upnext control.
   * @param upnextContainer - The upnext control element to be removed.
   */
  private playNext = (upnextContainer: HTMLDivElement) => {
    const { pluginOptions, removeUpnextControl } = this;

    pluginOptions.playNext();
    removeUpnextControl(upnextContainer);
  };

  /**
   * Handles the "ended" event on the video player. Displays the upnext card and starts the countdown timer
   * until the next video plays.
   */
  private handleVideoEnded = () => {
    console.log('Video ended');

    const { videoJsPlayer, pluginOptions, toggleControls, removeUpnextControl, controlSelectors, playNext } = this;

    // Create the upnext card element
    const upnextContainer = document.createElement('div');
    upnextContainer.innerHTML = getUpnextTemplate(pluginOptions);
    upnextContainer.style.setProperty('--video-image-url', `url(${pluginOptions.getVideoImageUrl()})`);
    videoJsPlayer.el().appendChild(upnextContainer);

    // Set the animation duration of the progress circle
    const circle = document.getElementById(this.controlSelectors.upnextProgressCircle) as SVGCircleElement | null;
    if (!circle) {
      return;
    }
    circle.style.setProperty('--progress-animation-duration', `${pluginOptions.interval}s`);

    // Start the countdown timer until the next video plays
    this.timeoutId = setTimeout(() => {
      playNext(upnextContainer);
    }, pluginOptions.interval * 1000);

    console.log('animateProgressCircle');

    // Hide the controls during the countdown
    toggleControls(false);

    // Handle click events on the close button of the upnext card
    const nextClose = upnextContainer.querySelector(controlSelectors.upnextCancel);
    if (nextClose) {
      // Cancel the timeout using the ID

      nextClose.addEventListener('click', () => {
        console.log('Close clicked');
        pluginOptions.cancel();
        removeUpnextControl(upnextContainer);
      });
    }

    // Handle click events on the play next button of the upnext card
    const playNextContainer = upnextContainer.querySelector(controlSelectors.upnextPlayContainer);
    if (playNextContainer) {
      // Cancel the timeout using the ID
      playNextContainer.addEventListener('click', () => {
        console.log('Play next clicked');
        playNext(upnextContainer);
      });
    }
  };
}

/**
 * Registers the UpnextCard component with Video.js
 *
 * @param {string} name - The name to use when registering the component
 * @param {typeof UpnextCard} component - The component to register
 */
videojs.registerComponent('UpnextCard', UpnextCard);

/**
 * A Video.js plugin that displays an up-next card at the end of a video.
 */
export class VideoJsUpnextPlugin extends Plugin {
  /**
   * The version number of the plugin.
   */
  public static VERSION = PLUGIN_VERSION;

  /**
   * The default options for the plugin.
   */
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

  /**
   * Constructs an instance of the plugin.
   *
   * @param player The Video.js player object.
   * @param options The plugin options.
   */
  constructor(player: VideoJsPlayer, options?: VideoJsUpnextPluginOptions) {
    super(player);

    const mergedOptions = videojs.mergeOptions(this.defaultOptions, options);

    player.ready(() => this.onPlayerReady(player, mergedOptions));
  }

  /**
   * The event handler for when the player is ready.
   *
   * @param player The Video.js player object.
   * @param options The plugin options.
   */
  onPlayerReady = (player: VideoJsPlayer, options: VideoJsUpnextPluginOptions) => {
    console.log('onPlayerReady mergedOptions', options);

    // Create an instance of EndCard and add it to the player.
    const endCard = new UpnextCard(player, options, {});
    player.addChild(endCard);
  };
}

/**
 * Register the VideoJsUpnextPlugin with Video.js.
 */
videojs.registerPlugin('upnext', VideoJsUpnextPlugin);

/**
 * Extends the Video.js player interface to include the upnext plugin.
 */
declare module 'video.js' {
  export interface VideoJsPlayer {
    upnext: (options?: Partial<VideoJsUpnextPluginOptions>) => VideoJsUpnextPluginOptions;
  }
}

/**
 * Options for the Video.js Up Next plugin.
 */
export interface VideoJsUpnextPluginOptions {
  /**
   * The number of seconds to wait before showing the Up Next card.
   */
  interval: number;
  /**
   * The text to display in the Up Next card header.
   */
  headText: string;
  /**
   * The text to display in the Up Next card cancel button.
   */
  cancelText: string;
  /**
   * A function that returns the title of the next video.
   */
  getTitle: () => string;
  /**
   * A function that returns the URL of the thumbnail image of the next video.
   */
  getVideoImageUrl: () => string;
  /**
   * A function to call when the "play next" button in the Up Next card is clicked.
   */
  playNext: () => void;
  /**
   * A function to call when the Up Next card is closed or cancelled.
   */
  cancel: () => void;
}

// console.log(videojs.getPlugins());
