'use client';

import {Check ,CheckCheck, Edit, Trash2, Undo2 } from 'lucide-react';
import React, { useState } from 'react';

import { Todo } from '@/lib/types';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HomePage = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editValue, setEditValue] = useState('');

  const addTask = () => {
    if(inputValue == '') return alert('Please input Task!')
    const rowNumber = [...todos];

    setTodos([
      ...todos,
      { id: rowNumber.length + 1, value: inputValue, done: false, edit: false },
    ]);
    setInputValue('');
  };

  const markToDone = (id: number) => {
    setTodos(
      todos.map((prevTodos) =>
        prevTodos.id === id
          ? { ...prevTodos, done: !prevTodos.done }
          : prevTodos
      )
    );
  };

  const removeTask = (id: number) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const editTask = (id: number) => {
    if(editValue == '') return alert('Please input Edit Task!')
    setTodos(
      todos.map((prevTodos) =>
        prevTodos.id === id
          ? { ...prevTodos, value:editValue, edit: !prevTodos.edit }
          : prevTodos
      )
    );
    setEditValue('');
  };

  const handleEdit = (id: number) => {
    setTodos(
      todos.map((prevTodos) =>
        prevTodos.id === id
          ? { ...prevTodos, value:editValue, edit: !prevTodos.edit }
          : prevTodos
      )
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const handleInputChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  return (
    <main className='max-w-xl mx-auto space-y-4 py-10'>
      <h1 className='text-2xl font-bold text-center'>To-Do List</h1>

      <div className='flex items-center gap-2'>
        <Input
          placeholder='Input Task Here'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <Button onClick={() => addTask()}>Add To-Do</Button>
      </div>

      <ul className='flex flex-col gap-2'>
        {todos.map((prevTodos) => (
          <li key={prevTodos.id} className='w-full flex  justify-between gap-2'>
            <p
              className={cn(
                'font-bold max-w-[298px] break-words',
                prevTodos.done ? 'line-through' : ''
              )}
            >
              {prevTodos.edit ? 
              <Input 
                placeholder='Edit Here'
                value={editValue} 
                onChange={handleInputChangeEdit}
                /> : prevTodos.value}
            </p>

            <div className='flex  gap-1'>
              <Button
                className='gap-1'
                onClick={() => markToDone(prevTodos.id)}
              >
                {prevTodos.done ? (
                  <>
                    <Undo2 size={16} />
                    <span>Undone</span>
                  </>
                ) : (
                  <>
                    <CheckCheck size={16} />
                    <span>Done</span>
                  </>
                )}
              </Button>

              {prevTodos.edit ? ( 
                  <Button 
                    className='gap-1' 
                    onClick={() => editTask(prevTodos.id)}
                    >
                      <Check size={16} /> Edit
                    </Button>
                  ) : (
                  <Button 
                    className='gap-1' 
                    onClick={() => handleEdit(prevTodos.id)}
                    >
                      <Edit size={16} /> Edit
                  </Button>
                )
              }

              <Button
                onClick={() => removeTask(prevTodos.id)}
                variant='destructive'
                className='gap-1'
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
