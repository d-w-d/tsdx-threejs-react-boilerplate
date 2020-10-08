# TSDX-REACT-THREEJS-BOILERPLATE

## What's This?

See [here](https://d-w-d.github.io/tsdx-threejs-react-boilerplate/) for demo.

This project is based off of `npx tsdx create myapp` and expanded in order to make libraries for threeJs widgets.

## Why React?

This repo is made primarily with react apps in mind, because that is my normal target for embedding widgets, and because I often like to make threeJs widgets with HTML buttons. Coordinating state between HTML and threeJs is more nicely handled with react.

## Structure

The folder `src/ThreeJs` attempts to separate the boilerplate that just about any ThreeJs app needs, and the specifics of your app. This is accomplished by placing all of the boilerplate into abstract classes that your app specifics inherit from. So, in theory, you do not need to edit the content of `src/ThreeJs/AbstractScene`.

That means that you essentially only need to create "scene entities" (examples of which can be found in `src/ThreeJs/SceneEntities`) and then include them in your `src/ThreeJs/SceneManager.ts` like so:

```
export class SceneManager extends AbstractSceneManager implements ISceneManager {
  constructor(containerId: string) {
    super(containerId);

    // Add scene entities
    [
      new DirectionalLight(),
      new MiscHelpers(),
      new SimpleLight(),
      new Square(1),
      new DemoObjLoader(),
    ].forEach(el => this._sceneEntities.push(el));
  }

  updateCamera = (time: number) => {
    this._camera.position.x += time * 0;
  };
}
```

In the example embedded in this repo, we create an array of scene entities to the \_sceneEntities array initialized in the subclass. The subclass constructor will create the canvas and perform a lot of initiation stuff within the container designated by containerId. Optionally, you can build a function to determine the path of the camera as a function of time.

## DEVELOPMENT

### Quick Start

```
git clone https://github.com/d-w-d/tsdx-threejs-react-boilerplate
cd tsdx-threejs-react-boilerplate
npm i
npm i     ### <-- yes, do this twice!
npm run start-dev-react
```

TSDX gives you the following rough structure out of the box after building:

```
.
├── LICENSE
├── README.md
├── dist
│   ├── index.d.ts
│   ├── index.js
│   ├── sbnsolarsystemviewer.cjs.development.js
│   ├── sbnsolarsystemviewer.cjs.development.js.map
│   ├── sbnsolarsystemviewer.cjs.production.min.js
│   ├── sbnsolarsystemviewer.cjs.production.min.js.map
│   ├── sbnsolarsystemviewer.esm.js
│   ├── sbnsolarsystemviewer.esm.js.map
│   ├── sbnsolarsystemviewer.umd.development.js
│   ├── sbnsolarsystemviewer.umd.development.js.map
│   ├── sbnsolarsystemviewer.umd.production.min.js
│   └── sbnsolarsystemviewer.umd.production.min.js.map
├── example
│   ├── index.html
│   ├── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── package-lock.json
├── package.json
├── src
│   └── index.tsx
├── test
│   └── blah.test.tsx
└── tsconfig.json
```

The basic idea of this setup is for you to develop your code within `src`, have it continuously built to `dist`, and then you can check that it is working by also running the example react app within `example`. The problem with this approach is that you have to wait for two rounds of changes to your source code to see the effect in the output library:

- First the code within dist has to be updated by the tsdx process watching for changes in `src`
- Then the parcel process watching for changes to code within examples has to detect changes within dist and display them.

Having to wait for two sets of changes to get detected before you can see the result of changin your source code adds up after a while. For this reason, this repo implements a react app in `src` itself that is bundled by parcel so you can see the result of changes to your source code in roughly half the time. This is accomplished by simply adding two files `dev.html` and `dev.tsx` within `src` that directly import from the same entry file `src/index.tsx` that is used to build the publishable library. This repo also places all parcel-related configuration in the root dir.

The result is that we have a 'development' react app housed within the `src` dir itself that you can operate with `npm run start-dev-react`.

When you want to build and test the library files themselves, you can run `./_build_all` to generate the library files and then run the code within `examples`. In this case, `examples` houses code for a parcel-bundled react app, and a simple HTML-UMD app.
These 'demo' apps are operated with the following npm scripts:

```
npm run start-demo-react
npm run build-demo-react
npm run start-demo-umd
```

## BUGS

- Running `tsdx build --format umd,cjs,esm` together can cause bugs straight out of the box. The fix for now was the following:
  - Add `"resolutions": { "rollup-plugin-typescript2": "0.27.3" }` to `package.json`
  - Run `npm i -D npm-force-resolutions`
  - Add `"preinstall": "npx npm-force-resolutions"` to `package.json.scripts`
  - Run `npm i` whenever this pesky bug related to `rollup-plugin-typescript2` shows up
