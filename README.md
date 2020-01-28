# APFM Code Challenge

### Description
Imagine that we are a startup company focused on building the world’s greatest web-based trivia application. Our CEO is a madman, and has demanded that we build an MVP in one day. He does not care how basic this trivia app is or what features it has, so long as you can play a game of trivia. He does however want to minimize technical debt, so the solution should be abstracted well; adding new features in the days to come should be effortless. This is not a throw-away prototype. This is the beginning of our Trivia Empire.

### Goal:
Build a simple trivia application utilizing https://opentdb.com. Feel free to make this as simple or as complex as you like (there are no wrong answers!). This exercise is as much about your decision making/reasoning as it is about your coding and technical abilities.

### Tech stack:
react, typescript

### Starter repo:
https://github.com/sarink/apfm-code-challenge

## Developer's Notes
This was a fun project, and an excellent refresher for me as I've been developing outside of the React/Typescript stack for the past six or seven months. It gave me the opportunity to use async/await in a somewhat real world setting, and to get some experience with React Hooks. State management is a lot cleaner these days. This was also my first real exposure to Material UI, coming from a world where staff designers create unique UI components.

As requested, I'm including some notes on each of the following subjects: 

### Architecture
In general, I'm a proponent of encapsulating state management in a single parent, and having child components simply react to values passed through props. Any logic in the child components is usually an encapsulation of the render to keep the return() statement as clean and readable as possible.

In this case, I did separate the responsibility for state between the App and Game components. While the App carries the bulk of the responsibility for fetching the data and populating its children, it made sense to allow the Game to keep track of the data related to the current question. Pushing all of that back up to the App would have cluttered up the props, and made the App more difficult to maintain. 

### Abstractions
I'm a fan of using helper files to abstract out data fetching and utilities. The React custom hook feature is a really nice way to abstract the API interactions so, I used that pattern for fetching all the data I needed. The two methods that I wrote provide a clear pattern for additional methods to offer finer tuning of the question set in the future - i.e. by restricting the answers array according to difficulty or type. 

Creating utility functions is a good way to keep the code dry and self-commenting. In this case, I only created two - htmlDecode() and shuffleStrings() - though there are cases to be made for a couple other places. I usually create a utility for one of two reasons: 1) there's something I need to do (or will need to do) several times in different files, and 2) a block of code is long/complex enough that it would increase readability to replace it with a well-named function.

Finally, I used abstraction within certain components to make the return() statement more readable. The main example is in the GameQuestion component where I encapsulated the layout of the radio groups as driven by question type. This allowed me to keep the return() statement clean and descriptive.

### Features
I delivered four UI features and one API feature for this project.

1. **API:** The apiUtils.ts file handles all interactions with the online Trivia db. 
2. **Setup:** The Setup view provides a UI where the user can pick a category of questions and the number of questions they wish to answer.
3. **Game:** The Game view serves up questions in a consistent format and determinew if any given answer is correct or not.
4. **Reset:** A button that allows the user to reset the game at any point. It reinitializes the state of the game and resets the interface. The button text changes based on whether the game is in progress or over.
5. **Support:** A page that provides the developer's contact information and links.

In addition, I delivered some basic enhancements to the UI to provide "branding" (game name, copy tone, typography), and a consistent feel between the various components.

### Reasoning
I had to balance deliverables with time. That's always the case, I suppose. Here, it forced me to choose between a polished interface and a functional app. Choosing the latter, while coding cognizant of the former, I believe I was able to implement a usable MVP that can be easily enhanced and scaled. The abstractions around the data help keep the components uncluttered, while providing clear patterns for future developers to follow. The responsibilities of the setup and game play are separated into two components, each of which can be enhanced without effecting the other. Finally, while the work flow is simple, it's clear and trainable, making it easy for a user to learn how to play the game.

## TODOS
I want to address the things I did not include in this project, mostly due to a lack of time.  
- **Testing:** Given the choice between a well-covered, non-functional site and an uncovered, functional one, I chose the latter. I wanted to showcase my use of the stack, my use of abstraction, encapsulation, self-documenting code, etc.
- **Accessibility:** While this is a very important topic for me, I again opted for functional over accessible code. I tried to use the Material UI components wherever an interactive piece was needed, allowing that library to do a lot of the accessibility heavy lifting.
- **Responsive design:** The interface is bare bones and there weren't a lot of opportunities for a mobile-first approach to have any real impact. Again, relying on Material UI addressed many of the concerns out of the box. There are a couple of places where a cleaner line break would make things look more polished but in general, the limited UI responds reasonably well.