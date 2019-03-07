Deroute
=======

Deroute is a micro client-side router for the browser. It works a little differently than most client-side routers. In fact, it can be used without any JavaScript at all. It takes advantage of the way browsers treat [fragment identifiers](https://en.wikipedia.org/wiki/Fragment_identifier) and the [target pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:target). Elements are tagged with a `data-view` [data attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) and all but the active target are hidden.

There are two APIs for using deroute. One part is HTML and one part is JavaScript.

## HTML API
In the body of an HTML document, tag a bunch of sibling elements with ids that match the name of the route. This would work best with static content, like a slide presentation.
```html
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="deroute.css" />
  </head>
  <body>
    <main>
      <article id="view-1" data-view>
        <h1>View One</h1>
        <a href="#view-2">Goto View Two</a>
        <a href="#view-3">Goto View Three</a>
      </article>
      <article id="view-2" data-view>
        <h1>View Two</h1>
        <a href="#view-1">Goto View One</a>
        <a href="#view-3">Goto View Three</a>        
      </article>
      <article id="view-3" data-view>
        <h1>View Three</h1>
        <a href="#view-1">Goto View One</a>
        <a href="#view-2">Goto View Two</a>        
      </article>
    </main>
  </body>
</html>
```
Starting at `some-url.com/#view-1` the user can click all of the links and the browser will handle all of the history state. The single CSS rule will display the view that is the current target and hide all the others. With only HTML and CSS it is not possible to have a root route, so the url will have to have a fragment identifier. If a root route is required, add the JavaScript library. Also, the browser will scroll to the active target, which is sometimes undesirable. If only using the HTML API, make sure the content isn't so long that the the browser creates scroll bars.

## JavaScript API
First off, install deroute.
```bash
npm install --save deroute
```
Then include the single zero-dependency JavaScript file, and this opens up some more possibilities. It's written as a [UMD module](https://github.com/umdjs/umd) in [ES5](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition) so there is no need to compile anything. Include it in a script tag and it will end up at `window.Router`. It will also work if wrapped up and required or imported.

There are three different functions to handle a few scenarios. Here they are in a nutshell.
```javascript
import Router from 'deroute';

Router.register((match, root, any) => {
  root('#view-1');                     // redirects `/` to `/#view-1`

  any(function(url, e) {               // callback fires everytime the url hash changes
  });
  
  match('#view-1', function(url, e) {  // callback fires when hash matches `view-1`
  });
});
```
In the HTML example, there was only static content. These callbacks allow for some JavaScript rendering to happen. Each elment with a matching id must be in the [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) prior to the route being called. How it gets there does not matter as long as it is there. As a consequence, deroute is framework agnostic as long as the element is there. A [template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) could be cloned and inserted into the container view, or maybe a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) call could throw some content in the container. As long as the container is there, the callback can do whatever it wants to get the content into the container. See [the tests](https://github.com/chrishalebarnes/deroute/blob/master/test/deroute.test.js) and [the demo page](https://github.com/chrishalebarnes/deroute/blob/master/demo/index.html) for a few more examples.

## License and Copyright

Licensed under the MIT license. See [LICENSE](https://github.com/chrishalebarnes/deroute/blob/master/LICENSE)

