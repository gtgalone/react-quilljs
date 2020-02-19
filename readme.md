# react-quilljs [![Build Status](https://travis-ci.org/gtgalone/react-quilljs.svg?branch=master)](https://travis-ci.org/gtgalone/react-quilljs)

<p align="center">
  <a href="https://quilljs.com/" title="Quill"><img alt="Quill Logo" src="https://quilljs.com/assets/images/logo.svg" width="180"></a>
</p>
<p align="center">
  React Hook Wrapper for Quill.
</p>

<p align="center">
  Typescript support
  &#x2022;
  Unopinionated
  &#x2022;
  No dependencies
  &#x2022;
  Tiny package size
</p>

---
## 1.1.0 Update Notification
Return paramenters object names have changed to prevent confusing.
```
{ editor, editorRef } -> { quill, quillRef }
```
---


## Install

```
$ yarn add react-quilljs quill
or
$ npm install react-quilljs quill


// If you are using typescript
$ yarn add -D @types/quill
```

## Usage

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
### With Adding Plugins
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
```jsx
import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
// or import 'quill/dist/quill.snow.css'; // Add css for snow theme

export default () => {

  const theme = 'bubble';

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

      ['clean'],
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
    'clean',
  ]
  ```

## Return

### quill
Quill object. You can use quill apis(https://quilljs.com/docs/api/) with this object.\
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
