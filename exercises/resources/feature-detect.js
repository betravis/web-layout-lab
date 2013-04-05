(function(){
    var isEnabled = function() {
        var el = document.createElement('div');
        if (!el)
            return;

        // intentional bias towards -webkit because the prototype uses 
        // code under prefixed notation that is still being debated in the W3C
        el.style.setProperty('-webkit-shape-inside', 'rectangle(0, 0, 0, 0)');
        el.style.setProperty('-webkit-shape-outside', 'rectangle(0, 0, 0, 0)');
        el.style.setProperty('-webkit-flow-from', 'article');
        el.style.setProperty('-webkit-flex-grow', '1');
        el.style.setProperty('-webkit-grid-before', '1');
        
        return (el.style.getPropertyValue('-webkit-shape-inside')
            && el.style.getPropertyValue('-webkit-shape-outside')
            && el.style.getPropertyValue('-webkit-flow-from')
            && el.style.getPropertyValue('-webkit-flex-grow')
            && el.style.getPropertyValue('-webkit-grid-before'));
    }

    var checkSupport = function() {
        if (isEnabled())
            return;
        createWarning();
    }

    var createWarning = function() {
        var warning = document.createElement('div');
        warning.setAttribute('class', 'feature-detect-error');

        var style = document.createElement('style');
        style.innerHTML = 
        '.feature-detect-error {\
            background-color: #f2dede;\
            padding: .5em;\
            color: #b94a48;\
            margin: 1em;\
            border-radius: .5em;\
        }';
        document.getElementsByTagName('head')[0].appendChild(style);

        var content = [];
        content.push('<p>');
        content.push('<strong>Warning:</strong> You need to use the Chrome Canary browser with experimental WebKit features enabled to see these examples working correctly. See <a href="http://adobe.github.com/web-platform/samples/css-exclusions/index.html#browser-support">here</a> for more info.');
        content.push('</p>');
        warning.innerHTML = content.join('');
        document.body.insertBefore(warning, document.body.children[0]);
    }

    document.addEventListener('DOMContentLoaded', checkSupport)
})()