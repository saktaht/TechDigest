"use client";

export default function Home() {
  const handleClick = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/health');
  };

  return (
    <div>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}
