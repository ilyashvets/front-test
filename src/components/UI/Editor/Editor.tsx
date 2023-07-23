import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.scss';

function Editor({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

export default Editor;
