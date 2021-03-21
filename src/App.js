import React, { useState, useEffect } from 'react';

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || 'React'
  );

  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const handleSearch = event => {
      setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (event)=> {
    setSearchTerm(event.target.dataset.search);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />

      <hr />

      <ButtonSort list={stories} onClick={handleClick} />

      <hr />

      <Example />
      <hr />
      
      <Timer />
      <hr />

      <Timer2 seconds={10} />
      
    </div>
  );
};

const Search = ({search, onSearch}) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch} />
  </div>
);

const List = ({ list }) =>
  list.map(item => <Item key={item.objectID} item={item} />);

  const Item = ({ item }) => (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  );

  const ButtonSort = ({list, onClick}) => 
    list.map(item => (
      <span key={item.objectID}>
      <button data-search={item.title} onClick={onClick}>{item.title}</button>
      </span>
  ));

  function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <h2>UseEffect with click update of document title</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
   const timeout = setTimeout(() => {
      setCount(1);
    }, 3000);

   return () => clearTimeout(timeout);
  },[]);

  return (
    <div>
      <h2>UseEffect with timer change after 3 seconds of mounting: {count}</h2>
      
    </div>
  );
}

const Timer2 = ({seconds}) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    useEffect(() => {
      if(!timeLeft) return;
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft -1);
      }, 1000);
      return () => clearInterval(intervalId);
    }, [timeLeft]);
    return (
    <div>
      <h2>Countdown timer with useEffect: {timeLeft}</h2>
      
    </div>
  );
}

export default App;
