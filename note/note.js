const fs = require('fs');

let fetchNotes = ()=>{
    try {
        let noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch(e) {
        return [];
    }
};

let saveNotes = notes=>{
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };

    try {
    } catch(e) {}

    let duplicateNotes = notes.filter(note=>note.title === title);

    if (duplicateNotes.length) return;

    notes.push(note);
    saveNotes(notes);
};

module.exports = {
    addNote
};
