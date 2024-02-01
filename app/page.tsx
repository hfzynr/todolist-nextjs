'use client'

import React, {useState} from 'react';

import { Todo } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Home: React.FC = () => {
    const [task, setTask] = useState<string>('');
    const [list, setList] = useState<Todo[]>([]);
  
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
  
    const editTask = (id: number) => {
      const newValue = prompt('edit todo: ');
      if ( newValue == ''){
        alert('Task Cannot be empty!')
      } else if(newValue != null){
        setList(list.map((listObj => listObj.id === id ? {...listObj, value: newValue, edit: !listObj.edit} : listObj)))
        setTask('')
      }
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if(event.key === 'Enter') addTask()
    }

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <div className='flex flex-row justify-center items-center'>
        <Input 
          className='mx-2 my-4'
          placeholder='Input Task Here'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}>
        </Input>
        <Button 
          className='mx-2 my-4' 
          onClick={() => addTask()}>
            Add Task
        </Button>
      </div>
        <ul className =''>
          {
            list.map((listObj) => (
              <li 
                className={`${listObj.done ? 'line-through' : ''}`}
                key={listObj.id}
                >
                {listObj.value}
                <Button 
                  className='mx-1 my-1'
                  onClick={() => editTask(listObj.id)}
                  >
                    Edit
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
                    {`${listObj.done ? 'Undo' : 'Done'}`}
                </Button>
              </li>
            ))
          }
        </ul>
    </main>
  );
}

export default Home;