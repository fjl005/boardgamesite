// export const autofillCorrect = (setTitle, setSubTitle, setAuthor, setParagraph) => {
//     setTitle('AdventureQuest: Unleash Your Imagination and Conquer Epic Quests');
//     setSubTitle('An Immersive Board Game Experience');
//     setAuthor('John Deer');
//     setParagraph(
//         `AdventureQuest is a cooperative storytelling board game that takes players on thrilling quests through fantastical realms. With immersive storytelling, strategic gameplay, and stunning components, AdventureQuest has become a favorite among board game enthusiasts.

// In AdventureQuest, players assume the roles of brave adventurers and embark on perilous quests for treasure, fame, and glory. The game's modular board and rich narratives create endless possibilities, while cooperative gameplay fosters teamwork and communication.

// The game's exceptional components, including beautifully designed cards and intricate miniatures, bring the world of AdventureQuest to life. With extensive replayability and expansions available, AdventureQuest offers endless adventure and excitement.

// Step into the world of AdventureQuest, unleash your imagination, and conquer epic quests with friends. Get ready for an immersive board game experience like no other.`);
// };

// // I'm debating whether this test should be the exact same as autofill, or if only the setTitle will be needed. 
// export const autofillSameTitle = (setTitle, setSubTitle, setAuthor, setParagraph) => {
//     setTitle('AdventureQuest: Unleash Your Imagination and Conquer Epic Quests');
//     setSubTitle('subTitle');
//     setAuthor('some author');
//     setParagraph(`some text nice`);
// };

// export const autofillDiffTitle = (setTitle, setSubTitle, setAuthor, setParagraph) => {
//     setTitle('This title is different from the first one');
//     setSubTitle('An Immersive Board Game Experience');
//     setAuthor('John Deer');
//     setParagraph(
//         `AdventureQuest is a cooperative storytelling board game that takes players on thrilling quests through fantastical realms. With immersive storytelling, strategic gameplay, and stunning components, AdventureQuest has become a favorite among board game enthusiasts.

// In AdventureQuest, players assume the roles of brave adventurers and embark on perilous quests for treasure, fame, and glory. The game's modular board and rich narratives create endless possibilities, while cooperative gameplay fosters teamwork and communication.

// The game's exceptional components, including beautifully designed cards and intricate miniatures, bring the world of AdventureQuest to life. With extensive replayability and expansions available, AdventureQuest offers endless adventure and excitement.

// Step into the world of AdventureQuest, unleash your imagination, and conquer epic quests with friends. Get ready for an immersive board game experience like no other.`);
// };

// export const autofillPartial = (setTitle, setSubTitle, setAuthor, setParagraph) => {
//     setTitle('This is a partially filled out form');
//     setSubTitle('I got lazy, woops!');
//     setAuthor('');
//     setParagraph('');
// };




export const autofillCorrect = (setFormDataState) => {
    setFormDataState({
        title: 'AdventureQuest: Unleash Your Imagination and Conquer Epic Quests',
        subTitle: 'An Immersive Board Game Experience',
        author: 'John Deer',
        paragraph:
            `AdventureQuest is a cooperative storytelling board game that takes players on thrilling quests through fantastical realms. With immersive storytelling, strategic gameplay, and stunning components, AdventureQuest has become a favorite among board game enthusiasts.

In AdventureQuest, players assume the roles of brave adventurers and embark on perilous quests for treasure, fame, and glory. The game's modular board and rich narratives create endless possibilities, while cooperative gameplay fosters teamwork and communication.

The game's exceptional components, including beautifully designed cards and intricate miniatures, bring the world of AdventureQuest to life. With extensive replayability and expansions available, AdventureQuest offers endless adventure and excitement.

Step into the world of AdventureQuest, unleash your imagination, and conquer epic quests with friends. Get ready for an immersive board game experience like no other.`
    });
};

export const autofillSameTitle = (setFormDataState) => {
    setFormDataState({
        title: 'AdventureQuest: Unleash Your Imagination and Conquer Epic Quests',
        subTitle: 'subTitle',
        author: 'some author',
        paragraph:
            `Some text, nice.`
    });
};

export const autofillDiffTitle = (setFormDataState) => {
    autofillCorrect(setFormDataState);
    setFormDataState(prev => ({
        ...prev,
        title: 'This title is different from the first one',
    }));
};


export const autofillPartial = (setFormDataState) => {
    setFormDataState(prev => ({
        title: 'This is a partially filled out form',
        subTitle: 'I got lazy, woops!',
        author: '',
        paragraph: '',
    }));
};

export const autofillHeadersText = [
    {
        h4: `New Post with all criteria completed should work -- image is optional.`,
        p: `Autofill a correct article. After clicking the '1' button, hit submit down below the page. The form should be submitted successfully and can be accessed in the 'My Posts' section.`,
        method: autofillCorrect,
    },
    {
        h4: `Duplicate title should NOT work.`,
        p: `Autofill a duplicate title. After clicking the '2' button, hit submit down below the page. The form should NOT work because the title is the same as the first post.`,
        method: autofillSameTitle,
    },
    {
        h4: `Post with different title should work, even if all other fields are duplicates.`,
        p: `Autofill a different title but all other entries are the same as the first article. After clicking the '3' button, hit submit down below the page. The form should still work because the title is different (although all other entries are the same).`,
        method: autofillDiffTitle,
    },
    {
        h4: `A partially completed form should NOT work.`,
        p: `Autofills partially. After clicking the '4' button, hit submit down below the page. The form should NOT work because all written entries are required.`,
        method: autofillPartial,
    }
]