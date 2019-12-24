import { useRef, useState, useEffect, RefObject } from 'react';

export interface StringMap {
  [key: string]: any;
}

export interface QuillOptionsStatic {
  debug?: string | boolean;
  modules?: StringMap;
  placeholder?: string;
  readOnly?: boolean;
  theme?: string;
  formats?: string[];
  bounds?: HTMLElement | string;
  scrollingContainer?: HTMLElement | string;
  strict?: boolean;
}

const theme = 'snow';

const modules = {
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
};

const formats = [
  'bold', 'italic', 'underline', 'strike', 'align', 'list', 'indent',
  'size', 'header', 'link', 'image', 'video', 'color', 'background', 'clean'
];

export const useQuill = (options: QuillOptionsStatic | undefined = { theme, modules, formats }) => {

  if (!options) { options = {}; }
  if (!options.modules) { options.modules = modules; }
  if (!options.formats) { options.formats = formats; }
  if (!options.theme) { options.theme = theme; }

  const editorRef: RefObject<any> = useRef();
  const [editor, setEditor] = useState();
  let Quill: any;

  useEffect(() => {
    if (!Quill) { Quill = require('quill'); }
    if (!editor && editorRef && editorRef.current) {
      setEditor(new Quill(editorRef.current, options));
    }
  }, []);

  return {
    editorRef,
    editor,
  };
};
