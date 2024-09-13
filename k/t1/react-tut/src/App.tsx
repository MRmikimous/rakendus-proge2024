import { useState } from 'react';
import './App.css';
import ShoppingList from './Products';
import Profile from './Profile';
import Profi from './Profi';

function MyButton({ count, onClick }: { count: number, onClick: () => void }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}

const App = () => {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }


  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
      <AboutPage />
      <Profile />
      <ShoppingList />
      <Profi />
    </div>
  );
};

export default App;
