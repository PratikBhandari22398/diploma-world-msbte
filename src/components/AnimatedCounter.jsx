import React, { useState, useEffect } from 'react';

/**
 * Animated number counter with smooth ease-out animation
 * Example usage:
 * <AnimatedCounter target={5.26} suffix="K+" decimals={2} />
 * <AnimatedCounter target={1.37} suffix="M+" decimals={2} />
 * <AnimatedCounter target={236} suffix="+" />
 */
export default function AnimatedCounter({ 
  target, 
  duration = 1600, 
  suffix = '', 
  prefix = '',
  decimals = 0 
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const numericTarget = typeof target === 'number' ? target : parseFloat(target) || 0;
    
    // Auto-detect decimals if not explicitly set
    let dec = decimals;
    if (dec === 0 && target.toString().includes('.')) {
      dec = target.toString().split('.')[1].length;
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Cubic ease-out curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = ease * numericTarget;
      
      setCurrent(value);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrent(numericTarget);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [target, duration, decimals]);

  const formatted = decimals > 0 
    ? current.toFixed(decimals) 
    : Math.floor(current).toLocaleString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
