import '../App.css';
//Codemirror Utilities
import CodeMirror from '@uiw/react-codemirror'
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

function CodeEditor() {

  return (
    <div className="codeEditor">
       <CodeMirror
        value="//Write Your Code Here"
        options={{
          theme: 'monokai',
          fullScreen: true,
          keyMap: 'sublime',
          mode: 'jsx'
        }}
      />
    </div>
  );
}

export default CodeEditor;