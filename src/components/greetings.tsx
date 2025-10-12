'use client';

export default function Greetings() {
  const time = new Date().getHours();
  return (
    <span className="font-bold text-3xl">
      Good{' '}
      {time > 4 && time < 12
        ? 'Morning'
        : time > 12 && time < 16
        ? 'Afternoon'
        : 'Evening'}
      !
    </span>
  );
}
