// EmojiPicker.js

const emojis = [
  '😄',
  '😂',
  '😍',
  '😘',
  '😎',
  '🤪',
  '🥰',
  '👍',
  '🫣',
  '🔥',
  '😢',
  '😱',
  '😡',
  '💀',
  '💩',
  '👻',
  '💔',
  '🐷',
  '🐇',
  '🍷',
  '🍸',
  '🍺',
];

export default function EmojiPicker({ onEmojiClick }) {
  return (
    <div>
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={(event) => {
            event.preventDefault();
            onEmojiClick(emoji);
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
