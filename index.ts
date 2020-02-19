import { useRef, useState, useEffect, RefObject } from 'react';
import Quill, { QuillOptionsStatic } from 'quill';

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
    if (!obj.Quill) { obj.Quill = require('quill') as Quill; }
    if (obj.Quill && !obj.quill && quillRef && quillRef.current && isLoaded) {
      const quill = new obj.Quill(quillRef.current, {
        modules: { ...modules, ...options.modules },
        formats: options.formats || formats,
        theme: options.theme || theme,
      });
      setObj({ ...obj, quill, editor: quill });
    }
    setIsLoaded(true);
  }, [obj.Quill]);

  return obj;
};
