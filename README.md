# @kokotree-inc/videojs-upnext-plugin

Video.js Upnext plugin that enables auto-play of next video and shows an end card after the main video has ended.

![Preview](https://github.com/Kokotree-Inc/videojs-upnext-plugin/blob/1b47bcb78d9c9d320f3424be2845998a32c38c69/assets/images/preview.gif?raw=true)

This repository contains two projects:

1. `projects/plugin` - The plugin itself
2. `projects/demo/typescript` - A demo project that uses the plugin

## Test this plugin in your own repository

Run `npm install @kokotree-inc/videojs-upnext-plugin` to install the plugin.

## Usage

To use this plugin, simply import it and register it with your video.js player instance:

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

You can get upnext-styles.min.css from the dist folder of this package.

## Test the plugin locally with demo project in this repository

To test the plugin (`projects/plugin`) locally, you can use `Yalc` to create a symlink between your `projects/plugin` package and the `Yalc` registry.

### Prerequisites

Before proceeding, make sure you have the following software installed on your system:

- Node.js (version 12 or higher)
- NPM (version 6 or higher)
- Yalc (installed globally)

### Prerequisites details

#### Node.js

Install Node.js from the official website: https://nodejs.org/. The latest LTS version is recommended.

#### NPM

NPM is the default package manager for Node.js. It is included with the installation of Node.js.

#### Yalc

Install Yalc globally by running the following command:

```bash
npm install -g yalc
```

### Installation

1. Clone this repository and navigate to the `projects/plugin` directory.
2. Run `npm install` to install the package's dependencies.
3. Run `npm run watch` to build the TypeScript files.
4. Navigate to the `projects/demo/typescript` directory and run `npm install` to install the consumer project's dependencies.
5. Run `yalc add @kokotree-inc/videojs-upnext-plugin` to add the package to the consumer project. (Next time you have to
6. Run `npm run watch` to start the demo project. It will open a browser window at `http://192.168.0.100:3000/`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
