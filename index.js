const express = require('express');
const path = require('path');

const port = 8000;

// db should be required before db 
const db = require('./config/mongoose');
const  Contact  = require('./models/contact')

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

// // creating our own middleware1
// app.use(function(req,res,next){
//     // console.log("Middleware 1 is called");
//     req.myName = "Shubh";
//     next();
// });

// // Middleware2
// app.use(function(req,res,next){
//     // console.log("Middleware 2 is called");
//     console.log("My name from middleware2 is",req.myName);
//     next();
// });


// For accesing static files
app.use(express.static('assets'));

var contactList = [
    {
        name:"Arpan",
        phone:"1111111111"
    },
    {
        name:"Stark",
        phone:"1234567891"
    },
    {
        name:"Shubh",
        phone:"8957115191"
    },
    {
        name:"AjStyles",
        phone:"5445446699"
    },
    {
        name:"HellBoy",
        phone:"7997999499"
    }
];


app.get('/',function(req,res){
    // console.log("My name from get'/'",req.myName);
    // console.log('requestbyShubham:',req);
    // console.log(__dirname);
    // res.send('<h1>Cool, it is running!= or is it?</h1>')

    Contact.find({})
        .then(contacts => {
        // console.log("Contacts has been fetched from server",contacts);
        return res.render('home',{
            title:"Contact's List",
            contact_list:contacts
        })
    });

    

    // return res.render('home',{
    //     title:"Contact's List",
    //     contact_list:contactList
    // });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'Let us play with ejs'
    });
});

app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');
    // console.log("request:",req);

    // console.log("response:",res);

    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contanctList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    // contactList.push(req.body);

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }).then(newContact => {
        console.log('****',newContact);
    });

    return res.redirect('back');

});

// app.get('/delete-contact/:phone',function(req,res){
app.get('/delete-contact/', async function(req,res){

    try{
        let id = req.query.id;
        // console.log("hey",id);
        await Contact.findOneAndRemove(id)
        console.log("Contact Deleted");
        return res.redirect('back')


    }catch(err){
        console.log("error deleting the contact",err)
    }
    // get the id from query in the url
       // Contact.findByIdAndDelete(id,function(err){
    //     if(err){
    //         console.log('Error in deleting object from database');
    //         return;
    //     }
    //     return res.redirect('back');
    // })
    


    // console.log("Shubham:",req.params);
    // console.log(req.query.phone);

    // let phone = req.params.phone;
    // let phone = Number(req.query.phone);

    // let contactIndex = contactList.findIndex(checkIndex);
    // function checkIndex(contact){
    //     return contact.phone == phone;
    // }

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    // return res.redirect('back');

});


app.listen(port,function(err){
    if(err){
        console.log("Error in running the server:",err);
    }
    console.log('My express server is running on Port:',port);
})