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


## Attributes

| Attribute     | Type                       | Description                                                                                          |
|---------------|----------------------------|------------------------------------------------------------------------------------------------------|
| behavior      | string ('auto' ``|`` 'static') | Auto: Show the buttons only if the container has overflowing content Static: Show the buttons always |
| duration      | Number                     | The duration it scrolls on button click (milliseconds)                                               |
| scrollLength  | Number                     | How far it scrolls on button click (pixels)                                                          |
| buttonClasses | string                     | Add custom classes to the buttons for custom button styling                                          |
