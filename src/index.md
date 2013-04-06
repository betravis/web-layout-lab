---
---
[flexbox-spec]: http://dev.w3.org/csswg/css-flexbox/
[grid-spec]: http://dev.w3.org/csswg/css-grid/
[regions-spec]: http://dev.w3.org/csswg/css-regions/
[exclusions-spec]: http://dev.w3.org/csswg/css-exclusions/
[components-spec]: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html

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

Specification ([http://dev.w3.org/csswg/css-flexbox/][flexbox-spec])

Children of a container with `display: flex` can lay out in any direction, wrap, and flexibly grow or shrink their sizes to fit the available space. Open the example file in Chrome Canary to see two different potential FlexBox layouts.

### FlexBox Exercise

*Goal:* Simulate a paged multicolumn layout using FlexBox

1.  Create a FlexBox container with 9 children
    Under the `.flexbox` selector, add
    * `display: -webkit-flex` to mark this block for Flexible Box layout
    * `-webkit-flex-wrap: wrap` to wrap children onto the next line if they don't fit
    * `height: 100%; max-height: 100%` to size the FlexBox to the viewport
2. Flex children should be at most as tall as the viewport
    Under the `.flexbox > *` selector
3. Flex children should have a starting width of 350px (including 25px of padding)
4. Flex children should grow to fill extra space
5. Flex children should not shrikn below 350 px
6. Make it responsive
    * For sizes >= 700px, apply the above formatting
    * Otherwise, use a single automatically sized block

## 02 Grid Layout

The Grid Layout Specification ([http://dev.w3.org/csswg/css-grid/][grid-spec])

## 03 Regions

The Regions Specification ([http://dev.w3.org/csswg/css-regions/][regions-spec])

## 04 Exclusions

The Exclusions Specification ([http://dev.w3.org/csswg/css-exclusions/][exclusions-spec])

## 05 Bonus Round

The Web Components Specification ([https://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html][components-spec])
## 06 Results
