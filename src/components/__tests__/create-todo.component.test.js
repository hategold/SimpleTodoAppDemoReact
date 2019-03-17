import React from 'react';
import renderer from 'react-test-renderer';
import CreateTodo from "../create-todo.component";

let dateNowSpy;

beforeAll(() => {
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1552837419107);
});

afterAll(() => {
  dateNowSpy.mockRestore();
});

it('renders CreateTodo', () => {
  const tree = renderer
    .create(<CreateTodo/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});