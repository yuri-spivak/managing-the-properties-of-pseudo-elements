(function( $ ) {
    $.pseudoElements = {length: 0};

    var setPseudoElement = function (parameters) {
        if (typeof parameters.argument === 'object' || (parameters.argument !== undefined && parameters.property !== undefined)) {
            for (var element of parameters.elements.get()) {
                if (!element.pseudoElements) element.pseudoElements = { styleSheet: null, before: { index: null, properties: null }, after: { index: null, properties: null }, id: null };

                var selector = (function() {
                    if (element.pseudoElements.id !== null) {
                        if (Number(element.getAttribute('data-pe--id')) !== element.pseudoElements.id) element.setAttribute('data-pe--id', element.pseudoElements.id);
                        return '[data-pe--id="' + element.pseudoElements.id + '"]::' + parameters.pseudoElement;
                    } else {
                        var id = $.pseudoElements.length;
                        $.pseudoElements.length++

                        element.pseudoElements.id = id;
                        element.setAttribute('data-pe--id', id);

                        return '[data-pe--id="' + id + '"]::' + parameters.pseudoElement;
                    };
                })();

                if (!element.pseudoElements.styleSheet) {
                    if (document.styleSheets[0]) {
                        element.pseudoElements.styleSheet = document.styleSheets[0];
                    } else {
                        var styleSheet = document.createElement('style');

                        document.head.appendChild(styleSheet);
                        element.pseudoElements.styleSheet = styleSheet.sheet;
                    };
                };

                if (element.pseudoElements[parameters.pseudoElement].properties && element.pseudoElements[parameters.pseudoElement].index) {
                    element.pseudoElements.styleSheet.deleteRule(element.pseudoElements[parameters.pseudoElement].index);
                };

                if (typeof parameters.argument === 'object') {
                    parameters.argument = $.extend({}, parameters.argument);

                    if (!element.pseudoElements[parameters.pseudoElement].properties && !element.pseudoElements[parameters.pseudoElement].index) {
                        var newIndex = element.pseudoElements.styleSheet.rules.length || element.pseudoElements.styleSheet.cssRules.length || element.pseudoElements.styleSheet.length;

                        element.pseudoElements[parameters.pseudoElement].index = newIndex;
                        element.pseudoElements[parameters.pseudoElement].properties = parameters.argument;
                    };

                    var properties = '';

                    for (var property in parameters.argument) {
                        if (typeof parameters.argument[property] === 'function')
                            element.pseudoElements[parameters.pseudoElement].properties[property] = parameters.argument[property]();
                        else
                            element.pseudoElements[parameters.pseudoElement].properties[property] = parameters.argument[property];
                    };

                    for (var property in element.pseudoElements[parameters.pseudoElement].properties) {
                        properties += property + ': ' + element.pseudoElements[parameters.pseudoElement].properties[property] + ' !important; ';
                    };

                    element.pseudoElements.styleSheet.addRule(selector, properties, element.pseudoElements[parameters.pseudoElement].index);
                } else if (parameters.argument !== undefined && parameters.property !== undefined) {
                    if (!element.pseudoElements[parameters.pseudoElement].properties && !element.pseudoElements[parameters.pseudoElement].index) {
                        var newIndex = element.pseudoElements.styleSheet.rules.length || element.pseudoElements.styleSheet.cssRules.length || element.pseudoElements.styleSheet.length;

                        element.pseudoElements[parameters.pseudoElement].index = newIndex;
                        element.pseudoElements[parameters.pseudoElement].properties = {};
                    };

                    if (typeof parameters.property === 'function')
                        element.pseudoElements[parameters.pseudoElement].properties[parameters.argument] = parameters.property();
                    else
                        element.pseudoElements[parameters.pseudoElement].properties[parameters.argument] = parameters.property;

                    var properties = '';

                    for (var property in element.pseudoElements[parameters.pseudoElement].properties) {
                        properties += property + ': ' + element.pseudoElements[parameters.pseudoElement].properties[property] + ' !important; ';
                    };

                    element.pseudoElements.styleSheet.addRule(selector, properties, element.pseudoElements[parameters.pseudoElement].index);
                };
            };

            return $(parameters.elements);
        } else if (parameters.argument !== undefined && parameters.property === undefined) {
            var element = $(parameters.elements).get(0);

            var windowStyle = window.getComputedStyle(
	            element, '::' + parameters.pseudoElement
            ).getPropertyValue(parameters.argument);

            if (element.pseudoElements) {
                return $(parameters.elements).get(0).pseudoElements[parameters.pseudoElement].properties[parameters.argument] || windowStyle;
            } else {
                return windowStyle || null;
            };
        } else {
            console.error('Invalid values!');
            return false;
        };
    };

    $.fn.cssBefore = function (argument, property) {
        return setPseudoElement({
            elements: this,
            pseudoElement: 'before',
            argument: argument,
            property: property
        });
    };
    $.fn.cssAfter = function (argument, property) {
        return setPseudoElement({
            elements: this,
            pseudoElement: 'after',
            argument: argument,
            property: property
        });
    };
})(jQuery);
