/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { kanbanCardStyles, kanbanCardTitleStyles } from './App';

const kanbanNewCardStyles = `
        ${kanbanCardTitleStyles}

        & > input[type="text"] {
          width: 80%;
        }
      `;
export default function KanbanNewCard({ onSubmit }) {
  const [title, setTitle] = useState('');
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title);
    }
  };

  return (
    <li css={kanbanCardStyles}>
      <h3>添加新卡片</h3>
      <div css={kanbanNewCardStyles}>
        <input type="text" value={title}
          onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </li>
  );
}
