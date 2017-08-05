(function () {
    'use string';
    
    document.pseudoElements = { length: 0 };

    var setPseudoElement = function (parameters) {
        if (typeof parameters.argument === 'object' || (parameters.argument !== undefined && parameters.property !== undefined)) {
            if (!parameters.element.pseudoElements) parameters.element.pseudoElements = { styleSheet: null, before: { index: null, properties: null }, after: { index: null, properties: null }, id: null };

            var selector = (function () {
                if (parameters.element.pseudoElements.id !== null) {
                    if (Number(parameters.element.getAttribute('data-pe--id')) !== parameters.element.pseudoElements.id) parameters.element.setAttribute('data-pe--id', parameters.element.pseudoElements.id);
                    return '[data-pe--id="' + parameters.element.pseudoElements.id + '"]::' + parameters.pseudoElement;
                } else {
                    var id = document.pseudoElements.length;
                    document.pseudoElements.length++

                    parameters.element.pseudoElements.id = id;
                    parameters.element.setAttribute('data-pe--id', id);

                    return '[data-pe--id="' + id + '"]::' + parameters.pseudoElement;
                };
            })();

            if (!parameters.element.pseudoElements.styleSheet) {
                if (document.styleSheets[0]) {
                    parameters.element.pseudoElements.styleSheet = document.styleSheets[0];
                } else {
                    var styleSheet = document.createElement('style');

                    document.head.appendChild(styleSheet);
                    parameters.element.pseudoElements.styleSheet = styleSheet.sheet;
                };
            };

            if (parameters.element.pseudoElements[parameters.pseudoElement].properties && parameters.element.pseudoElements[parameters.pseudoElement].index) {
                parameters.element.pseudoElements.styleSheet.deleteRule(parameters.element.pseudoElements[parameters.pseudoElement].index);
            };

            if (typeof parameters.argument === 'object') {
                parameters.argument = (function() {
                    var cloneObject = typeof parameters.argument.pop === 'function' ? [] : {};

                    for (var property in parameters.argument) {
                        cloneObject[property] = parameters.argument[property];
                    };

                    return cloneObject;
                })();

                if (!parameters.element.pseudoElements[parameters.pseudoElement].properties && !parameters.element.pseudoElements[parameters.pseudoElement].index) {
                    var newIndex = parameters.element.pseudoElements.styleSheet.rules.length || parameters.element.pseudoElements.styleSheet.cssRules.length || parameters.element.pseudoElements.styleSheet.length;

                    parameters.element.pseudoElements[parameters.pseudoElement].index = newIndex;
                    parameters.element.pseudoElements[parameters.pseudoElement].properties = parameters.argument;
                };

                var properties = '';

                for (var property in parameters.argument) {
                    if (typeof parameters.argument[property] === 'function')
                        parameters.element.pseudoElements[parameters.pseudoElement].properties[property] = parameters.argument[property]();
                    else
                        parameters.element.pseudoElements[parameters.pseudoElement].properties[property] = parameters.argument[property];
                };

                for (var property in parameters.element.pseudoElements[parameters.pseudoElement].properties) {
                    properties += property + ': ' + parameters.element.pseudoElements[parameters.pseudoElement].properties[property] + ' !important; ';
                };

                parameters.element.pseudoElements.styleSheet.addRule(selector, properties, parameters.element.pseudoElements[parameters.pseudoElement].index);
            } else if (parameters.argument !== undefined && parameters.property !== undefined) {
                if (!parameters.element.pseudoElements[parameters.pseudoElement].properties && !parameters.element.pseudoElements[parameters.pseudoElement].index) {
                    var newIndex = parameters.element.pseudoElements.styleSheet.rules.length || parameters.element.pseudoElements.styleSheet.cssRules.length || parameters.element.pseudoElements.styleSheet.length;

                    parameters.element.pseudoElements[parameters.pseudoElement].index = newIndex;
                    parameters.element.pseudoElements[parameters.pseudoElement].properties = {};
                };

                if (typeof parameters.property === 'function')
                    parameters.element.pseudoElements[parameters.pseudoElement].properties[parameters.argument] = parameters.property();
                else
                    parameters.element.pseudoElements[parameters.pseudoElement].properties[parameters.argument] = parameters.property;

                var properties = '';

                for (var property in parameters.element.pseudoElements[parameters.pseudoElement].properties) {
                    properties += property + ': ' + parameters.element.pseudoElements[parameters.pseudoElement].properties[property] + ' !important; ';
                };

                parameters.element.pseudoElements.styleSheet.addRule(selector, properties, parameters.element.pseudoElements[parameters.pseudoElement].index);
            };
        } else if (parameters.argument !== undefined && parameters.property === undefined) {
            var windowStyle = window.getComputedStyle(
                parameters.element, '::' + parameters.pseudoElement
            ).getPropertyValue(parameters.argument);

            if (parameters.element.pseudoElements) {
                return parameters.element.pseudoElements[parameters.pseudoElement].properties[parameters.argument] || windowStyle;
            } else {
                return windowStyle || null;
            };
        } else {
            console.error('Invalid values!');
            return false;
        };
    };

    Object.defineProperty(Element.prototype, 'styleBefore', {
        enumerable: false,
        value: function(argument, property) {
            return setPseudoElement({
                element: this,
                pseudoElement: 'before',
                argument: argument,
                property: property
            });
        }
    });
    Object.defineProperty(Element.prototype, 'styleAfter', {
        enumerable: false,
        value: function(argument, property) {
            return setPseudoElement({
                element: this,
                pseudoElement: 'after',
                argument: argument,
                property: property
            });
        }
    });
})();
