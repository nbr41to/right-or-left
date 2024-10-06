import { Button } from '@mantine/core';
import { Chip } from '@/components/Chip';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center gap-4">
      <div className="grid grid-cols-4 gap-3 w-fit mx-auto">
        <Chip color="red" size={32} />
        <Chip color="yellow" size={32} />
        <Chip color="blue" size={32} />
        <Chip color="black" size={32} />
      </div>

      <h1 className="flex flex-col items-center font-bold mx-auto w-fit">
        <span className="text-4xl text-red-500">Right</span>
        <span className="text-2xl">or</span>
        <span className="text-4xl text-blue-600">Left</span>
      </h1>

      <div className="mx-auto w-fit">
        <Button size="lg" radius={9999} component={Link} href="playing">
          Game Start
        </Button>
      </div>
    </div>
  );
}
