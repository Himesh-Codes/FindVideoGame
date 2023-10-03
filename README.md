# Taskify

Sample react project for study purpose.
create, delete, update tasks

![Components](doc-images/taskify.png)

## Useful links

- https://react.dev/learn
- https://react.dev/learn/describing-the-ui
- https://roadmap.sh/react
- https://www.youtube.com/watch?v=FJDVKeh7RJI&t=10s
- https://www.youtube.com/watch?v=SqcY0GlETPk&t=1s

## Dev env setup

- Node > 16
- Vsc extensions
- Prettier - After install, Settings>Format On Save (on)
- Dev tool for browsers - https://react.dev/learn/react-developer-tools

# How React Outstands

- As DOM (document object model is a tree base object), allows JS to manipuate view, thus how the react framework took it's place.
- React use virtual dom for rendering, that change the only DOM tree that updated, works like Trigger->Render->Commit, after this browser loads view "Painting".

# Development

- Create with "Create React App" (CRA), https://create-react-app.dev/docs/getting-started.
- Alternatively "Vite". Since Vite is faster and create only smaller bundle sizes. `npm create vite@latest` or `npm create vite@version-number`, we need give specific version-number.
- Enter the other details, and maybe use SWC (stands for Speedy Web Compiler), Vite + SWC has the fastest run time.
- Now run:
  cd taskify
  npm install / npm i
  npm run dev (to run local server)

## Project structure

- node_modules: all third party libraries are installed.
- public : all public assets exists.
- src: src file
  - main.tsx: entry point for app, the component specified <React.StrictMode></React.StrictMode> check the potential problems. `ReactDOM` libary use in web app and in mobile the `ReactNative` library.
  - App.tsx: current root component on creation.
  - .eslintrc.cjs : Eslint configs
- index.html: entry point for our app defined (usually main.tsx), div with id "root" is container of app.
- package.json: infomation about dependency, build, project etc..
- tsconfig.json: typescript config, instruction on how to compile to js (can be auto construct with cmd in normal projects)
- vite.config.json: vite config files

## Components

- We use `tsx` extension for react TS component file (Message.tsx).
- Best practice to create
- Class component (Before React 16.8, Class components were the only way to track state and lifecycle on a React component.)
- Now it is easy to create functions as components.
- Components helps to create reusable, modular codes.
- Treat each boxes as components, and each subboxes in view as it's child components.

![Components](doc-images/component-stack.png)

## JSX

    - We use JSX(Javascript XML), as the component render syntax. That is whatever returned in the component.
    - Online converter html to JSX (https://transform.tools/html-to-jsx)
    - Convertion of JSX to JS can see in https://babeljs.io/rep.
    - JSX is very stricter tahn normal html, the return of component can't return multiple elements it should contained in a <div></div> or a wrapper <></>.
    - And every tag should closed even self closed (refer Message.tsx or App.tsx).

### JSX with curly braces

    - It is possible to pass any JS expressions in curly braces {}, that is a piece of code that returns value, eg: variable, function etc.

### Conditional Rendering

    - We can use if/else, ternary operator (? :) and logical AND ( && ).

## How React Working & Vite auto adapt the changes

- Auto render changes by monitoring the comonents with the hot module replacement (hmr).

  2:20:11 AM [vite] hmr update /src/App.tsx (x4)

  2:25:23 AM [vite] hmr update /src/App.tsx (x5)

- React build virtual DOM that is an in memory representation of the components and properties (like a tree). The react identify the node updated and check the changes and update DOM with library called React DOM (check on dependencies "react" and "react-dom").

![Components](doc-images/virtualDOM.png)

### State (useState Hook)

- State is a component's memory.
- The useState Hook provides those two things:

  A state variable to retain the data between renders.
  A state setter function to update the variable and trigger React to render the component again.

- State will remember something on component's memory, even after a DOM refresh.

### Passing Props to a Component

- React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props.
- We can pass any JS values in props to react the child.

### Forwarding props with the JSX spread syntax

- We can pass the props as spread operator eg: `<Avatar {...props} />` and `Profile({ person, size, isSepia, thickBorder })`, check `App.tsx`.

### How to read values from child to parent

- We can add some state from parent and pass it to the child, and read some data from it.

### Responding to Events

- To add an event handler, you will first define a function and then pass it as a prop to the appropriate JSX tag.
- Get realtime data from child, eg: Input child give data to parent state variable,

  `<input type="text" placeholder="Enter the task" value={inputProps.task} onChange={(event)=> InputOnchange(event, inputProps.setTask)} className="inputField"/>`

  `function InputOnchange(event: React.ChangeEvent<HTMLInputElement>, setTask: React.Dispatch<React.SetStateAction<string>>){
setTask(event.target.value)}`

### Event propagation (event bubbling)

- We use `e.stopPropagation()` to stop this issue. Ref: https://react.dev/learn/responding-to-events#stopping-propagation

### Preventing default behavior

- We can call `e.preventDefault()` on the event object to stop this from happening.
- This is usually useful in Form element etc.. Ref: https://react.dev/learn/responding-to-events#preventing-default-behavior
- In `InputField.tsx` file we implemented the onSumbit handler, by passing the event reference on callback function.
- We thus prevent the page refresh.
