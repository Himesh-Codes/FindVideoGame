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

### Scripts

- We can add the basic script, for `Vite` based react app.

           "scripts": {
                  "dev": "vite",
                  "start": "vite",
                  "build": "tsc && vite build",
                  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
                  "preview": "vite preview"
            }

- Custom scripts we can add, like in above I added `start`.
- Inorder to run script we can do command: `npm run <script item>`.

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
- You can read state at any time. However, each render has its own snapshot of state which does not change.
- The useState Hook provides those two things:

  A state variable to retain the data between renders.
  A state setter function to update the variable and trigger React to render the component again.

- State will remember something on component's memory, even after a DOM refresh.

- Our application refresh everytime since the parent component have `task` & `tasks` state. It updates on every entry in input field and every add of tasks.

            const [task, setTask] = useState<string>("");
            const [tasks, pushStacks] = useState<Task[]>([]);

             const addTasks = (event: React.FormEvent) => {
                  // prevent the page refresh
                  event.preventDefault();
                  if (task) {
                        recentTaskUid = `${Date.now().toString()}-${task}`;
                        pushStacks([...tasks, {id: `${recentTaskUid}`,taskName:task}]);
                        // empty the input after add
                        setTask("");
                  }
                  };

### useState with Array

- We can't directly append array data, https://react.dev/learn/updating-arrays-in-state.
- Same applicable for removing, update, replace array items.
- Like with objects, you should treat arrays in React state as read-only. This means that you shouldn’t reassign items inside an array like arr[0] = 'bird', and you also shouldn’t use methods that mutate the array, such as push() and pop().

### Passing Props to a Component

- React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props.
- We can pass any JS values in props to react the child.

### Spread Operator (...) usage in passing props

- It is very useful to create the ts constant variable with the props data need to pass in components.
- Reference `App.tsx` file.

      let inputProps: TaskState = {task: task, setTask: setTask, addTasks: addTasks};
      <InputField {...inputProps}/>

### Forwarding props with the JSX spread syntax

- We can pass the props as spread operator eg: `<Avatar {...props} />` and `Profile({ person, size, isSepia, thickBorder })`, check `App.tsx`.

### How to read values from child to parent

- We can add some state from parent and pass it to the child, and read some data from it.

### React Conditional Rendering

- We use terniary operatot (<ifcase> ? <thisone> : <otherone>). Eg:

            <span className='taskName'>{task.taskName}</span>
                  {
                        task.isDone ? (
                              <span className='taskIcon'  onClick={()=>handleDone(taskList, task.id)}><MdOutlineDownloadDone /></span>
                        ) : (
                              <>
                              <span className='taskIcon'><GrEdit /></span>
                              <span className='taskIcon' onClick={()=>handleDelete(taskList, task.id)}><RiDeleteBin5Line /></span>
                              <span className='taskIcon'  onClick={()=>handleDone(taskList, task.id)}><MdOutlineDownloadDone /></span>
                              </>
                        )
                  }

### Responding to Events

- To add an event handler, you will first define a function and then pass it as a prop to the appropriate JSX tag.
- Get realtime data from child, eg: Input child give data to parent state variable,

      <input type="text" placeholder="Enter the task" value={inputProps.task} onChange={(event)=> InputOnchange(event, inputProps.setTask)} className="inputField"/>

      function InputOnchange(event: React.ChangeEvent<HTMLInputElement>, setTask: React.Dispatch<React.SetStateAction<string>>){

      setTask(event.target.value)}

### Event propagation (event bubbling)

- We use `e.stopPropagation()` to stop this issue. Ref: https://react.dev/learn/responding-to-events#stopping-propagation

### Preventing default behavior

- We can call `e.preventDefault()` on the event object to stop this from happening.
- This is usually useful in Form element etc.. Ref: https://react.dev/learn/responding-to-events#preventing-default-behavior
- In `InputField.tsx` file we implemented the onSumbit handler, by passing the event reference on callback function.
- We thus prevent the page refresh.

## Referencing Values with Refs (useRef Hook)

