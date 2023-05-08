# @kokotree-inc/videojs-upnext-plugin

Video.js Upnext plugin that enables auto-play of next video and shows an end card after the main video has ended.

This repository contains two projects:

1. `projects/plugin` - The plugin itself
2. `projects/demo/typescript` - A demo project that uses the plugin

## Test this plugin in your own repository

Run `npm install @kokotree-inc/videojs-upnext-plugin` to install the plugin.

## Usage

To use this plugin, simply import it and register it with your video.js player instance:

```javascript
import videojs from 'video.js';
import '@kokotree-inc/videojs-upnext-plugin';

const player = videojs('my-player', {
  plugins: {
    upnext: {
      title: 'My awesome video',
      interval: 50
    }
  }
});

player.autoplay(true);
```

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
3. Run `npm run build` to build the TypeScript files.
4. Run `yalc publish` to publish the package to the Yalc registry.
5. Navigate to the `projects/demo/typescript` directory and run `npm install` to install the consumer project's dependencies.
6. Run `yalc add @kokotree-inc/videojs-upnext-plugin` to add the package to the consumer project. (Next time you have to run `yalc update` to update the package.)
7. Run `npm run build` in the consumer project to build the TypeScript files.
8. Run `npm run start` to start the demo project. It will open a browser window at `http://localhost:3000/`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
