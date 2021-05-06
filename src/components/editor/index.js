import React, {useState} from "react";
import {
  // Editor,
  AtomicBlockUtils,
  EditorState,
  RichUtils,
  convertToRaw
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";

import createImagePlugin from "draft-js-image-plugin";

import "./app.css";

const highlightPlugin = createHighlightPlugin();
const imagePlugin = createImagePlugin();

const MyEditor = ({}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [plugins, setPlugins] = useState([highlightPlugin, imagePlugin])

  const onChange = (state) => {
    setEditorState(state);
  }

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onUnderlineClick = () => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
    );
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
   onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const onStrikeThroughClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const onHighlight = () => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT")
    );
  };

  const insertImage = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
       "image",
       "IMMUTABLE",
       { src: "https://s3.amazonaws.com/cms.ipressroom.com/338/files/20207/5f2af2a42cfac209125af040_Father+helps+daughter+with+mask/Father+helps+daughter+with+mask_82e9191c-c2a6-417c-9212-0df69a2539b8-prv.jpg"}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
     currentContent: contentStateWithEntity
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };

  const componentDidMount = () => {
   const newEditorState = insertImage();
   onChange(newEditorState);
  }

  return (
    <div className="editorContainer">
      <button className="underline" onClick={onUnderlineClick}>
        U
      </button>
      <button className="bold" onClick={onBoldClick}>
        <b>B</b>
      </button>
      <button className="italic" onClick={onItalicClick}>
        <em>I</em>
      </button>
      <button className="strikethrough" onClick={onStrikeThroughClick}>
        abc
      </button>
      <button className="highlight" onClick={onHighlight}>
        <span style={{ background: "yellow", padding: "0.3em" }}>H</span>
      </button>
      <button className="bold" onClick={componentDidMount}>
        <b>Up</b>
      </button>
      <div>
        <label for="upload-image" style={{cursor: 'pointer'}}>Upl</label>
        <input
          type="file"
          id="upload-image"
          style={{
            sopacity: 'opacity',
            position: 'absolute',
            zIndex: '-1',
            width: '0.1px',
            height: '0.1px',
            overflow: 'hidden'
          }}
        />
      </div>
      <div className="editors">
         <Editor
           editorState={editorState}
           handleKeyCommand={handleKeyCommand}
           plugins={plugins}
           onChange={onChange}
         />
       </div>
    </div>
  )
}

export default MyEditor ;
