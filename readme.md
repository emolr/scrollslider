# Scrollslider
A simple to use and roughly unstyled component that wraps content and adds buttons to navigate with smoothscrolling if content overflows horizontally.


## Install
Install the module via npm:
```
npm install scrollslider --save
```

## Import
```
...
import { ScrollsliderModule } from 'scrollslider';
...
@NgModule({
  imports: [
      ...
      ScrollsliderModule,
      ...
    ],
  ...
```

## Usage
In a template use:

```
<app-scrollslider>
  <!-- example content -->
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
    ...
  </ul>
  <!-- example content end -->
</app-scrollslider>
```

**NB.**
Make sure the content you wrap with `app-scrollslider` has `white-space: nowrap` if it's a list.

## Custom Buttons
transclude buttons:

```
<app-scrollslider>
  <!-- example content -->
  ...
  <button leftButtonContent #leftButton>
    Left button
  </button>
  <button rightButtonContent #rightButton>
    Right button
  </button>
  <!-- example content end -->
</app-scrollslider>
```

Both "leftButtonContent" & "#leftButton" attributes are needed when making a custom left button


## Responsive
Hide buttons on small screens:

```
<app-scrollslider [showButtonsFrom]="400">
  ...
</app-scrollslider>
```

400 represents the pixel value of it's own width, all widths below 400 will hide buttons


## Attributes
In a template:

```
<app-scrollslider
  [behavior]="'auto'"
  [duration]="200"
  [scrollLength]="300"
  [scrollerTrackClasses]="'ws-medium'" // example classes
  [buttonClasses]="'button button-primary'" // example classes
  [layout]="'split'">
  ...
</app-scrollslider>
```

| Attribute     | Type                       | Description                                                                                          |
|---------------|----------------------------|------------------------------------------------------------------------------------------------------|
| behavior      | string ('auto' or 'static') | Auto: Show the buttons only if the container has overflowing content<br />Static: Show the buttons always |
| duration      | number                     | The duration it scrolls on button click (milliseconds)                                               |
| scrollLength  | number                     | How far it scrolls on button click (pixels)                                                          |
| buttonClasses | string                     | Add custom classes to the buttons for custom button styling |
| scrollerTrackClasses | string                     | Add custom classes to the track where the content is located |
| layout | string ('default' or 'split') | Default: Places the button to the right side<br>Split: Places the track between the nav buttons |
| showButtonsFrom  | number                     | Hides the buttons below the window pixel width value written here |
