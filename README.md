# PrinterJS

A module created to help with printing elements on an html page in an easy and intuative way.

Originally forked from [print-html-element](https://github.com/rpdasilva/print-html-element) continue development.

This fork's main improvement is the use of typescript over vanilla js. I will continue to itterate over this to add the intended 'future functionality' of the original author.

View examples [here](https://rpdasilva.github.io/print-html-element/)

## Installation
Print HTML Element is available on both NPM and Bower.

`npm install printerjs`

`yarn install printerjs`


## Usage


### Include
In a CommonJS module system via Browserify or Webpack
```js
    var PHE = require("printerjs");
```
or (ES)
```js
    import printer from "printerjs";
```

Good old-fashioned way
```html
    <script type="text/javascript" src="printer.js"></script>
```
```js
    // Alias global variable printHtmlElement for purposes of example
    var printer = ElementPrinter;
```

### Examples
View examples [here](https://rpdasilva.github.io/print-html-element/)

```js
    printer.printElement( document.getElementById('toPrint') );
    printer.printHtml('<h1>Let\'s print this h1</h1>');

    printer.printHtml('<h1>Let\'s print this h1</h1>', {templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>'});
```

An HTML class `pe-body` is also added to the body of the print area which can be used as an additional style hook (on top of the regular print media query/stylesheet)

### Options and methods supported
```js
    opts = {
        printMode: string;
        pageTitle: string;
        templateString: string;
        popupProperties: string;
        stylesheets: string | string[];
        styles: string | string[];
    };

    printer.printElement( elem, opts ); // Prints a DOM Element
    printer.printHtml( str, opts ); // Prints an HTML string
```

- printMode determines which method is used to print. As a hidden `iframe` (default), or `popup` window
- pageTitle sets the printed page title (defaults to blank)
- templateString allows you to define a template that the html will be printed within.
    - Use `{{printBody}}` within the template to signify where the HTML should be injected
- popupProperties set the window features (such as `menubar`, `scrollbars`, etc. in `popup` mode
- stylesheets overrides parsed `link` tags and instead injects `link` tags with hrefs specified as either a single string or array of strings
- styles overrides parsed `style` tags and instead injects `style` blocks specified as either a single string or array of strings

## Next Feature

- Promise/callback support

## Possible future features

- Integrate a template system (such as handlebars)
- Support multiple and/or custom template variables
- Support for multiple elements/HTML strings


## License

`printerjs` is [MIT licensed](LICENSE.txt)