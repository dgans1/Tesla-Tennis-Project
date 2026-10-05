import React, { useRef, useState } from 'react';

export default function OrderingQuestion({ items, disabled, onMove, onSubmit, correctOrder }) {
  const dragged = useRef(null);
  const buttonRefs = useRef({});
  const [announcement, setAnnouncement] = useState('');
  const move = (from, to, item, direction) => {
    if (disabled || from === to) return;
    onMove(from, to);
    setAnnouncement(`${item} moved to position ${to + 1} of ${items.length}.`);
    requestAnimationFrame(() => {
      const refs = buttonRefs.current[item];
      const preferred = refs?.[direction];
      const alternative = refs?.[direction === 'up' ? 'down' : 'up'];
      (preferred && !preferred.disabled ? preferred : alternative)?.focus();
    });
  };
  return <section aria-label="Ordering exercise">
    <p>Drag items into order, or use the Move up and Move down buttons.</p>
    <ol className="ordering-list">
      {items.map((item, index) => <li key={item}
        draggable={!disabled}
        onDragStart={event => { dragged.current = index; event.dataTransfer.setData('text/plain', String(index)); }}
        onDragEnd={() => { dragged.current = null; }}
        onDragOver={event => { if (!disabled) event.preventDefault(); }}
        onDrop={event => {
          event.preventDefault();
          const from = dragged.current;
          if (from !== null) move(from, index, items[from], 'up');
          dragged.current = null;
        }}>
        <span>{item}{correctOrder && <small>{item === correctOrder[index] ? ' ✓ Correct position' : ' — Expected: ' + correctOrder[index]}</small>}</span>
        <div className="ordering-controls">
          {['up', 'down'].map(direction => <button key={direction} type="button"
            ref={element => { (buttonRefs.current[item] ||= {})[direction] = element; }}
            disabled={disabled || (direction === 'up' ? index === 0 : index === items.length - 1)}
            aria-label={`Move ${item} ${direction}`}
            onClick={() => move(index, index + (direction === 'up' ? -1 : 1), item, direction)}>
            Move {direction}
          </button>)}
        </div>
      </li>)}
    </ol>
    <p className="sr-only" role="status">{announcement}</p>
    {!disabled && <button type="button" className="primary" onClick={onSubmit}>Check Answer</button>}
  </section>;
}
