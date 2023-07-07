export const aboutData = [
    {
        section: "General",
        concepts:
            ['Conditional Rendering', 'useState', 'useEffect', 'API Fetch Calls', 'Header/Navbar', 'Links & Routes', 'Page Responsiveness'],
        explanation:
            [
                `Conditional Rendering was used to only display data that exists. For example, when using Array.map to render data from the fetch call (after converted to JSON format), I needed to check if an array existed because otherwise an error would occur noting that the array doesn't exist. The array won't exist initially because the data is being fetched, as fetch calls are asynchronous functions and take some time before receiving the response.`,

                `UseState was used to provide re-renders when certain variables were updated (aka the state was changed). Common examples of useState include: when there was an input entered for 'Browse Games' or 'Atlas Forums', when the next page was clicked (in those same sections), etc.`,

                `UseEffect was the main platform in which fetch calls were incorporated because these are considered side effects. UseEffect is used to handle side effects which, for the case of my project, was mainly asynchronous API fetch calls.`,

                `As mentioned in useEffect, API fetch calls were used to the Board Game Atlas API. These fetch calls were initiated with useEffect, and returned a promise in which (for most cases at least) the data would be received, converted to JSON format, and then stored in a state variable so it could be rendered onto the screen. I also had to create error handling in case the BGA API is down to show that the fetch is not working; the alternative would be a Loading symbol that spins forever, and I know how much people hate seeing that!`,

                `The header and navbar were created once and imported for each page. This allows us to navigate to the given pages. The navbar also has a toggle function at smaller viewport sizes.`,

                `The Link works similar to an anchor tag in HTML; when clicked, it will take you to the corresponding path. Routes were defined in the App.js file with the additional usage of useParams for further traversing within a given page (example: /browse/search/catan/page/2). `,

                `The site is responsive to all viewport sizes, ranging from xs to xl lengths. Try it yourself!`
            ]
    },
    {
        section: "Home Page",
        concepts:
            ['Lazy Load', 'D-Flex', 'Infinite Scroll'],
        explanation:
            [
                `Lazy Load allows us to load other information besides images onto the site first and shows a grayed out image, indicating the image will eventually be rendered. I incorporated this because I noticed that during my debugging process, the Home Page would take some time to load (about 5-10 seconds). And again, I know how much people hate waiting! So, Lazy Load allows the site to render much faster because the images can take their sweet time loading without holding everyone else back.`,

                `D-Flex: `,

                `Infinite Scroll: `
            ]

    },
    {
        section: "Browse Games",
        concepts:
            ['Abort Controller', 'Promises', 'Array.filter', 'Modal', 'Input Handling'],
        explanation:
            [
                `Abort Controller: `,
                `Promises: `,
                `Array.filter: `,
                `Modal: `,
                `Input Handling`
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
            ['D-Flex', 'Image Overlay'],
        explanation:
            [
                `D-Flex: `,
                `Image Overlay: `
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
            ['MERN (MongoDB / Express / React / Node.JS), same as "Make a Post"', 'Cloudinary and Axios, same as "Make a Post"', "All CRUD Actions (Create, Read, Update, Delete"],
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