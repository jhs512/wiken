import React, { useState, useEffect } from 'react';
import {classnames} from 'tailwindcss-classnames';
import { render } from 'react-dom';

const KenReplyApp = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.!!
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div className={classnames('', 'mx-auto', 'w-[711px]', 'bg-[#00ffff55]')}>
      댓글이 구현될 예정입니다!!
    </div>
  );
}

render(
  <KenReplyApp />,
  document.getElementById('KenReplyApp')
);
