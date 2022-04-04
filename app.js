// const fs = require('fs')


// fs.writeFileSync('notes.txt', 'test')


// fs.appendFileSync('notes.txt','YOU NEED TO PRESS CTRL+S')
//const names = require('./util.js')
//const names = 'renny'
const validator = require('validator')
const notes = require('./notes.js')
const yargs=require('yargs')
const chalk=require('chalk')
const { demandOption } = require('yargs')
const { removeNote, listNote } = require('./notes.js')




// const msg=getNotes()
// console.log(msg)
// console.log(chalk.bgRed.green.bold('Success'))


// console.log(validator.isEmail('renephilex@qq.com'))

// const command = console.log(process.argv[2])

//console.log(process.argv)


//creating add COMMAND
yargs.command({
    command: 'add',
    describe: 'Will add a new note.',
    builder:{
        title:{//title is defined as an OPTION(it's a property)
            describe:'Note title',
            demandOption:true,//correct usage in terminal: node app.js add --title='blablabla', if demandOption is true, then --title and everything followwing it is required.
            type:'string'
        },

        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }

    },
    handler(argv)//handler: function(argv)
        {
            // console.log('Title:',argv.title),
            // console.log('Body:'+argv.body)

            notes.addNote(argv.title,argv.body)

        }


})

//create remove command
yargs.command({
    command:'remove',
    describe:'remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type: 'string'
            
        }


    },
    handler(argv){//handler: function(argv){
        notes.removeNote(argv.title)
    }
})
//create 'list' command
yargs.command({
    command:'list',
    describe:'list all the notes',
    handler(argv){//handler: function(){
        console.log('listing out all the notes!')
        notes.listNotes()

    }
})


//create 'read' command
yargs.command({
    command:'read',
    describe:'read a note',

    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type: 'string'
        }


    },

    handler(argv){//handler: function(){
        console.log('reading the note!')
        notes.readNotes(argv.title)

    }
})




yargs.parse()//equals to: console.log(yargs.argv) 必须有这句才能获取argv
