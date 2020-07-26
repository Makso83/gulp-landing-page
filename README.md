# Gulp enviroment
This setup is aimed to make it easier to build landing pages and simlpe web applications. It's 'ready to use' and usually need no setup.

## Main Features

### HTML
- It builds together your HTML snippets. Just use `@@include(relative-path-to-snippet)`. See details on [NPM gulp-file-include](https://www.npmjs.com/package/gulp-file-include).
- It automatically changes all the `img` tags to `picture` aimed on using **webp** images. You can read more on [NPM gulp-webp-html](https://www.npmjs.com/package/gulp-webp-html).
- It also minimizes you HTML to achive faster loading.

*To use HTML features separatly execute*
```
gulp html
```

### CSS
*NOTE: at the moment this setup works with **SASS** only*
- It converts *.scss file into *.css.
- It automatically adds ability to use webp in css where it is possible.
- It also minimizes your css file as well.
- It automatically adds prefixes for all-browser-compability.

*To use CSS features separatly execute*
```
gulp sass
```

### JavaScript
- Babel plugin is set up and configured. It uses `@babel/preset-env`. Usually it's enough for simple web applications.
- It minimizes your JS-code.

*To use JS features separatly execute*
```
gulp js
```

### Images
- It compresses images.
- It converts images to webp where possible, so on output you get both types.

## How it works
We suggest following structure for source files:
```
|-src
    |---html
    |---scss
    |---js
    |---img
    |---index.html
```
All of the files in project should be placed in relative folders. After you start gulp by executing
```
gulp
```
it will create new folder `build` and copy there all your source files modified, minimized, optimized etc. So you will have a ready-for-production folder.
Next time your run `gulp` it will call `clear` function to remove all the files and folders from your `build` folder. You can clean `build` folder by yourself using
```
gulp clear
```
## Live server
After using `gulp` and maintaining all the changes, gulp will start live server and run several watchers to monitor all the changes in your `html`, `css` and `js` files. All the changes will reload server so you'll see them immediately. to stop server use `CTL+C (Command+C)`.