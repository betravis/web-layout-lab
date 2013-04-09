---
layout: default
title: Layout Lab Instructions
styleIncludes:
 - http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic
 - http://fonts.googleapis.com/css?family=Source+Code+Pro
style: |
    <style>
    body { font-family: 'Source Sans Pro', sans-serif; }
    code { font-family: 'Source Code Pro', monospace; background-color: #d3d3d3; }
    a { text-decoration: none; color: #4c70a3; }
    @media print {
        a { color: black; }
        a[href]:after {
            color: black;
            font-weight: normal;
            font-size: .8em;
            content: " [" attr(href) "] ";
        }
    }
    @media screen {
        a:before { content: ' [';} a:after { content: '] ';}
    }
    </style>
---
[flexbox-spec]: http://dev.w3.org/csswg/css-flexbox/
[flexbox-example]: 01-FlexBox/flexbox-example.html
[flexbox-exercise]: 01-FlexBox/flexbox-exercise.html

[grid-spec]: http://dev.w3.org/csswg/css-grid/
[grid-example]: 02-Grid/grid-example.html
[grid-exercise]: 02-Grid/grid-exercise.html

[regions-spec]: http://dev.w3.org/csswg/css-regions/
[regions-example]: 03-Regions/regions-example.html
[regions-exercise-01]: 03-Regions/regions-exercise-01.html
[regions-exercise-02]: 03-Regions/regions-exercise-02.html

[exclusions-spec]: http://dev.w3.org/csswg/css-exclusions/
[exclusions-example]: 04-Exclusions/exclusions-example.html
[exclusions-exercise-01]: 04-Exclusions/exclusions-exercise-01.html
[exclusions-exercise-02]: 04-Exclusions/exclusions-exercise-02.html

[components-spec]: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html
[components-example]: 05-BonusRound/components-example.html
[components-exercise]: 05-BonusRound/components-exercise.html

[components-result]: 06-Results/components-exercise.html
[flexbox-result]: 06-Results/exclusions-exercise-01-result.html
[grid-result]: 06-Result/exclusions-exercise-02-result.html

[shape-utility]: resources/shape-utility.html

# Layout on the Web: What's New

Welcome to the MAX web layout lab. We are going to build a a couple different page layouts using the FlexBox
and Grid Layout modules, and then experiment with flowing text through them with Regions and Exclusions. Although
each exercise is part of a sequence, you can start at any point without completing the previous exercises. If
you fall behind, don't worry, you can always start fresh on the next exercise (or cheat and view the solutions).

Each folder contains an example of the features that will be used, followed by a series of exercises. You
should only need to work in the area marked "WORK HERE".

Getting Started:
1.  Open Chrome Canary
2.  In Chrome Canary, navigate to `about://flags`
    * Make sure `Experimental Web Platform Features` is enabled
    * If you enabled `Experimental Web Platform Features` above, restart your browser
5.  Open up Brackets
6.  In Brackets up the Layout Lab Exercises folder

## 01 FlexBox Layout

### [Specification][flexbox-spec]

Children of a container with `display: flex` can lay out in any direction, wrap, and flexibly grow or shrink their sizes to fit the available space.

### [FlexBox Example][flexbox-example]

Open the example file in Chrome Canary to see two different potential FlexBox layouts.

### [FlexBox Exercise][flexbox-exercise]

*Goal:* Simulate a paged multicolumn layout using FlexBox

1.  Create a FlexBox layout container

    Under the `.flexbox` selector, add
    * `display: -webkit-flex` to mark this block for Flexible Box layout
    * `-webkit-flex-wrap: wrap` to wrap children onto the next line if they don't fit
    * `height: 100%; max-height: 100%` to size the FlexBox to the viewport
2.  Set the initial dimensions of the FlexBox children

    Under the `.flexbox > *` selector, add
    * `width: 350px` (`box-sizing: border-box` is already set)
    * `padding: 25px`
    * `height: 100%`
3. Describe how the FlexBox children grow and shrink
    * `-webkit-flex-grow: 1`
    * `-webkit-flex-shrink: 0`
4. Make it responsive 
    * Add `and (min-width: 700px)` to the media query
    * Move the above styles into the media query
    * Outside the media query, add `.flexbox > *:first-child { padding: 25px; }`

## 02 Grid Layout

### [Specification][grid-spec]

A container with `display: grid` creates a grid of fixed or flexibly sized rows and columns. Children can then align and size themselves to the grid.

### [Grid Example][grid-example]

Open the example file in Chrome Canary to see a simple application-style layout with a header, content area, and two footers.

### [Grid Exercise][grid-exercise]

*Goal:* Create a responsive two column grid layout with an inset

1. Create a Grid layout container

    Under `.grid`, add
    * `display: -webkit-grid`
    * `-webkit-grid-columns: 25% 25% 25% 25%`
    * `-webkit-grid-rows: 33% 34% 33%`
    * `width: 100%`
    * `height: 100%`
2. Position the two columns

    Under `.one, .two`, add
    * `-webkit-grid-before: 1`
    * `-webkit-grid-after: 1`

    Under `.one`, add
    * `-webkit-grid-start: 1`
    * `-webkit-grid-end: 3`

    Under `.two`, add
    * `-webkit-grid-start: 3`
    * `-webkit-grid-end: 1`
3. Position the inset

    Under `.inset`, add
    * `-webkit-grid-before: 2`
    * `-webkit-grid-after: 2`
    * `-webkit-grid-start: 2`
    * `-webkit-grid-end: 2`
4. Add a simplified reduced-width layout

    Add `and (max-width: 600px)` to the media query

    Under the media query, add

    `.one`
    * `-webkit-grid-beofre: 1`
    * `-webkit-grid-after: 3`
    * `-webkit-grid-start: 1`
    * `-webkit-grid-end: 1`

    `.two`
    * `-webkit-grid-before: 3`
    * `-webkit-grid-after: 1`
    * `-webkit-grid-start: 1`
    * `height: auto`

    `.inset`
    * `-webkit-grid-before: 2`
    * `-webkit-grid-after: 2`
    * `-webkit-grid-start: 1`
    * `-webkit-grid-end: 1`
5. Remove the debugging CSS

## 03 Regions

### [Specification][regions-spec]

CSS Regions allow you to flow content through multiple areas called regions.

### [Regions Example][regions-example]

Open the example to see how content can be placed into a named flow that regions can then pull from.

### [Regions Exercise 1][regions-exercise-01]

*Goal:* Flow content through your previously created FlexBox layout

1. Put content into a named flow

    Under `.content`, add

    * `-webkit-flow-into: story-flow`
2. Pull content from the above named flow

    Under `.flexbox > *`, add

    * `-webkit-flow-from: story-flow`

### [Regions Exercise 2][regions-exercise-02]

*Goal:* Flow content through your previously created Grid layout

1. Put content into a named flow

    Under `.content`, add

    * `-webkit-flow-into: story-flow`
2. Pull content from the above named flow

    Under `.one, .two`, add

    * `-webkit-flow-from: story-flow`

## 04 Exclusions

### [Specification][exclusions-spec]

CSS Exclusions allow you to customize the shape content flows inside and around.

### [Exclusions Example][exclusions-example]

Open the example to see how content can wrap inside and around a circle.

### [Exclusions Exercise 1][exclusions-exercise-01]

*Goal:* Wrap text tightly around the initial 'A' drop cap

1. Use the [shape utility][shape-utility] with `alice-a.svg` to create a shape-outside
2. Apply your shape-outside

    Under `.content:first-letter`, set `-webkit-shape-outside` to
    * Your shape-outside from step 1, or
    * `polygon(0 0, 60% 0, 80% 60%, 100% 70%, 100% 100%, 0 100%)`

### [Exclusions Exercise 2][exclusions-exercise-02]

*Goal:* Wrap text around the image inset

1. Use the [shape utility][shape-utility] with `grid-template.svg` to create two shape-insides
2. Apply your shape-insides

    Under `.one` set `-webkit-shape-inside` to
    * Your result from step 1, or
    * `polygon(0 0, 100% 0, 100% 33%, 50% 33%, 50% 67%, 100% 67%, 100% 100%, 0 100%)`

    Under `.two` set `-webkit-shape-inside` to
    * Your result from step 1, or
    * `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 67%, 50% 67%, 50% 33%, 0% 33%)`
3. Apply the shape-insides only on larger screens
    * Add `and(min-width: 600px)` to the media query
    * Move the above css inside the media query

## 05 Bonus Round

### [Web Components Specification][components-spec]

The Web Components Specification contains several different methods of factoring out presentational markup, including a new `template` element, a presentation-only shadow DOM, and custom, reusable components.

### [Bonus Round Example][components-example]

The example demonstrates the use of the shadow DOM to decorate an element without cluttering the regular DOM.

### [Bonus Round Exercise][components-exercise]

*Goal:* Create a shadow DOM for each of the `.comment` elements, and apply the `#comment-template`

1. Collect the `.comment` and `#comment-template` elements for use
    * `var comments = document.querySelectorAll('.comment')`
    * `var template = document.querySelector('#comment-template')`

2. For each of the comment elements, create a shadow DOM root node
    * `for (var i = 0; i < comments.length; i++) {`
    * `    var shadow = comments[i].webkitCreateShadowRoot()`

3. Append a copy of the template to each shadow DOM root

    * `    shadow.appendChild(template.content.cloneNode(true)) }`


## 06 Results

Check out the results folder to see the solutions for each of the exercises.

### [Web Components Result][components-result]

### [FlexBox Template Result][flexbox-result]

### [Grid Template Result][grid-result]
