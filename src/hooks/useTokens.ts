'use client';

import { useState, useEffect, useCallback } from 'react';

const INITIAL_TOKENS = 50;
const RESET_INTERVAL_HOURS = 1;

export function useTokens() {
  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [resetTime, setResetTime] = useState<number | null>(null);
  const [timeToReset, setTimeToReset] = useState('');

  const calculateTimeToReset = useCallback((endTime: number) => {
    const now = Date.now();
    const difference = endTime - now;

    if (difference <= 0) {
      return '00:00:00';
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const minutes = Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((difference / 1000) % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }, []);

  const resetTokens = useCallback(() => {
    setTokens(INITIAL_TOKENS);
    localStorage.setItem('deen-journey-tokens', String(INITIAL_TOKENS));
    localStorage.removeItem('deen-journey-reset-time');
    setResetTime(null);
    setTimeToReset('');
  }, []);

  useEffect(() => {
    const storedTokens = localStorage.getItem('deen-journey-tokens');
    const storedResetTime = localStorage.getItem('deen-journey-reset-time');

    if (storedResetTime) {
      const resetTimestamp = Number(storedResetTime);
      if (Date.now() >= resetTimestamp) {
        resetTokens();
      } else {
        setResetTime(resetTimestamp);
        if (storedTokens !== null) {
          setTokens(Number(storedTokens));
        }
      }
    } else {
        if (storedTokens !== null) {
            setTokens(Number(storedTokens));
        } else {
             localStorage.setItem('deen-journey-tokens', String(INITIAL_TOKENS));
        }
    }
  }, [resetTokens]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (resetTime) {
      interval = setInterval(() => {
        const timeString = calculateTimeToReset(resetTime);
        setTimeToReset(timeString);
        if (timeString === '00:00:00') {
           resetTokens();
        }
      }, 1000);
    } else {
        setTimeToReset('');
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resetTime, calculateTimeToReset, resetTokens]);

  const decrementTokens = () => {
    setTokens((prevTokens) => {
      const newTokens = Math.max(0, prevTokens - 1);
      localStorage.setItem('deen-journey-tokens', String(newTokens));
      if (newTokens === 0 && !resetTime) {
        const newResetTime = Date.now() + RESET_INTERVAL_HOURS * 60 * 60 * 1000;
        localStorage.setItem('deen-journey-reset-time', String(newResetTime));
        setResetTime(newResetTime);
      }
      return newTokens;
    });
  };
  
  const tokensDepleted = tokens <= 0;

  return { tokens, decrementTokens, resetTokens, tokensDepleted, timeToReset };
}
