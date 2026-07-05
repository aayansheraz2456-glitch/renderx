import { useEffect, useRef } from 'react';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Desktop Mouse Scrubbing Hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prevX = { current: null as number | null };
    const isSeeking = { current: false };
    const pendingTime = { current: null as number | null };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) {
        prevX.current = null;
        return;
      }

      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      const currentX = e.clientX;
      if (prevX.current === null) {
        prevX.current = currentX;
        return;
      }

      const delta = currentX - prevX.current;
      prevX.current = currentX;

      // Update target scrub time (relative mouse movement delta * speed factor)
      let targetTime = video.currentTime + (delta / window.innerWidth) * 0.8 * duration;
      targetTime = Math.max(0, Math.min(duration, targetTime));

      if (isSeeking.current) {
        pendingTime.current = targetTime;
      } else {
        isSeeking.current = true;
        video.currentTime = targetTime;
      }
    };

    const handleSeeked = () => {
      isSeeking.current = false;
      if (pendingTime.current !== null) {
        const nextTime = pendingTime.current;
        pendingTime.current = null;
        isSeeking.current = true;
        video.currentTime = nextTime;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      prevX.current = e.clientX;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  // Mobile Autoplay Hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlayState = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.play().catch((err) => {
          console.warn('Mobile autoplay failed or was prevented:', err);
        });
      } else {
        video.pause();
      }
    };

    handlePlayState();
    window.addEventListener('resize', handlePlayState);
    return () => {
      window.removeEventListener('resize', handlePlayState);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full bg-neutral-950">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-right lg:object-right-bottom"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
