export const helpData = [
    {
        question: "What is this site?",
        answer:
            `This is a site created by Frank that originally started off as a React project but eventually developed into a MERN (MongoDB / Express / React / Node.JS) stack project. The goals of this project were: 
        (1) to utilize a free online API that was of interest to him (since he loves board games, he decided to use the Board Game Atlas (BGA) API), 
        (2) to master the basic fundamentals of HTML / CSS / JavaScript / React (conditional rendering, useState, useEffect, and API fetch calls are used throughout the entire project, for example),
        (3) to develop a working backend server that can handle CRUD (Create / Read / Update / Delete) http requests,
        (4) to determine image storage on a third party server (such as Cloudinary), and
        (5) to avoid DRY (Don't-Repeat-Yourself) code and maximize efficiency.

Each section is briefly explained down below:

The 'Browse Games' section lets you browse games fetched by the BGA API, with filter options, namely by category at the moment. I want to create other filters eventually, but I have been limited by the mechanisms of the BGA API. This will be a future project but for now I am satisfied with the site as is and would like to pursue other projects of interest.

The 'Atlas Forums' section also incorporates the BGA API, fetching forum data from actual BGA users. 

'Galore Posts' is a section made by Frank (so it does not use an API), with the help of auto-generated AI responses. 

The 'Make a Post' section is used to add a post to the 'Galore Posts' database. The textual data is stored in a MongoDB Database, and the images are stored in Cloudinary. 

The 'About' section explains the technologies and methods used throughout this project. 

And lastly, the Home Page models that of any popular website, with various sections highlighting miscellaneous games and data.`
    },
    {
        question: "When did you start on this project?",
        answer: "Frank started working on this project when he ended his React course during his Nucamp Bootcamp (~mid-late April of 2023)."
    },
    {
        question: "Where can I see the code?",
        answer: "The code can be accessed here; all changes were periodically updated with Github."
    },
    {
        question: "I have some suggestions and feedback for your site...",
        answer: `Great! Please contact me and let me know how I can improve the site. I am open to any constructive criticism and feedback. I am constantly learning, growing, and striving to be better and I know that my work can always improve. But honestly, this is the case for any website, even the big ones like Google and Amazon! Their sites are always growing and aren't left at a state of "perfection"`
    }
]