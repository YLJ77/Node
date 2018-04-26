const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const note = require('./note');

let command = process.argv[2];
let argv = yargs
    .command('add', 'Add a new note', {
        title: {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        }
    })
    .command('list', 'List all notes')
    .help()
    .argv;

if (command === 'add') {
    note.addNote(argv.title, argv.body);
} else if (command === 'list') {

} else if (command === 'read') {

} else if (command === 'remove') {

} else {
    console.log('Command not recognized');
}
