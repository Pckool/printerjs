/*
* Element Printer
*
* Copyright (c) 2020 Philippe Clesca
*
* Forked from print-html-element (https://github.com/rpdasilva/print-html-element)
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*/
interface PrintOptions {
    printMode: string | undefined;
    pageTitle: string | undefined;
    templateString: string | undefined;
    popupProperties: string | undefined;
    closePopup: boolean | undefined;
    stylesheets: string | string[] | undefined;
    styles: string | string[] | undefined;
}
function ElementPrinter() {
    function printElement(element: Element, opts: PrintOptions) {
        let elementHtml: string = element.outerHTML;

        _print(elementHtml, opts);
    }

    function printHtml(html: string, opts: PrintOptions): void {
        _print(html, opts);
    }

    function _print(html: string, _opts: PrintOptions) {
        
        let opts: PrintOptions = {
            printMode: _opts?_opts.printMode:undefined || '',
            pageTitle: _opts?_opts.pageTitle:undefined || '',
            templateString: _opts?_opts.templateString:undefined || '',
            popupProperties: _opts?_opts.popupProperties:undefined || '',
            closePopup: _opts?_opts.closePopup:undefined || true,
            stylesheets: _opts?_opts.stylesheets:undefined || null,
            styles: _opts?_opts.styles:undefined || null
        };

        // Get markup to be printed
        let markup: string = _getMarkup(html, opts);
        let printWindow: any;
        let printIframe: any;
        let printDocument: any;
        let printElementID: string;
        let DOM: any = document;

        if (opts.printMode.toLowerCase() === 'popup') {
            printWindow = window.open('about:blank', 'printElementWindow', opts.popupProperties);
            printDocument = printWindow.document;
        } else {
            //The random ID is to overcome a safari bug
            // http://www.cjboco.com.sharedcopy.com/post.cfm/442dc92cd1c0ca10a5c35210b8166882.html
            printElementID = 'printElement_' + (Math.round(Math.random() * 99999)).toString();

            printIframe = document.createElement('iframe');
            printIframe.setAttribute('id', printElementID);
            printIframe.setAttribute('src', 'about:blank');
            printIframe.setAttribute('frameBorder', '0');
            printIframe.setAttribute('scrolling', 'no');
            printIframe.setAttribute('style', 'position:fixed;bottom:100%;right:100%;');

            DOM.body.appendChild(printIframe);

            printDocument = (printIframe.contentWindow || printIframe.contentDocument);
            if (printDocument.document) {
                printDocument = printDocument.document;
            }

            printIframe = DOM.frames ? DOM.frames[printElementID] : DOM.getElementById(printElementID);
            printWindow = printIframe.contentWindow || printIframe;
        }

        focus();
        printDocument.open();

        // SetTimeout fixes Issue #9 (iframe printMode does not work in firefox)
        setTimeout(function() {
          printDocument.write(markup);
          printDocument.close();
        });

        _callPrint(printWindow, printIframe, opts.closePopup);
    }

    function _callPrint(printWindow: any, iframe: Element, closePopup: boolean) {
        console.log('calling Print...');
        if (printWindow && printWindow.printPage) {
            printWindow.printPage();

            if (iframe && closePopup) {
                // Remove iframe after printing
                document.body.removeChild(iframe);
            }
        }
        
        else {
            setTimeout(function() {
                _callPrint(printWindow, iframe, closePopup);
            }, 50);
        }
    }

    function _getBaseHref() {
        let port: string = (window.location.port) ? ':' + window.location.port : '';
        return window.location.protocol + '//' + window.location.hostname + port + window.location.pathname;
    }

    function _getMarkup(elementHtml: string, opts: PrintOptions) {
        let template = opts.templateString;
        let templateRegex = new RegExp(/{{\s*printBody\s*}}/gi);
        let stylesheets: string[] | undefined;
        let styles: string[] | undefined;
        let html: string[] = [];

        if(template && templateRegex.test(template)) {
            elementHtml = template.replace(templateRegex, elementHtml);
        }

        html.push('<html><head><title>' + (opts.pageTitle || '') + '</title>');

        // If stylesheet URL's or list of stylesheet URL's are specified, override page stylesheets
        if (opts.stylesheets) {
            stylesheets = Array.isArray(opts.stylesheets) ? opts.stylesheets : [opts.stylesheets];
        } else {
            stylesheets = Array.prototype.slice
                .call(document.getElementsByTagName('link'))
                .map(function(link: any) {
                    return link.href;
                });
        }

        stylesheets.forEach(function(href: string) {
            html.push('<link rel="stylesheet" href="' + href + '">');
        });

        // If inline styles or list of inline styles are specified, override inline styles
        if (opts.styles) {
            styles = Array.isArray(opts.styles) ? opts.styles : [opts.styles];
        } else {
            styles = Array.prototype.slice
                .call(document.getElementsByTagName('style'))
                .map(function(style: Element) {
                    return style.innerHTML;
                });
        }
 
        styles.forEach( (style: string) => {
            html.push('<style type="text/css">' + style + '</style>');
        });

        // Ensure that relative links work
        html.push('<base href="' + _getBaseHref() + '" />');
        html.push('</head><body class="pe-body">');
        html.push(elementHtml);
        html.push('<script type="text/javascript">function printPage(){focus();print();' + ((opts.printMode.toLowerCase() == 'popup' && opts.closePopup) ? 'close();' : '') + '}</script>');
        html.push('</body></html>');

        return html.join('');
    }

    return {
        printElement: printElement,
        printHtml: printHtml
    };
};

module.exports = ElementPrinter();
