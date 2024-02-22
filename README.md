# ZIM 
JavaScript Canvas Framework - Code Creativity!<br>
https://zimjs.com

A consistent, complete, simple and colorful Canvas Framework that provides quick visual results.  ZIM is great for learning to code but also powerful for professionals to make games, apps, art and more for desktop and mobile!

Please see the About section for why we use ZIM to make Interactive Media.<br>
https://zimjs.com/about.html

## Examples

![zim](https://github.com/danzen/zimjs/assets/380281/af5c1e20-9f74-4b60-81f8-4ca1052ef16a)

ZIM is great for games, puzzles, art, visualizations, interfaces and more!  See:<br>
https://zimjs.com/examples.html<br>

Coding in ZIM looks like this:

```javascript
new Rectangle(50, 50, green).center().drag(); // for a centered draggable rectangle!

new MotionController(new Emitter().center(), "mousemove"); // for a particle emitter following the mouse

const squiggle = new Squiggle().loc(100, 100); // wavy line with Bezier handles
new Circle(20, pink).addTo().animate({path:squiggle}, 1); // animate along a squiggle

new Button(200, 70, "TRY ME")
  .pos(30,30,RIGHT,BOTTOM) 
  .tap(()=>{zgo("https://zimjs.com");}); // go to URL
  
```

<br>

![zim2](https://github.com/danzen/zimjs/assets/380281/f318c755-7dd2-43ed-8bf0-ead77ec40b23)


![npm](https://img.shields.io/npm/v/zimjs.svg) 
![GitHub](https://img.shields.io/badge/license-MIT-green.svg)
[![Discord](https://img.shields.io/discord/782972112646307881)](https://discord.com/invite/KczUuFkZdk)
[![Discourse](https://img.shields.io/badge/discourse-forum-brightgreen.svg)](https://forum.zimjs.com)

## Getting Started

Copy the template on the Code page into an editor like VS Code and view results in any Browser.<br>
https://zimjs.com/code.html<br>

<i>This uses ES6 Modules or Script tags from our CDN at https://zimjs.org/cdn<br>
Alternatively, see the NPM instructions in the section down below.</i><br>

ZIM EDITOR - an online editor with lots of examples, file saving and sharing<br>
https://zimjs.com/editor

ZIM INTRO - sample code with comments<br>
https://zimjs.com/intro.html

ZIM BASICS - video series on YouTube<br>
https://www.youtube.com/watch?v=G4K0PwtwXRQ&list=PLCIzupgRt1pYPy1ufRjssbGuPKMviuFvB

ZIM CODEPEN TOPIC<br>
https://codepen.io/topic/zim/

ZIM LEARN has many code and video tutorials including:<br>
ZIM Bits - 64 common techniques, ZIM Capture, What IZ tutorials, ZIM Badges, Code Zero and more!<br>
https://zimjs.com/learn.html 

ZIM SKOOL is great for learning with 8 full lessons including in Browser code examples.<br>
https://zimjs.com/skool.html and for kids https://zimjs.com/kids.html - like Magic!

LEARN JAVASCRIPT WITH CREATIVE CODING<br>
https://zimjs.com/learnjavascript.html

ZIM TIPS has a listing of the elegant ways we code in ZIM<br>
https://zimjs.com/tips.html

ZIM DOCS has all the Classes and Functions broken down by module - expand the topics<br> 
to see descriptions, examples, methods, properties, events, source, bits, vids, demos and more!<br>
https://zimjs.com/docs.html

## NPM
Here is ZIM on NPM: https://www.npmjs.com/package/zimjs<br>
There are additional helper modules matching the CDN helper modules:<br>
<a href=https://www.npmjs.com/package/@zimjs/physics>@zimjs/physics</a> | 
<a href=https://www.npmjs.com/package/@zimjs/game>@zimjs/game</a> | 
<a href=https://www.npmjs.com/package/@zimjs/three>@zimjs/three</a> | 
<a href=https://www.npmjs.com/package/@zimjs/socket>@zimjs/socket</a> | 
<a href=https://www.npmjs.com/package/@zimjs/cam>@zimjs/cam</a> | 
<a href=https://www.npmjs.com/package/@zimjs/pizzazz>@zimjs/pizzazz</a>
<br><br>
These steps describe setting up ZIM with Vite and NPM for vanilla JavaScript or TypeScript.<br>
There are also templates for VUE, Svelte, React and Angular further down.

A. SETUP<br>
- Open a folder in an IDE such as VS Code (The project folder will be made inside this folder)
- Open a terminal - see Terminal in the menu - or CTRL SHIFT `
- Check to see if you have node - type: <pre>node - v
- If not then install from https://nodejs.org
- Run Vite - type: <pre>npm create vite</pre> 
- If this needs to install, press y for yes
- Give the project a name - it will make a directory
- Select a framework - use arrow to see all options
- Eg. choose Vanilla 
- Select a variant
- Eg. choose JavaScript 
- Change to your project folder - type: <pre>cd yourProject</pre>
- Get the ZIM package and dependencies - type: <pre>npm i zimjs</pre>

B. TEMPLATE<br>
- replace the code in main.js with the template:
```javascript
// ZIM - JavaScript Canvas Framework - https://zimjs.com - code creativity
import zim from "zimjs";

// make ZIM global - if this is not used then would use zim.Frame() and zim.Circle()
zimplify();

// or make all globals except need to use zim.Blob and zim.Window
// these are two classes that have occassionally conflicted with other libraries
// zimplify(["Blob", "Window"]);

// See Docs under Frame for FIT, FILL, FULL, and TAG
new Frame(FIT, 1024, 768, light, dark, ready);
function ready() {
    
    // given F (Frame), S (Stage), W (width), H (height)
    // put code here
    
    new Circle(100, purple)
        .center()
        .drag();
        
} // end ready
```
- or with TypeScript - replace the src/main.ts code with:
```javascript
// ZIM - JavaScript Canvas Framework - https://zimjs.com - code creativity
import {Frame, Circle} from "zimjs";

// See Docs under Frame for FIT, FILL, FULL, and TAG
new Frame(FIT, 1024, 768, light, dark, ready);
function ready() {
    
    // given F (Frame), S (Stage), W (width), H (height)
    // put code here
    
    new Circle(100, purple)
        .center()
        .drag();
        
} // end ready
```
- In the index.html file, optionally replace the Vite icon with:
```html
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="https://zimjs.com/icons/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://zimjs.com/icons/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://zimjs.com/icons/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://zimjs.com/icons/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="https://zimjs.com/icons/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://zimjs.com/icons/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="https://zimjs.com/icons/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://zimjs.com/icons/apple-touch-icon-152x152.png" />
<link rel="apple-touch-icon-precomposed" sizes="180x180" href="https://zimjs.com/icons/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="https://zimjs.com/icons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="192x192" href="https://zimjs.com/icons/android-chrome-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="https://zimjs.com/icons/android-chrome-512x512.png" />
```
- Replace the title with your app title

C. DEVELOPMENT 
- Start a Dev server - type: <pre>npm run dev</pre>
- Alt-click the Local link in the terminal 
- This opens up a browser to see the file with the purple circle
- Make edits to your ZIM app
  - See https://zimjs.com/learn for how to use ZIM 
  - See https://zimjs.com/docs for reference to commands
- When done developing use CTRL C to exit the dev terminal

D. DEPLOYMENT
- Bundle the files for distribution - type:<pre>npm run build</pre> 
- This makes a dist/ folder with the minified code 
- Currently, Vite puts the js code in /assets/ 
- Which means to run it in a browser, it needs to be in the root 
- Or you can remove the / and use assets/ to run relatively
- like with "open in default browser" extension locally
- For local images and sounds see https://zimjs.com/tips.html#IMAGES 

E. NOTICE 
- ZIM is a front-end framework at https://zimjs.com
- We make so much without npm at all... 
- You can avoid all of the above by going to https://zimjs.com/code 
- pressing the copy button and pasting into an empty html file
- Then view the html file in a browser
- This takes 1 minute and kids can do it
- You can also use ZIM online at https://zimjs.com/editor

F. OTHER FRAMEWORKS 
- See the sections below for using ZIM with other frameworks
- The setup is the same as above but the app code is as follows

## VUE, SVELTE, REACT, ANGULAR

![html_JavaScript_Frameworks](https://github.com/danzen/zimjs/assets/380281/318f3b45-8a27-45f4-886c-62706e0f2b93)

ZIM can be used in other frameworks. Thank you <a href=https://github.com/yoanhg421>@yoanhg421</a> for the setup<br>
See https://github.com/yoanhg421/zimjs-templates for full files.<br>
Follow the SETUP instructions above and then adjust the code as follows:<br>
### VUE - with zim namespace
```javascript
<script setup>  
  import { onMounted, onBeforeUnmount } from "vue";
  import zim from "zimjs";

  let frame;
  onMounted(() => {
    frame = new zim.Frame({
      scaling: "zim",
      width: 500,
      height: 400,
      color:light,
      ready: () => {
          // put code here
          new zim.Circle(50, red).center().drag();
      }
    });
  });

  onBeforeUnmount(() => {
    frame.dispose();
  });  
</script>

<template>
  <div id="zim"></div>
</template>

<style>
</style>
```
### VUE - without zim namespace 
```javascript
<script setup>  
  import { onMounted, onBeforeUnmount } from "vue";
  import zim from "zimjs";

  zim.zimplify(); // make zim commands global

  let frame;
  onMounted(() => {
    frame = new Frame({
      scaling: "zim",
      width: 500,
      height: 400,
      color:light,
      ready: () => {
          // put code here
          new Circle(50, red).center().drag();
      }
    });
  });

  onBeforeUnmount(() => {
    frame.dispose();
  });  
</script>

<template>
  <div id="zim"></div>
</template>

<style>
</style>
```
### SVELTE - with zim namespace and Typescript
```javascript
<script lang="ts">  
  import { onMount, onDestroy } from "svelte";
  import zim from "zimjs";

  let frame: Frame;
  onMount(() => {
    frame = new zim.Frame({
      scaling: "zim",
      width: 500,
      height: 400,
      color:light,
      ready: () => {
          // put code here
          new zim.Circle(50, red).center().drag();
      }
    });
    function ready() {
      // put code here
      new zim.Circle(50, red).center().drag();
    }
  });

  onDestroy(() => {
    frame.dispose();
  });
</script>

<main>
  <div id="zim">
</main>

<style>
</style>
```
### SVELTE - without zim namespace and no Typescript
```javascript
<script>  
  import { onMount, onDestroy } from "svelte";
  import zim from "zimjs";

  zim.zimplify(); // make zim commands global
  
  let frame;
  onMount(() => {
    frame = new Frame({
      scaling: "zim",
      width: 500,
      height: 400,
      color:light,
      ready: () => {
          // put code here
          new Circle(50, red).center().drag();
      }
    });
  });

  onDestroy(() => {
    frame.dispose();
  });
</script>

<main>
  <div id="zim">
</main>

<style>
</style>
```
### REACT - with zim namespace
```javascript
import { Component, ReactNode, StrictMode } from "react";
import "./App.css";
import zim from "zimjs";

class ZimFrame extends Component {
  frame: zim.Frame | undefined;

  componentDidMount(): void {
      this.frame = new zim.Frame({
        scaling: "zim",
        width: 500,
        height: 400,
        color:light,
        ready: () => {
            // put code here
            new zim.Circle(50, red).center().drag();
        }
      });
  }
  componentWillUnmount(): void {
      this.frame?.dispose();
  }
  render(): ReactNode {
      return null;
  }
}

function App() {
  return (
      <>
      <div>
          {/* Move StrictMove from the root to here */}
          <StrictMode>
          <div id='zim'></div>
          </StrictMode>
          {/* Include ZIM code outside StrictMode */}
          <ZimFrame />
      </div>
      </>
  )
}
export default App;
```
### REACT - without zim namespace
```javascript
import { Component, ReactNode, StrictMode } from "react";
import "./App.css";
import zim from "zimjs";

zim.zimplify(); // make zim commands global

class ZimFrame extends Component {
  frame: Frame | undefined;

  componentDidMount(): void {
      this.frame = new Frame({
        scaling: "zim",
        width: 500,
        height: 400,
        color:light,
        ready: () => {
            // put code here
            new Circle(50, red).center().drag();
        }
      });
  }
  componentWillUnmount(): void {
      this.frame?.dispose();
  }
  render(): ReactNode {
      return null;
  }
}

function App() {
  return (
      <>
      <div>
          {/* Move StrictMove from the root to here */}
          <StrictMode>
          <div id='zim'></div>
          </StrictMode>
          {/* Include ZIM code outside StrictMode */}
          <ZimFrame />
      </div>
      </>
  )
}
export default App;
```
### ANGULAR - with zim namespace and TypeScript (always)
```javascript
import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { Frame, Circle } from 'zimjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, AfterContentInit {
  frame: Frame | undefined;
  ngOnDestroy(): void {
    this.frame?.dispose();
  }

  ngAfterContentInit(): void {
    this.frame = new Frame({
      scaling: FIT,
      width: 600,
      height: 300,
      ready: () => {
        new Circle(50, red).center().drag();
      },
    });
  }

  title = 'ZIM in Angular';
}
```

## Issues & Community
You are welcome to add issues here but we tend to use our Forum for issues and support<br>
We would love to see you there!<br>
https://forum.zimjs.com<br> 
<br>
You are welcome to join us on Discord as well<br>
https://zimjs.com/discord<br>
<br>
An easy view of updates can be found here:<br>
https://zimjs.com/updates.html

## Dependencies
ZIM is powered by the robust CreateJS Library and adds many conveniences, components and controls.<br>
Cheers to Grant, Lanny and the CreateJS Team!<br>
https://createjs.com - here is the <a href=https://github.com/danzen/createjs>ZIM version of CreateJS</a> 
 
## Authors
* **Dr Abstract (Inventor Dan Zen)**<br>
Canadian New Media Awards Programmer of the Year<br>
Canadian New Media Awards Educator of the Year<br>
https://zimjs.com/interactivemedia<br>
Hamilton Arts Awards for Media Arts<br>
http://danzen.com - Museum of Interactive Works

## License
This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details

## Acknowledgments
* Thanks to the folks here and on Slack with reports, requests and enthusiasm!
* Thanks Sheridan College and the Interactive Media Post Grad Program for the testing grounds!
* Thanks to family for keeping me active in the "real world"
* Thanks for giving us a STAR on GitHub!
