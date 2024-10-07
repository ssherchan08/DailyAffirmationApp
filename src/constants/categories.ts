type CategoryKey = 'motivation' | 'selfLove' | 'positivity';

const categories: Record<CategoryKey, string[]> = {
  motivation: [
    'You are capable of amazing things!',
    'Believe in yourself and all that you are.',
    'Your only limit is you.',
    'Push yourself, because no one else is going to do it for you.',
    'Great things never come from comfort zones.',
  ],
  selfLove: [
    'You are enough just as you are.',
    'Love yourself first, and everything else falls into line.',
    'You are worthy of love and happiness.',
    'You deserve to be treated with respect.',
    'Self-love is not selfish; it is essential.',
  ],
  positivity: [
    'Stay positive, work hard, and make it happen.',
    'Every day may not be good, but there is something good in every day.',
    'Choose to be optimistic; it feels better.',
    'Keep your face always toward the sunshine—and shadows will fall behind you.',
    'The only limit to our realization of tomorrow will be our doubts of today.',
  ],
};

export default categories;
