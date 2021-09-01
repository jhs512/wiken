import React, { useState, useEffect } from 'react';
import {classnames} from 'tailwindcss-classnames';
import { render } from 'react-dom';

const KenReplyApp = () => {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 같은 방식으로
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    document.title = `You clicked ${count} times`;
  });

  return (
    <div className={classnames('', 'mx-auto', 'w-[450px]', 'bg-[#ff00ff55]')}>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

render(
  <KenReplyApp />,
  document.getElementById('KenReplyApp')
);
