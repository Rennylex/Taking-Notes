const fs=require('fs')
const chalk=require('chalk')
const getNotes=()=>
{
return('your notes...')

}

const addNote=(title, body)=>//load, change and save the notes
{
    const notes = loadNotes()//load an notes object
    //查重：
    const duplicateNotes=notes.filter((note)=> note.title===title)//{//duplicateNotes is an array, filter在内定函数返回true时保留note，在false时舍弃
    //     return note.title===title
    // })

    debugger 
    const duplicateNote=notes.find((note)=> note.title===title)
    if (!duplicateNote){//didn't find any duplicate
        notes.push({//push an object
            title: title,//前为property后为variable
            body: body
        })
    saveNotes(notes)
    console.log(chalk.green.inverse('New nodes added!'))

    } else {
        console.log(chalk.red.inverse('No notes taken!'))
    }

}


const removeNote=(title)=>{

    const notes=loadNotes()
    const notes_afterRemove=notes.filter((note)=>{
        if(title==note.title)
        {console.log(chalk.green.inverse("Note named " + title+" has been found and removed"))}
        return title !== note.title
    })
    if(notes.length <= notes_afterRemove.length)
    {
        console.log(chalk.red.inverse("No note named "+title+' has been found!'))
    }
    saveNotes(notes_afterRemove)

}



const saveNotes=function (notes) {

    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)


}


const loadNotes = ()=>
{   //try-catch：try出bug 执行catch
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


const listNotes = ()=>{
    const notes=loadNotes()
    console.log(chalk.yellow("Your notes"))
    notes.forEach((note)=>{
        console.log(chalk.green("title:"+note.title+" body:"+note.body))
    })
    
}

const readNotes = (title)=>{
    const notes=loadNotes()
    const targetNote=notes.find((note)=> note.title===title)

    if(!targetNote){
        console.log(chalk.inverse.red("title:"+title+" is not found!"))
    }  else{
        console.log(chalk.green.inverse(targetNote.title))
        console.log(chalk.green(targetNote.body))
    }

}


module.exports={
    getNotes: getNotes,//左为export后的名字
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNotes:readNotes
}