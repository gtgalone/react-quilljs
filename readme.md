# react-quilljs [![Build Status](https://travis-ci.org/gtgalone/react-quilljs.svg?branch=master)](https://travis-ci.org/gtgalone/react-quilljs)

<p align="center">
  <a href="https://quilljs.com/" title="Quill"><img alt="Quill Logo" src="https://quilljs.com/assets/images/logo.svg" width="180"></a>
</p>
<p align="center">
  React Hook Wrapper for Quill.
</p>

<p align="center">
  SSR Safe
  &#x2022;
  Typescript Support
  &#x2022;
  Unopinionated
  &#x2022;
  No Dependencies
  &#x2022;
  Tiny Package Size
</p>

## Install

```
// Install packages

$ pnpm add react-quilljs quill
or
$ yarn add react-quilljs quill
or
$ npm install react-quilljs quill


// If you are using Typescript

$ pnpm add -D @types/quill
```
---

## Usage

[Code Sandbox Playground Example](https://codesandbox.io/s/react-quilljsbasic-wm0uk)

### Basic
```jsx
import React from 'react';

import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

export default () => {
  const { quill, quillRef } = useQuill();

  console.log(quill);    // undefined > Quill Object
  console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};
```
---
### With Initial Value
```jsx
export default () => {
  const { quill, quillRef } = useQuill();

  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML('<h1>React Hook for Quill!</h1>');
    }
  }, [quill]);

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};
```
---
### With onChange Handler
* https://quilljs.com/docs/api/#text-change
```jsx
export default () => {
  const { quill, quillRef } = useQuill();

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log('Text change!');
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};
```
---
### With Adding Plugins
#### counter
```jsx
export default () => {
  const counterRef = React.useRef();
  const { quill, quillRef, Quill } = useQuill({ modules: { counter: true } });

  if (Quill && !quill) {
    // For execute this line only once.
    Quill.register('modules/counter', function(quill, options) {
      quill.on('text-change', function() {
        const text = quill.getText();
        // There are a couple issues with counting words
        // this way but we'll fix these later
        counterRef.current.innerText = text.split(/\s+/).length;
      });
    });
  }

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
      <div ref={counterRef} />
    </div>
  );
};
```
#### magic-url
```jsx
export default () => {
  const { quill, quillRef, Quill } = useQuill({ modules: { magicUrl: true }});

  if (Quill && !quill) { // For execute this line only once.
    const MagicUrl = require('quill-magic-url').default; // Install with 'yarn add quill-magic-url'
    Quill.register('modules/magicUrl', MagicUrl);
  }

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};
```
---
### With Custom Options
#### custom all options
```jsx
import 'quill/dist/quill.snow.css'; // Add css for snow theme
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

export default () => {

  const theme = 'snow';
  // const theme = 'bubble';

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
    ],
  };

  const placeholder = 'Compose an epic...';

  const formats = ['bold', 'italic', 'underline', 'strike'];

  const { quillRef } = useQuill({ theme, modules, formats, placeholder });

  return (
    <div style={{ width: 500, height: 300, border: '1px solid lightgray' }}>
      <div ref={quillRef} />
    </div>
  );
};
```
#### custom toolbar with elements
```jsx
export default () => {
  const { quillRef } = useQuill({
    modules: {
      toolbar: '#toolbar'
    },
    formats: ["size", "bold", "script"], // Important
  });

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />

      <div id="toolbar">
        <select className="ql-size">
          <option value="small" />
          <option selected />
          <option value="large" />
          <option value="huge" />
        </select>
        <button className="ql-bold" />
        <button className="ql-script" value="sub" />
        <button className="ql-script" value="super" />
      </div>
      <div id="editor" />
    </div>
  );
};
```
---
### With Custom Attached Image Upload
```jsx
import fetch from 'isomorphic-unfetch';

export default () => {
  const { quill, quillRef } = useQuill();

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  };

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const body = new FormData();
    body.append('file', file);

    const res = await fetch('Your Image Server URL', { method: 'POST', body });
    insertToEditor(res.uploadedImageUrl);
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  React.useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule('toolbar').addHandler('image', selectLocalImage);
    }
  }, [quill]);

  return (
    <div style={{ width: 500, height: 300, border: '1px solid lightgray' }}>
      <div ref={quillRef} />
    </div>
  );
};
```

## Parameters
### useQuill(options)
### options
Options for [Quill Configuration](https://quilljs.com/docs/configuration/#configuration).\
Type: `Object`

- `theme`\
  [Quill Theme](https://quilljs.com/docs/themes/#themes).\
  Type: `String`\
  Default: `'snow'`

- `modules`\
  [Quill Modules](https://quilljs.com/docs/modules/toolbar/#container).\
  Type: `Object`\
  Default:
  ```
  {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],

      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ indent: '-1'}, { indent: '+1' }],

      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  }
  ```

- `formats`\
  [Quill Formats](https://quilljs.com/docs/formats/#formats).\
  Type: `Array`\
  Default:
  ```
  [
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'indent',
    'size', 'header',
    'link', 'image', 'video',
    'color', 'background',
  ]
  ```

## Return

### quill
Quill object.\
You can use quill apis(https://quilljs.com/docs/api/) with this object.\
Type: `Object`

### quillRef
Quill Editor reference.\
Type: `RefObject`

### Quill
Quill class. You can use register, find, import, debug.\
Please refer example above.\
Type: `Class`

---
## Recommend Libraries

- [React Checklist](https://github.com/gtgalone/react-checklist) - Make Checkbox List Easy and Simple with React Hooks.
- [React Store](https://github.com/gtgalone/react-store) - React Hook Store with useContext and useReducer for State Management.
- [Decode URI Component Charset](https://github.com/gtgalone/decode-uri-component-charset) - Decode URI Component with Charset such as 'euc-kr' without tears.

## Maintainer

- [Jehun Seem](https://github.com/gtgalone)

## License

MIT
