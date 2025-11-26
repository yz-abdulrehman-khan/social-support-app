import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  /** Delay before typing starts (ms) */
  startDelay?: number;
  /** Time per character (ms) */
  charDelay?: number;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Called when typing animation completes */
  onComplete?: () => void;
}

/**
 * TypingText - Displays text with a typewriter animation effect
 *
 * Usage: Use `key` prop on parent to force remount when text changes (e.g., language switch)
 * Example: <TypingText key={language} text={translatedText} />
 */
export function TypingText({
  text,
  startDelay = 300,
  charDelay = 35,
  showCursor = true,
  className = '',
  onComplete,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Start typing after initial delay
  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  // Type characters one by one
  useEffect(() => {
    if (!isTyping || isComplete) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, charDelay);
      return () => clearTimeout(timer);
    }

    // Animation complete
    setIsComplete(true);
    onComplete?.();
  }, [isTyping, displayedText, text, charDelay, isComplete, onComplete]);

  // Cursor blinking - stops when complete
  useEffect(() => {
    if (!showCursor || isComplete) {
      setCursorVisible(true);
      return;
    }

    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, [showCursor, isComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span
          className={`inline-block w-[2px] h-[1em] bg-current align-middle transition-opacity duration-100 ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ marginInlineStart: '2px' }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
