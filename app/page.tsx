import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <Link href='/account' className='mb-5'>
        <Button>Go to account page</Button>
      </Link>
      <Link href='/todolist'>
        <Button>Go to ToDoList page</Button>
      </Link>
    </main>
  );
}
