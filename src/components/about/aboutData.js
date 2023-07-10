export const aboutData = [
    {
        section: "General",
        concepts:
            ['Conditional Rendering', 'useState', 'useEffect', 'API Fetch Calls', 'Header/Navbar', 'Links & Routes', 'Page Responsiveness'],
        explanation:
            [
                `Conditional Rendering is used to display existing data and prevent potential errors. When using Array.map to render data from the fetch call (after being converted to JSON format), it is necessary to check the existence of the array. Otherwise, attempting to map over a nonexistent array would result in an error. Initially, the array does not exist because the data is being fetched asynchronously.`,

                `UseState is used to trigger re-renders when variables are updated (i.e., when the state changes). Common use cases for useState include capturing inputs for 'Browse Games' or 'Atlas Forums', navigating to the next page in those sections, and clicking the "Stop" button in the "API Fetch Calls" section down below!`,

                `UseEffect is the primary platform for incorporating fetch calls, as it handles side effects. In my project, side effects mainly involve asynchronous API fetch calls.`,

                `As mentioned earlier, fetch calls to the Board Game Atlas API are initiated using useEffect. These calls return promises that can be resolved or rejected. If a promise is resolved, the data can be handled using '.then' statements or in a 'try' block. In this case, the data is received, converted to JSON format, and stored in a state variable for rendering. If a promise is rejected due to an error, it can be handled using a '.catch' statement or in a 'catch' block. Proper error handling is crucial to inform users of any errors, such as when the BGA API is down. Imagine if the BGA API is down and the loading symbol spins forever without any notice of an error. People would hate that!`,

                `The header and navbar are created once and imported for each page, enabling navigation to different pages. The navbar also includes a toggle function for smaller viewport sizes.`,

                `Links function similarly to anchor tags in HTML, allowing users to navigate to corresponding client-side paths. Routes are defined in the App.js file, and additional functionality like useParams allows further traversal within a given page (e.g., /browse/search/catan/page/2).`,

                `The site is designed to be responsive across all viewport sizes, ranging from xs to xl. You can try it out yourself!`
            ]
    },
    {
        section: "Home Page",
        concepts:
            ['Lazy Load', 'Flexbox', 'Infinite Scroll'],
        explanation:
            [
                `Lazy loading is a technique that defers the loading of non-critical resources, such as images, until they are required. In my project, it delays the loading of images and displays a grayed out placeholder image, indicating that the actual image will be rendered eventually. This concept resembles a Promise, where the grayed image represents the pending state before the image is loaded (resolved). It improves the site's rendering speed by allowing images to load at their own pace without slowing down other elements. I incorporated lazy loading because I noticed that the Home Page took some time to load during my debugging process, and I wanted to minimize waiting time for users.`,

                `Flexbox is utilized to vertically align a list by applying the flex-column class and centering it using the justify-content-center property.`,

                `Infinite Scroll is implemented in the "Featured Games" and "Discounted Games" sections. I was inspired by platforms like Amazon and Board Game Geek which both use their variations of Infinite Scrolls. I imported the InfiniteScroll component from react-infinite-scroll-component, determined the length of the data received from the BGA API fetch response, styled it with CSS, and used an array map to render images and corresponding board game information.`
            ]
    },
    {
        section: "Browse Games",
        concepts:
            ['Abort Controller', 'Promises', 'Array.filter', 'Modal', 'Input Handling'],
        explanation:
            [
                `The idea of the abort controller came to mind when considering the possibility of someone interrupting a fetch call midway. Before explaining the abort controller further, I want to preface the rationale and situation first. I created an asynchronous function called "findTotalDataLength" that determines the total length of the search term. Its main purpose is to determine the number of pages to display based on the search results. If there are 26 results (when you search 'Azul' for example), only one page is needed as a page can hold a maximum of 50 games. But if there are 232 results (when you search 'Catan'), five pages are required. Because the BGA API restricts the maximum number of searches to 100 at a time, I may need to perform multiple fetch calls to find the total length. So, for a game like Catan with 232 results, I would need to make three fetch calls to retrieve all 232 games. This process takes some time but is not excessively long, for now at least...

Now let's say someone searches Monopoly (which, based on my experience, has a LOT of game results). As the user, you might think "Wow, this is taking so long to load, I'm just going to clear or search for another game." So then you search up Azul next (which has 26 games). The problem is that without abort controller, the fetch calls in findTotalDataLength will continue to run for Monopoly until it reaches the end. So, the total length of Azul will now be a ridiculously high number (instead of the expected 26) due to the Monopoly search. The findTotalDataLength will eventually run for Azul and the number will get adjusted, but I want to avoid any errors that appear on the browser.

With all that said, I incorporated abort controller to detect if someone stops the asynchronous calls midway through. If aborted, then the findTotalDataLength function will automatically stop for the current term. Overall, abort controller comes in handy when I want to simply stop the set of asynchronous calls and to move on to the next request.`,

                `Just as fetch calls themselves return Promises through the received response, I created my own Promise in the "checkDataLength" function, which is nested inside the "findTotalDataLength" function. This Promise resolves once the total data length is determined, either when the search for a given call returns fewer than 100 games or when we reach the upper limit of 1000 games. If the call returns exactly 100 games, it suggests that there are more games in the search as we are limited by our search query of 100. In this Promise, I increment the search by 100 and continue adding to the total data length until we meet the end criteria. In these cases, the resolve value is set to false to keep the checkDataLength function running. Once we reach the end, the resolve value is set to true, and the Promise is returned with the total length successfully calculated by that point.`,

                `Array filter is used when both a category and an input value were present. Interestingly, the BGA API does not allow us to search by both category and input simultaneously. As a workaround, I first searched by the category and then applied the Array.filter method to display games that have the input value in their names.`,

                `The modal is utilized to show a list of categories when the Categories button is clicked. This concept was inspired by Yelp. Considering the abundance of categories, it is preferable to hide them initially and reveal them through a modal upon clicking.`,

                `Input handling is performed in the GameSearch.js (and ForumSearch.js for forums) file. Upon submission, I check if there is no entry, in which case the input value is set as undefined, and the default set of games (top ranked by BGA) is loaded. However, if there is an input, I update the input state and page navigation accordingly. This triggers the useEffect function to run the fetch calls, as the input is listed as a dependency.`
            ]
    },
    {
        section: "Atlas Forums",
        concepts: ["Same as Browse Games"],
        explanation:
            ["Except for the Modal and Array.filter. These were not used in Atlas Forums because there was only one parameter used (input) as opposed to two in Browse Games (input, category)."]
    },
    {
        section: "Galore Posts",
        concepts:
            ['Relative / Absolute Positioning', 'Z-Index'],
        explanation:
            [
                `To create a grayed image overlay, I incorporate relative and absolute positioning. In the outer div, I set its positioning as relative and set the inner div as absolute positioning. With absolute positioning, the inner div's position is relative to its closest parent that has the "position: relative" property (in this case, the outer div). In my code, I utilize two absolute positionings: one for the text displayed over the image and another for the grayed background. These two were the 'inner div', and the 'outer div' encaptured the image itself.`,

                `The Z-Index represents the z-axis (depth into the page), distinct from the x and y axes, that introduces a 3D element. It allows specific elements to stack on top of one another. In the case of my "Trending Today" images, I prioritize the text by assigning it the highest Z-Index. This ensures that the text is positioned "on top" and not obstructed by other elements.`
            ]
    },
    {
        section: "Make a Post, My Posts (Backend)",
        concepts:
            ['Node.JS', 'Express', 'MongoDB and Mongoose', 'Models and Schemas', 'Cross Origin Resource Sharing (CORS)', 'File Uploads, FormData, Multer, & Cloudinary', 'Axios', 'Error Handling', 'CRUD (Create, Read, Update, Delete)'],
        explanation:
            [
                `Node.js is the runtime environment used for the backend code, allowing us to write the backend server code in JavaScript.`,

                `Express is a framework that simplifies the handling of HTTP requests in Node.js, making it easier to handle different types of requests such as GET, POST, PUT, and DELETE by importing Express, adding the middleware, and writing simple code to define the endpoints.`,

                `MongoDB is a NoSQL database that stores data in flexible, document-oriented format, where data is organized in key-value pairs similar to JSON objects. Mongoose is an Object Data Modeling (ODM) library for Node.js that provides a higher-level, schema-based approach for interacting with MongoDB. Mongoose simplifies the process of defining schemas, models, and performing database operations.`,

                `In MongoDB, the schema defines the structure and rules for the documents, specifying the required fields and their data types. The model uses the schema to interact with the MongoDB database to perform CRUD operations such as creating, searching, updating, and deleting documents.`,


                `CORS allows resources (such as API requests) on a web page to be requested from another domain, enabling communication between different domains or ports in the browser. This is necessary when making requests to the backend server and Cloudinary from the frontend side as they are held on different domains/ports.`,

                `When originally creating the site, I used Multer to handle file uploads from the form. To send this file to the backend server, I used "form data", appended the image. and made a 'POST' request with the corresponding form data. However, I removed Multer once I transitioned to Cloudinary as the primary storage of images for scalability purposes. I doubt this site would reach hundreds of images stored, but I wanted to prepare for scalability as this is an essential factor to consider when creating a larger site. But now with Cloudinary, I removed Multer as image upload handling is now executed from the client side. 

To clarify the order of steps:
(1) First, the data is entered in the form in "Make a Post", and the optional image is potentially uploaded.
(2) The client will send a 'POST' request to the server. If the server is not running, then all following steps will be skipped.
(3) Assuming the server is running, the server will send a response back to the client, giving the approval to upload the image to Cloudinary.
(4) From the frontend, a 'POST' request with the image upload is made to Cloudinary.
(5) Once successful, the Cloudinary post will send back a URL of the image (absolute path).
(6) This URL can be stored in the image data that will then be posted to the server along with all other data (title, author, etc.).`,

                `Axios is a popular JavaScript library that simplifies making asynchronous HTTP requests from the browser, providing a convenient way to interact with APIs and fetch data from servers.`,

                `Error handling is important both for developers and users. This involves console.log to identify and debug errors and displaying error messages on the browser to inform users about issues. Overall, this provides a better user and debugging experience.`,

                `Create: In the "Make a Post" section, there is a form you can fill out where, upon submission, will be posted to the backend server. If an image is uploaded, the image will first be stored onto Cloudinary. If an image is selected from the selection, then there is no need to upload an image to Cloudinary. Each form will have data stored in a state variable (to display onto the browser), but the data itself will be sent as an Object to the backend server via Axios as a 'POST' request. The backend server will first check to see if a post with the same title already exists. If it doesn't, then it will use the data from the request body to create a user post via Mongoose into the MongoDB Database. 

Read: In the "My Posts" section, all the posts will be gathered with a 'GET' request. If an individual article is selected, then there will be a 'GET' request for that specific article via its unique ID.

Update: In the "My Posts" section, you can edit an individual article. This will result in a pre-filled form containing the already existing data for the article. You can also remove or choose a new image. If a new image is selected, then the previous image will be deleted from Cloudinary (assuming it was uploaded there). Once you click 'Save', then this will send a 'PUT' request to the backend server, updating the already existent post.

Delete: In the "My Posts" section, you can either delete an individual article or delete all the articles. This is performed with a 'DELETE' request to the backend server.`
            ]
    },
    {
        section: "Help and About",
        concepts:
            ["Common Sense"],
        explanation:
            ["Just kidding. Mainly Array.map and rendering data stored locally onto the browser. Pretty simple!"]
    }
]