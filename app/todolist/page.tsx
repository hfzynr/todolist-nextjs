'use client'
import React, {useState} from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { TodoObject } from '@/app/models/Todo';

const TodolistCheck: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [list, setList] = useState<TodoObject[]>([]);
  const [edit, setEdit] = useState<string>('');

  const addTask = () => {
    const rowNumber = [...list]
    setList([...list, {id: rowNumber.length +1, value: task, done: false, edit: false}])
    setTask('')
  }

  const markToDone = (id: number) => {
    setList(list.map((listObj => listObj.id === id ? {...listObj, done: !listObj.done} : listObj)))
  }

  const removeTask = (id: number) => {
    setList(oldValues => {
      return oldValues.filter(list => list.id !== id)
    })
  }

  const editTask = (id: number, newValue: string) => {
    setList(list.map((listObj => listObj.id === id ? {...listObj, value: newValue, edit: !listObj.edit} : listObj)))
  }

  return <div className='flex flex-col justify-center items-center'>
    <div className='flex flex-row justify-center items-center'>
      <Input 
        className='mx-2 my-4'
        placeholder='Input Task Here'
        value={task}
        onChange={(e) => setTask(e.target.value)}>
      </Input>
      <Button 
        className='mx-2 my-4' 
        onClick={() => addTask()}>
          Add Task
      </Button>
    </div>
    <div className='flex flex-col'>
      <ul id ='listTask'>
        {
          list.map((listObj) => (
            <li 
              className={`${listObj.done ? 'line-through' : ''}`}
              key={listObj.id}
              >
                {listObj.edit ? 
                (<Input 
                  placeholder={listObj.value}
                  onChange={(e) => setEdit(e.target.value)}
                  />) : 
                (<span>{listObj.value}</span>)}
              <Button 
                className='mx-1 my-1'
                onClick={() => editTask(listObj.id,edit)}
                >
                  {`${listObj.edit ? '✓' : '✎'}`}
              </Button>
              <Button 
                className='mx-1 my-1'
                onClick={() => removeTask(listObj.id)}
                >
                  &#10006;
              </Button>
              <Button 
                className='mx-1 my-1'
                onClick={() => markToDone(listObj.id)}
                >
                  {`${listObj.done ? '↺' : '✓'}`}
              </Button>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
  
};

export default TodolistCheck;
