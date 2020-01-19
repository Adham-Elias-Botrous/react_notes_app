import React, { Component } from 'react';
import './App.css';
import Preview from './components/Preview/Preview';
import { Notes } from './components/Notes/Notes';
import { NotesList } from './components/Notes/NotesList';
import { Note } from './components/Notes/Note';
import { NoteForm } from './components/Notes/NoteForm';
import { Alert } from './components/Alert/Alert';
import { LayoutPreviewNote } from './components/Notes/LayoutPreviewNote';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      title: '',
      content: '',
      idSelectedNote: null,
      creating: false,
      editing: false,
      validation: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem('notes')) {
      this.setState({ notes: JSON.parse(localStorage.getItem('notes')) });
    } else {
      localStorage.setItem('notes', JSON.stringify([]));
    }
  }

  componentDidUpdate() {
    if (this.state.validation.length !== 0) {
      setTimeout(() => {
        this.setState({ validation: [] });
      }, 3000);
    }
  }

  validate = () => {
    const validationErrors = [];
    let passed = true;
    if (!this.state.title) {
      validationErrors.push('You have to insert the Title.');
      passed = false;
    }
    if (!this.state.content) {
      validationErrors.push('You have to insert the Content.');
      passed = false;
    }
    this.setState({ validation: validationErrors });
    return passed;
  };
  saveToLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  };
  changeTitleHandler = event => {
    this.setState({ title: event.target.value });
  };
  changeContentHandler = event => {
    this.setState({ content: event.target.value });
  };
  addNoteHandler = () => {
    this.setState({ creating: true, editing: false, title: '', content: '' });
  };
  saveNoteHandler = () => {
    if (!this.validate()) return;
    const { title, content, notes } = this.state;
    const note = {
      id: new Date().toJSON(),
      title: title,
      content: content
    };
    const updatedNotes = [...notes, note];
    this.saveToLocalStorage('notes', updatedNotes);
    this.setState({
      notes: updatedNotes,
      creating: false,
      idSelectedNote: note.id,
      title: '',
      content: ''
    });
  };
  updateNoteHandler = () => {
    if (!this.validate()) return;
    const { title, content, notes, idSelectedNote } = this.state;
    const noteIndex = notes.findIndex(note => note.id === idSelectedNote);
    const updatedNotes = [...notes];
    updatedNotes[noteIndex] = {
      id: idSelectedNote,
      title,
      content
    };
    this.saveToLocalStorage('notes', updatedNotes);
    this.setState({
      notes: updatedNotes,
      editing: false,
      title: '',
      content: ''
    });
  };
  deleteNoteHandler = () => {
    let confirmResult = window.confirm(
      'Are you sure you want to delete this Note?'
    );
    if (confirmResult === false) return;
    const updatedNotes = [...this.state.notes];
    const noteIndex = updatedNotes.findIndex(
      note => note.id === this.state.idSelectedNote
    );
    updatedNotes.splice(noteIndex, 1);
    this.saveToLocalStorage('notes', updatedNotes);
    this.setState({ notes: updatedNotes, idSelectedNote: null });
  };
  selectedNoteHandler = noteId => {
    this.setState({ idSelectedNote: noteId, creating: false, editing: false });
  };
  editNoteHandler = () => {
    const note = this.state.notes.filter(
      note => note.id === this.state.idSelectedNote
    )[0];
    this.setState({ editing: true, title: note.title, content: note.content });
  };
  cancelHandler = () => {
    this.setState({
      creating: false,
      editing: false,
      title: '',
      content: '',
      validation: []
    });
  };
  render() {
    const {
      notes,
      title,
      content,
      idSelectedNote,
      editing,
      creating,
      validation
    } = this.state;
    return (
      <div className="App">
        <Notes>
          <NotesList>
            {notes.map(note => (
              <Note
                key={note.id}
                title={note.title}
                noteClicked={() => this.selectedNoteHandler(note.id)}
                active={this.state.idSelectedNote === note.id}
              />
            ))}
          </NotesList>
          {!editing && !creating && (
            <button className="add-btn" onClick={this.addNoteHandler}>
              +
            </button>
          )}
        </Notes>
        <Preview>
          {creating ? (
            <NoteForm
              formTitle="Add a  new note"
              title={title}
              content={content}
              titleChanged={this.changeTitleHandler}
              contentChanged={this.changeContentHandler}
              submitClicked={this.saveNoteHandler}
              canceling={this.cancelHandler}
            />
          ) : (
            <LayoutPreviewNote
              notes={notes}
              idSelectedNote={idSelectedNote}
              title={title}
              content={content}
              editing={editing}
              changeTitle={this.changeTitleHandler}
              changeContent={this.changeContentHandler}
              updateNote={this.updateNoteHandler}
              editNote={this.editNoteHandler}
              deleteNote={this.deleteNoteHandler}
              canceling={this.cancelHandler}
            />
          )}
        </Preview>
        {validation.length !== 0 && <Alert validationMessages={validation} />}
      </div>
    );
  }
}

export default App;
