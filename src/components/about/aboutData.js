export const aboutData = [
    {
        section: "General",
        concepts:
            ['Conditional Rendering', 'useState', 'useEffect', 'API Fetch Calls', 'Header/Navbar', 'Links & Routes', 'Page Responsiveness'],
        explanation:
            [
                `Conditional Rendering was used to only display data that exists. For example, when using Array.map to render data from the fetch call (after converted to JSON format), I needed to check if an array existed because otherwise an error would occur noting that the array doesn't exist. The array won't exist initially because the data is being fetched, which takes some time given its nature as an asynchronous function.`,

                `UseState was used to provide re-renders when certain variables were updated (aka the state was changed). Common examples of useState include: when there was an input entered for 'Browse Games' or 'Atlas Forums', when the next page was clicked (in those same sections), when you click the "Stop" button in the "API Fetch Calls" section right below, etc.`,

                `UseEffect was the main platform in which fetch calls were incorporated because these are considered side effects. UseEffect is used to handle side effects which, for the case of my project, was mainly asynchronous API fetch calls.`,

                `As mentioned in useEffect, API fetch calls were used to the Board Game Atlas API. These fetch calls were initiated with useEffect, and returned a promise in which (for most cases at least) the data would be received, converted to JSON format, and then stored in a state variable to be rendered onto the screen. I also had to create error handling in case the BGA API is down to show that the fetch is not working; the alternative would be a Loading symbol that spins forever, and I know how much people hate seeing that!`,

                `The header and navbar were created once and imported for each page. This allows us to navigate to the given pages. The navbar also has a toggle function at smaller viewport sizes.`,

                `The Link works similar to an anchor tag in HTML; when clicked, it will take you to the corresponding path. Routes were defined in the App.js file with the additional usage of useParams for further traversing within a given page (example: /browse/search/catan/page/2). `,

                `The site is responsive to all viewport sizes, ranging from xs to xl lengths. Try it yourself!`
            ]
    },
    {
        section: "Home Page",
        concepts:
            ['Lazy Load', 'Flexbox', 'Infinite Scroll'],
        explanation:
            [
                `Lazy Load allows us to load other information besides images onto the site first and shows a grayed out image in the meantime, indicating the image will eventually be rendered. The function of this reminds me of a Promise -- the grayed image indicates that the image will load soon (aka resolve) but you just have to wait! I incorporated this because I noticed that during my debugging process, the Home Page would take some time to load (about 5-10 seconds). And again, I know how much people hate waiting! So, Lazy Load allows the site to render much faster because the images can take their sweet time loading without holding everyone else back.`,

                `Flexbox was used to align a list vertically (flex-column) and centered (justify-content-center).`,

                `Infinite Scroll was used in the "Featured Games" and "Discounted Games" section. I was inspired by Amazon and Board Game Geek to incorporate an infinite scroll myself into my project. I imported InfiniteScroll from react-infinite-scroll-component, established the length of the data after receiving the fetch response from the BGA API. Then, I styled it with CSS, and used an array map to render the images and text for the corresponding board games.`
            ]

    },
    {
        section: "Browse Games",
        concepts:
            ['Abort Controller', 'Promises', 'Array.filter', 'Modal', 'Input Handling'],
        explanation:
            [
                `The idea of abort controller came into mind when I thought about the possibility of someone stopping a fetch call midway through. For example, I created a "findTotalDataLength" asynchronous function that determines the total length of the search term. The main purpose of this is to determine how many pages should be shown (example: 26 results, then only 1 page is needed. But 232 results, then 5 pages are needed). However, the BGA API is limited to a maximum of 100 searches at a time, so for a game like Catan (which has 232 results) I would need to do a total of three fetch calls to get a total of 232 games. This process still takes a bit of time but isn't too long.

But let's say someone searches Monopoly (which, based on my experience, has a LOT of game results). As the user, you might think "man, this is taking so long to load, I'm just going to clear or search for another game." So then you search up Azul next (which has 26 games). The problem is that without abort controller, the fetch calls in findTotalDataLength will continue to run for Monopoly until it reaches the end. So, the total length of Azul will now be a ridiculously high number due to the Monopoly search.

Overall, abort controller comes in handy when I want to simply stop the set of asynchronous calls and to move on to the next request.`,

                `Although fetch calls themselves return Promises through the Response received, I created my own return Promise in the "checkDataLength" function (which is inside the findTotalDataLength function). The promise would resolve once the total data length was determined, which would either be when the search for a given call has less than 100 games or if we reached the upper limit of 1000 games. If the call returns exactly 100 games, then there is a very good chance that there are more games in search and we were simply limited by our search of 100. So, in my Promise, I have us increment the search by 100 and continually adding to our total data length until we reach the end criteria. In these instances, the resolve is set to false so the function keeps running. Once we reach the end, the resolve is set to true and the Promise is finally returned!`,

                `Array filter was used when there was both a category and an input value. For some reason, the BGA API does not allow us to search by both category and input, so my solution was to search by the category first, then filter the category (Array.filter) to show games that have the input value in its name.`,

                `The modal was used to display the list of categories when the Categories button was clicked. This was a concept I noticed through Yelp. Because there are a lot of categories, I thought it best to hide them and only reveal them through a modal upon click. `,

                `Input Handling was performed in the GameSearch.js (for forums, ForumSearch.js) file. Once submitted, I checked to see if there was no entry, in which case the input value would be set as undefined and would simply load the default set of games. But if there was an input, then I would update the input state and navigate the page accordingly. With the input state updated, this would trigger the useEffect to run the fetch calls, as the input is a dependency.`
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
                `To create a grayed image overlay, I had to incorporate relative and absolute positioning.  In an outer div, I had to set its positioning as relative, so that the inner div could have its positioning absolute. What this means for the inner div is that it would have its position relative to its closest parent that has "position: relative" (aka the outer div). In my code, I used two absolute positionings. (1) One was used for the text that's displayed over my image, and (2) the second is for the grayed background. `,

                `The Z-Index is an axis (as opposed to the x and y axes) that incorporates a 3D element. In this case, it would allow certain elements to stack on top of one another. For my "Trending Today" images, I wanted the text with the highest Z-Index (so that it would essentially be "on top" and not blocked by anything else).`
            ]
    },
    {
        section: "Make a Post",
        concepts:
            ['Node.JS', 'Express', 'MongoDB', 'Multer', 'File Uploads', 'Cloudinary (Image Storage)', 'Axios', 'Error Handling', 'C in CRUD (Create)'],
        explanation:
            [
                `Node.JS: `,
                `Express: `,
                `MongoDB: `,
                `Multer: `,
                `File Uploads: `,
                `Cloudinary: `,
                `Axios: `,
                `Error Handling: `,
                `C in CRUD (Create): `
            ]
    },
    {
        section: "My Posts",
        concepts:
            ['MERN (MongoDB / Express / React / Node.JS), same as "Make a Post"', 'Cloudinary and Axios, same as "Make a Post"', "All CRUD Actions (Create, Read, Update, Delete)"],
        explanation:
            [
                `MERN: `,
                `Cloudinary and Axios: `,
                `All CRUD Actions (Create, Read, Update, Delete): `
            ]
    },
    {
        section: "Help and About",
        concepts:
            ["Common Sense"],
        explanation:
            ["Just kidding. Mainly Array.map and rendering data stored locally onto the screen. Pretty simple!"]
    }
]