- You can add a ref to your component by importing the useRef Hook, will act as a state permanently holded for that component. (https://react.dev/learn/referencing-values-with-refs)
- Doesn’t trigger re-render when you change it.
- You can access the current value of that ref through the ref.current property. This value is intentionally mutable, meaning you can both read and write to it. It’s like a secret pocket of your component that React doesn’t track.

      const inputFieldActive = useRef<HTMLInputElement>(null);

      <form className="addTask" onSubmit={(event)=> HandleSubmit(inputProps, event, inputFieldActive)}>
        <input ref={inputFieldActive}/>

      inputFieldActive.current?.blur();

      Since the `ref` is an HTMLInputElement, we have access to properties on DOM attributes (https://react.dev/learn/manipulating-the-dom-with-refs).

- In the `TaskCard.tsx` we used `useRef` hook to focus in the edit input field & `useEffect` to the edit click response.

              // edit field focus-in
            const focusInput = useRef<HTMLInputElement>(null);

            //effect hook listen to the edit flag and responds
            useEffect(()=>{
                  focusInput.current?.focus(); // focus on input
            }, [isEdit]);

## Rendering Lists (state Lists)

- Lists can be rendered using js default utility functions `map() or filter()`. (https://react.dev/learn/rendering-lists)
- Rendered in a elements with data in curly bracket `{}`. (`<li>{task.taskName}</li>`)
- Reference `TaskList.tsx`.

        const tasksListDom = tasksList.tasks.map(task => <li>{task.taskName}</li>);

  CONSOLE WARNING: `Warning: Each child in a list should have a unique “key” prop.`

  You need to give each array item a `key` — a string or a number that uniquely identifies it among other items in that array

  Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.

      <li key={person.id}>...</li>

## Passing Data Deeply with Context (useContext)

- Context are meant to store any kind of data, which can be accessible by any of the components without passing as `props`, no matter in which position they are in the tree.
- This eliminates the passing of pop drilling (long chain of props passing through component tree).
- It is a common sharing state can be accessible by any components in application, Global data for entire application.

https://www.youtube.com/watch?v=HYKDUF8X3qI

Here in the application we have implemented the tasks state as context.
Steps:

- Created a context for tasks and the wrapped the context with all other components. Reference `ApplicationContext.ts`.

      export const ApplicationTaskContext = createContext<Task[] | undefined>(undefined);

- We usually initialize context with `undefined | null`, since we are assigning value after the application initialize.
- Wrap the components inside a context.

      <ApplicationTaskContext.Provider value={tasks}>

      and we pass a value to initialize

- We can use the context in any components without passing it in props. Reference- `TaskList.tsx`.

      const tasks = useContext(ApplicationTaskContext);

- Alternative to check the context have value or not, since context have `undefined | null` intial value, with typescript conditions like below.

      if (tasks) {
      tasksListDom = tasks.map(task => <li key={task.id}>{task.taskName}</li>)
      }

  We can create a `Custom Hook` that handles this.

## Custom Hook

- React supports for creating custom hooks for our own usecase.
- Here we use it for check the context have value or not. Reference - `ApplicationContext.tsx->useTaskContext()`.
- As a best practice we will throw error when the context is undefined (here it is task context). Else we return the context data, thus we validate and use the context using custom hooks.

      //custom hook for context data validation
      export function useTaskContext(){
      const tasks: Task[] | undefined = useContext(ApplicationTaskContext);
      if(tasks === undefined){
      throw new Error("UseTaskContext need to be used with initiliaze a value in context wrapper provider.");
      }

      return tasks;
      }

## Effect Hook (useEffect)

- Used to perform the side effect.
- Side effect are result of the state changing. When application goes with one state to other it cause a side effect and this can be controlled using the `useEffect`.
- The use is simply as an event listener of states in react application.
- The useEffect have 3 params

      useEffect(()=>{
        // The code that runs on that effect

        // optional return function
      }, []) // The dependency array optional, in which trigger statement added

- Dependency array is optional, if not provided the useEffect will not run the code.
- But even if dependency array is not provided the useEffect with run the code atleast one time, on mount.
- Dependency array can hold a variable

We used useEffect here to identify new taskCard with useEffect on mount and remove that on data changes, with help of useState (that changes on second render), since the second useRef only works on mount time of component, like constructor of object.

            // custom hook usage for edit and delete
            const taskList: TaskListProp = useTaskContext();
            // this will set true since the useEffect constructor works on the component mounts to DOM
            const [isNewTask, setBackNewTask] = useState<boolean>(true);

            useEffect(()=>{
                  // The code that runs on that effect
                  if (isNewTask !== false) {
                        setBackNewTask(false);
                  }
                  // optional return function
            }, [taskList]); // The dependency array optional, in which trigger statement added

            useEffect(()=>{
                  setBackNewTask(true);
                  // optional return function
            }, []);

#### Usecases

- Synchronizing with Effects: useEffect run the code in every render
- Event handlers - Run code based on render dependency

            useEffect(() => {
            // This runs after every render since no dependecy defined
            });

            useEffect(() => {
            // This runs only on mount (when the component appears)
            }, []);

            useEffect(() => {
            // This runs on mount *and also* if either a or b have changed since the last render
            }, [a, b]);

- Clean up (Destructor) : When a dependency change, before the value is changed, since useEffect get destroyed on every change and do the logic in cleanup `return`. This will help to unsubscribe the things, like clear a timeout, clearInterval, or an event listener etc..

            useEffect(() => {
            // This runs on mount *and also* if either a or b have changed since the last render
            console.log(a);
            return()=>{
                  console.log("I am cleaned-up");
            }
            }, [a]);

- Component mount/unmount listener: If no dependency is added with empty array, it works on component mount (Constructor) and component unmount.

            useEffect(() => {
            // This runs on mount *and also* if either a or b have changed since the last render
            console.log(a);
            return()=>{
                  console.log("I am cleaned-up");
            }
            }, []);

## Reducer Functionality (useReducer)

- https://www.youtube.com/watch?v=rgp_iCVS8ys
-

## React Icons

- We use the react icons for the app icons.
- https://react-icons.github.io/react-icons/
- To use : npm install react-icons --save

      import { FaBeer } from 'react-icons/fa';

- In our case in `TaskCard.tsx`

      import { GrEdit } from 'react-icons/gr';

      And use: <GrEdit />

# React Testing (Jest + React Testing Library)

We use Jest (framework) with React testing library default install with `create react app`.

- https://testing-library.com/docs/react-testing-library/intro
- https://jestjs.io/docs/tutorial-react

Frontend test allows us to do the manual testing automation on expected behaviour.
The testes are divided into `unit test` (functional level test), `integration test` (combined functional tests/unit tests), `end to end test` (the user level tests, with infact how the user use application in different usecases)

### Advantages

- Allow us to catch bugs easliy (when introduce new feature it may break existing functionality, so if we have test cases it would be easily catchable)
- Increase confidence of application, since all testcases are defined.
- Speed ups the QA times (the every basic features can be tested automatically).
- Tests can be serve as documentation, since all features are testcases we could understand the application better.

## Unit Testing

- Test the functional level expectations.
- Rather than test each functions, writing the test for each features is `recommended in big applications`.
- This test will emphasis on each component based feature isolated testing.

### Jest + React Testing Library Unit test (In typescript project)

https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd

- https://babeljs.io/docs/
- https://jestjs.io/docs/getting-started

#### Install Dependencies:

- First, make sure you have the necessary dependencies installed. You will need:

- Jest: A testing framework for JavaScript and TypeScript.
- ts-jest: A TypeScript preprocessor for Jest.
- babel-jest: To transform your code using Babel for testing.
- @testing-library/react: To test React components.
- @babel/preset-env: Babel preset for environment support.
- You can install these dependencies using npm

            npm install --save-dev jest jest-environment-jsdom @testing-library/jest-dom @types/jest ts-jest babel-jest @testing-library/react @babel/preset-env @babel/preset-typescript

#### Configure Babel:

- Create a `.babelrc` file in your project's root directory to configure Babel:

           {
                  "presets": [
                  ["@babel/preset-env", { "targets": { "node": "current" } }],
                  "@babel/preset-typescript"
                  ]
            }

#### Configure test script

- Add the following section to your package.json:

            {
                  "scripts": {
                        "test": "jest"
                  }
            }

#### Jest Configuration:

- Create a `jest.config.cjs` file in your project's root directory to configure Jest:

            module.exports = {
                  preset: "ts-jest",
                  testEnvironment: "jest-environment-jsdom",
                  transform: {
                  "\\.(js|jsx|ts|tsx)$": "babel-jest"
                  },
                  moduleDirectories: ["node_modules", "src"],
                  setupFilesAfterEnv: ["@testing-library/jest-dom"],
                  moduleNameMapper: {
                  "\\.(css|less|scss)$": "identity-obj-proxy",
                  },
            };

- Run command for css filter config

            npm install identity-obj-proxy --save-dev

- Jest configuration file is being treated as an ES module because your project is configured as an ES module using the "type": "module" setting in your package.json.
- To resolve this issue, Change Your Jest Configuration File Extension
- Rename your `jest.config.js` file to `jest.config.cjs`. This new extension (cjs) is recognized as a CommonJS module, and Jest should be able to parse it correctly.

#### Create Tests:

- Create your test files with a .test.tsx or .test.ts extension.
- For example, you might have a file named MyComponent.test.tsx:

            import React from "react";
            import { render, screen } from "@testing-library/react";
            import "@testing-library/jest-dom";
            import MyComponent from "../MyComponent"; // import your React library component

            test("it renders correctly", () => {
                  render(<MyComponent />);
                  const element = screen.getByText("Hello, World!");
                  expect(element).toBeInTheDocument();
            });

#### Run test

- Run the test by command `npm run test`

### How it works

- When we run command `npm run test`, the react search and find all test files in project directory with `*.test.tsx` or `*.test.js` file name format.

- React Testing Lib Tutorial - https://www.robinwieruch.de/react-testing-library/
- Jest API - https://jestjs.io/docs/api

Test Workflow is as follows

- Render a component we need to test
- Find elements we need to interact with
- Interact with those elements
- Assert the results are as expected

- Basic testing -

            import { render, screen } from "@testing-library/react";
            import "@testing-library/jest-dom";
            import App from "../App";

            test('initial screen check list', () => { //description of test
            render(<App/>); // render the test component
            const header = screen.getByText(/Taskify/i); // find the elements
            expect(header).toBeInTheDocument(); //jest-dom based assert the result
            }, 8); // timeout on max time we wait for test to execute

### Jest Watch Mode

- Watch mode is an option where we can pass to jest asking the watch files that have changed since last commit, and execute the tests related to those changes in files.
- An optimisation on test runs.

Usually with `create-react-app` it is default when run tests. If we use `Vite` we can do config in scripts in `package.json`.

                   "scripts": {
                        "testwatch": "jest --watch"
                  },

And run - `npm run testwatch`.

- If we do development by started a jest watch mode in terminal, on the development time itself we can catch the edge cases on test, and issue in our devoloping code.

### Test methods (continues)

- Snapshot testing - https://jestjs.io/docs/snapshot-testing
- Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.
- This helps us to validate the UI is not changed unexpectedly with our new changes, basically the components need protected UI design can be introduced in this test.
- A typical snapshot test case renders a UI component, takes a snapshot, then compares it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new version of the UI component.
- If new version update is needed for snapshot it can be done with `jest watchmode`.

**Usecase**

- Instead of rendering the graphical UI, which would require building the entire app, you can use a test renderer to quickly generate a serializable value for your React tree.

We tested our input component and it's features in our application as explained below.

- Followed - https://jestjs.io/docs/tutorial-react#snapshot-testing, https://jestjs.io/docs/snapshot-testing
- We need to install `renderer` to render the component to test. This will generate the renderable UI of the component.

            npm i --save-dev react-test-renderer

            npm i --save-dev @types/react-test-renderer

            Install :   "@babel/preset-react": "^7.22.15",

- Reference: test/InputSnap.test.tsx
- Note ES6 import should done for react:

            import * as renderer from 'react-test-renderer';

- Once we created the test closure, create render component & expected snapshot match

            it('input field UI changes validation', (){
                  //render the component tree created
                  const inputComponentTree = renderer.create(
                        <InputField {...inputProps} />
                  );
                  // JSON converted tree
                  const treeJsom = inputComponentTree.toJSON();
                  //expect the snapshot comparison
                  expect(treeJsom).toMatchSnapshot();
            });

- When you run jest test (npm run test), this will produce an output file like this - ref: `taskify/src/test/__snapshots__/InputSnap.test.tsx.snap`.
- Next time when we run test it will compare the output previous snapshot with new snapshot created in new test, if comparison have difference, test will fails.
- Thus the unexpected view changes can be validated,

- What about we need to update UI?
- Then we need to update the snapshot also, JEST provide command `npm test -- -u` and with jest `jest --updateSnapshot` or the jest watchmode have option to update failed snapshots `press i`.
- Then it will update the snapshot with new UI changes.
- Then redo the test to check with the updated UI.

#### Jest react-test-renderer with props

- If component have props with state we can enter the null value/ blank callback function.

                const inputProps: TaskState = {task: "", setTask: ()=>{}, addTasks: ()=>{}};

- And pass the props in the components.

             const inputComponentTree = create(
                  <InputField {...inputProps} />
            ).toJSON();



            //render the component tree created
            const inputComponentTree = renderer.create(
                  <InputField {...inputProps} />
            );

             //functional test with submit
            renderer.act(() => {
                  (treeJsom as renderer.ReactTestRendererJSON).props.onSubmit(); // Simulate the form submit
            });

- We use the mock function of JEST `jest.fn()` and passed in props of component submit.

      const mockCallback = jest.fn();
      const inputProps: TaskState = {task: "", setTask: ()=>{}, addTasks: mockCallback};

- The render component again, and assert the expected call wit `expect(<mock function>).toHaveBeenCalledTimes()`.

            // rerender the component
            treeJsom = inputComponentTree.toJSON();
            // Assert that the mock event object was called with the expected arguments
            expect(mockCallback).toHaveBeenCalledTimes(1);

## Integration Testing

- Interaction with multiple components, or different unit tests in a combined workflow, this is tested with Integration test.
- Like in react let's take an example that add the tasks, that effectively put tasks in the tasklist section component. We test this interaction with components is integration test.

## E2E Testing

- We test the each and every process in user perspective, workflow of an application feature. Like in react app eg: if a user login the username/password entry. success or failure, messages etc..
- The most common library is CypressJs will help for end to end testing.
