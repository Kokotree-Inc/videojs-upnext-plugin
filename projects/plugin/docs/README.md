# videojs-upnext-plugin

A plugin for [video.js](https://videojs.com/) that displays an "Up Next" overlay when a video finishes playing.

![Preview](https://github.com/Kokotree-Inc/videojs-upnext-plugin/blob/1b47bcb78d9c9d320f3424be2845998a32c38c69/assets/images/preview.gif?raw=true)

## Installation

Run `npm install @kokotree-inc/videojs-upnext-plugin` to install the plugin.

## Usage

To use this plugin, simply import it and register it with your video.js player instance:

index.js

```javascript
import videojs from 'video.js';
import '@kokotree-inc/videojs-upnext-plugin';

const player = videojs('my-player');

player.upnext({
  interval: 10,
  headText: 'Up Next',
  cancelText: 'Cancel',
  getTitle: () => {
    return 'Ocean Life';
  },
  getVideoImageUrl: () => {
    return 'https://vjs.zencdn.net/v/oceans.png';
  },
  playNext: () => {
    console.log('playNext');
  },
  cancel: () => {
    console.log('cancel');
  }
});
```

HTML

```html
<html>
  <head>
    <link href="http://vjs.zencdn.net/8.9.0/video-js.css" rel="stylesheet" />

    <link href="index.css" rel="stylesheet" />
    <link href="upnext-styles.min.css" rel="stylesheet" />
  </head>
  <body>
    <div class="vid-container">
      <div
        class="video-js vjs-default-skin video-js-upnext-demo-player vjs-fluid video-js-upnext-demo-player-video-dimensions vjs-controls-enabled">
        <video id="video" controls></video>
      </div>
    </div>
    <script src="./index.js"></script>
  </body>
</html>
```

You can get upnext-styles.min.css from the root of this package.

## Plugin Options

| Option             | Type       | Default     | Description                                                                       |
| ------------------ | ---------- | ----------- | --------------------------------------------------------------------------------- |
| `interval`         | `number`   | `20`        | The interval, in seconds, before the next video starts playing.                   |
| `headText`         | `string`   | `'Up Next'` | The text displayed at the top of the Up Next card.                                |
| `cancelText`       | `string`   | `'Cancel'`  | The text displayed on the Cancel button.                                          |
| `getTitle`         | `function` | `() => ''`  | A function that returns the title of the next video to be played.                 |
| `getVideoImageUrl` | `function` | `() => ''`  | A function that returns the URL of the image to be displayed on the Up Next card. |
| `playNext`         | `function` | `() => {}`  | A function that is called when the user clicks the "Play Next" button.            |
| `cancel`           | `function` | `() => {}`  | A function that is called when the user clicks the "Cancel" button.               |
