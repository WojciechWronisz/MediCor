import { useEffect, useState } from 'react';
import './PageShimmer.css';

export default function PageShimmer() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisible(false);
      return;
    }

    const leaveTimer = window.setTimeout(() => setLeaving(true), 700);
    const hideTimer = window.setTimeout(() => setVisible(false), 1100);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`page-shimmer ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="page-shimmer-bar" />
      <div className="page-shimmer-grid">
        <div className="page-shimmer-block wide" />
        <div className="page-shimmer-block" />
        <div className="page-shimmer-block" />
        <div className="page-shimmer-block" />
      </div>
    </div>
  );
}
