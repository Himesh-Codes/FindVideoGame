import * as renderer from 'react-test-renderer';
import InputField from '../components/InputField';
import { TaskState } from '../interfaces/task';

// snapshot validation on field UI changes
it('input field UI changes validation', () => {
    const mockCallback = jest.fn();
    const inputProps: TaskState = {task: "", setTask: ()=>{}, addTasks: mockCallback};
    const inputComponentTree = renderer.create(
        <InputField {...inputProps} />
    ); //render the component tree created
    let treeJsom = inputComponentTree.toJSON(); // convert tree to JSON
    expect(treeJsom).toMatchSnapshot(); //expect the snapshot comparison

    //functional test with submit
   renderer.act(() => {
      (treeJsom as renderer.ReactTestRendererJSON).props.onSubmit(); // Simulate the form submit
    });

    // rerender the component
    treeJsom = inputComponentTree.toJSON();
    // Assert that the mock event object was called with the expected arguments
    expect(mockCallback).toHaveBeenCalledTimes(1);
});