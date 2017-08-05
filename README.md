# Managing-the-properties-of-pseudo-elements
The plugin allows you to add, change and get properties of pseudo-elements.

## JavaScript version

Changing a single property:

```ruby
// Before
element.styleBefore(parameter, value);
// After
element.styleAfter(parameter, value);
```

Changing several properties:

```ruby
// Before
element.styleBefore({parameter: value, parameter: value});
// After
element.styleAfter({parameter: value, parameter: value});
```

You can also specify parameter values using the function:

```ruby
// Before
element.styleBefore(parameter, function() {
  return 1 + 1;
});
// After
element.styleAfter(parameter, function() {
  return 2 + 2;
});
```

Getting the value of the parameter:

```ruby
// Before
var valueBefore = element.styleBefore(parameter);
// After
var valueAfter = element.styleAfter(parameter);
```

## JQuery version

Changing a single property:

```ruby
// Before
$(element).cssBefore(parameter, value);
// After
$(element).cssAfter(parameter, value);
```

Changing several properties:

```ruby
// Before
$(element).cssBefore({parameter: value, parameter: value});
// After
$(element).cssAfter({parameter: value, parameter: value});
```

You can also specify parameter values using the function:

```ruby
// Before
$(element).cssBefore(parameter, function() {
  return 1 + 1;
});
// After
$(element).cssAfter(parameter, function() {
  return 2 + 2;
});
```

Getting the value of the parameter:

```ruby
// Before
var valueBefore = $(element).cssBefore(parameter);
// After
var valueAfter = $(element).cssAfter(parameter);
```
