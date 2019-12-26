import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { useDispatch, useSelector } from 'react-redux';
import { Todo, getTodos, addTodo, pickTodo, deleteTodo } from '../actions';
import { Button, Card, CardBody, CardHeader, Input, Form } from 'reactstrap';
import { StoreState } from '../reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

const initialData: Todo[] = [
  {
    id: uuid(),
    name: 'John Doe',
    selected: false
  },
  {
    id: uuid(),
    name: 'Foo Bar',
    selected: false
  }
];

const App: React.FC = () => {
  const [newName, setNewName] = useState('');
  const [selectedName, setSelectedName] = useState({ id: '', name: '', selected: false });
  const todos = useSelector((state: StoreState) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    if (_.isEmpty(todos.length)) {
      dispatch(getTodos(initialData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePickName = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const getUnselectedTodos = todos.filter(item => {
      return !item.selected;
    });
    const randomName = _.sample(getUnselectedTodos);

    if (randomName !== undefined) {
      dispatch(pickTodo(randomName));
      setSelectedName(randomName);

      // unselect previous name
      const unselect = _.map(todos, item => {
        if (!_.isEqual(item.name, randomName.name)) {
          item.selected = false;
        } else {
          item.selected = true;
        }
        return item;
      });
      dispatch(getTodos(unselect));
    }
  };

  const handleAddName = (): void => {
    if (newName) {
      const object = {
        id: uuid(),
        name: newName,
        selected: false
      };
      dispatch(addTodo(object));
      setNewName('');
    }
  };

  return (
    <div className="container m-5" style={{ width: '500px' }}>
      <Card>
        <CardHeader>List of names</CardHeader>
        {todos.map((item, i) => (
          <CardBody key={i}>
            <div>
              {item.name}
              <span
                className="pl-3"
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch(deleteTodo(item.id))}
              >
                <FontAwesomeIcon icon="trash" />
              </span>
            </div>
          </CardBody>
        ))}
      </Card>

      <div className="pt-4">
        <Form
          inline
          onSubmit={e => {
            e.preventDefault();
            handleAddName();
          }}
        >
          <div>
            <Button onClick={e => handlePickName(e)} className="mr-2">
              Pick Name
            </Button>
            <Input value={selectedName.name} readOnly />
          </div>
          <div className="mt-3">
            <Input value={newName} onChange={e => setNewName(e.target.value)} />

            <Button type="submit" className="ml-3">
              Add
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default App;
