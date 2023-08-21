This is loader for converting svg file in to the React component.

## Install from NPM

```bash
yarn add -D light-svg-loader
```

## Webpack using

Add to the webpack config:

```js
    module: {
        rules: [
            {
                test: /\.(svg)$/i,
                use: "light-svg-loader"
            },
        ],
    },
```

If you use TypeScript add a module definition file:

```ts
declare module "*.svg" {
  const content:
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>
    | React.FunctionComponent<React.ImgHTMLAttributes<HTMLImageElement>>;
  export default content;
}
```

## How to use

Import svg file in your code

```js
import Icon from "./icon.svg";
```

And use it as component

```jsx
export const App = () => {
  return (
    <h1>
      This is icon <Icon aria-label="your icon" />
    </h1>
  );
};
```

## Options

You can set next options in to the loader:

```js
[
  {
    loader: "light-svg-loader",
    options: {
      // It will reset all HEX colors, and set fill="currentColor". It will NOT work if transformIntoDataURI is true
      applyCurrentColor: true,
      // It will return component as <img src="data:image/svg+xml;base64..." />. 
      transformIntoDataURI: true 
    },
  },
];
```

## Notes
If the icon has several different collors , dont use `applyCurrentColor: true` cos it reset all colors.
