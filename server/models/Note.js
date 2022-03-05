const mongoose =require("mongoose");
const NotesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('userNotes', NotesSchema);