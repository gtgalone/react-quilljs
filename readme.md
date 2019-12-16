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

## Install

```
$ npm install react-quilljs quill
or
$ yarn add react-quilljs quill
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
  const { editorRef, editor } = useQuill();

  console.log(editorRef); // { current: undefined } > { current: Editor Reference }
  console.log(editor);    // undefined > Quill Object

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={editorRef} />
    </div>
  );
};
```
---
### With Initial Value
```jsx
export default () => {
  const { editorRef, editor } = useQuill();

  React.useEffect(() => {
    if (editor) {
      editor.clipboard.dangerouslyPasteHTML('<h1>React Hook for Quill!</h1>');
    }
  }, [editor]);

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={editorRef} />
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

  const { editorRef } = useQuill({ theme, modules, formats, placeholder });

  return (
    <div style={{ width: 500, height: 300, border: '1px solid lightgray' }}>
      <div ref={editorRef} />
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

### editorRef
Editor reference.\
Type: `RefObject`

### editor
Quill object.\
Type: `Object`

## Maintainer

- [Jehun Seem](https://github.com/gtgalone)

## License

MIT
