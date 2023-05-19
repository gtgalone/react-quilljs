import { useRef, useState, useEffect, RefObject } from 'react';

import Quill, { QuillOptionsStatic } from 'quill';

const theme = 'snow';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }],

    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'list',
  'indent',
  'size',
  'header',
  'link',
  'image',
  'video',
  'color',
  'background',
  'clean',
];

function assign(target: any, _varArgs: any) {
  'use strict';
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const to = Object(target);

  for (let index = 1; index < arguments.length; index++) {
    const nextSource = arguments[index];

    if (nextSource !== null && nextSource !== undefined) {
      for (const nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}

/**
 *
 * @param options Quill static options. https://github.com/gtgalone/react-quilljs#options
 * @returns Returns quill, quillRef, and Quill. https://github.com/gtgalone/react-quilljs#return
 */
export const useQuill = (options: QuillOptionsStatic | undefined = { theme, modules, formats }) => {
  const quillRef: RefObject<any> = useRef();

  const [isLoaded, setIsLoaded] = useState(false);
  const [obj, setObj] = useState({
    Quill: undefined as any | undefined,
    quillRef,
    quill: undefined as Quill | undefined,
    editorRef: quillRef,
    editor: undefined as Quill | undefined,
  });

  useEffect(() => {
    if (!obj.Quill) {
      setObj((prev) => assign(prev, { Quill: Quill }));
    }
    if (obj.Quill && !obj.quill && quillRef && quillRef.current && isLoaded) {

      const opts = assign(options, {
        modules: assign(modules, options.modules),
        formats: options.formats || formats,
        theme: options.theme || theme,
      });
      const quill = new obj.Quill(quillRef.current, opts);

      setObj(assign(assign({}, obj), { quill, editor: quill }));
    }
    setIsLoaded(true);
  }, [isLoaded, obj, options]);

  return obj;
};
