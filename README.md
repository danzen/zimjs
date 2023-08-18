# ZIM 
![npm](https://img.shields.io/npm/v/zimjs.svg) ![GitHub](https://img.shields.io/badge/license-MIT-green.svg)
[![Discord](https://img.shields.io/discord/782972112646307881)](https://discord.com/invite/KczUuFkZdk)

JavaScript Canvas Framework - Code Creativity!<br>
https://zimjs.com

A consistent, complete, simple and colorful Canvas Framework that provides quick visual results.  ZIM is great for learning to code but also powerful for professionals to make games, apps, art and more for desktop and mobile!

Please see the About section for why we use ZIM to make Interactive Media.<br>
https://zimjs.com/about.html

## Examples
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
Here is ZIM on NPM: https://www.npmjs.com/package/zimjs
Use: 
```javascript
import zim from "zimjs";
// or 
import {Frame, Circle} from "zimjs";

// to remove the zim namespace requirement on all use:
zim.zimplify();

// or make all globals but use zim.Blob and zim.Window (two potential culprits)
zim.zimplify([Blob, Window]);
```

## VUE, SVELTE, REACT, ANGULAR
ZIM can be used in other frameworks. Thank you <a href=https://github.com/yoanhg421>@yoanhg421</a> for the setup<br>
See https://github.com/yoanhg421/zimjs-templates for full files.<br>
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
          new zim.Circle(50, red).center().drag();
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
You are welcome to add issues here but we tend to use Slack at for issues and support<br>
We would love to see you there!<br>
https://zimjs.com/slack<br> 
<br>
You are welcome to join us on Discord as well<br>
https://zimjs.com/discord<br>
<br>
An easy view of updates can be found here:<br>
https://zimjs.com/updates.html

## Dependencies
ZIM is powered by the robust CreateJS Library and adds many conveniences, components and controls.<br>
Cheers to Grant, Lanny and the CreateJS Team!<br>
https://createjs.com
 
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
