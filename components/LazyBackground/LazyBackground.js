import React from "react";
import { useLayoutEffect, useRef, useState } from "react";

const LazyBackground = ({ children, bgImage, ...props }) => {
  const ref = useRef(null);
  const [onView, setOnView] = useState(false);
  useLayoutEffect(() => {
    if (ref.current && "IntersectionObserver" in window) {
      let lazyBackgroundObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setOnView(true);
            lazyBackgroundObserver.unobserve(entry.target);
          }
        });
      });
      lazyBackgroundObserver.observe(ref.current);
    }
  }, [ref.current]);

  return (
    <div
      ref={ref}
      style={onView ? { backgroundImage: `url(${bgImage})` } : {}}
      {...props}
    >
      {children}
    </div>
  );
};

export default LazyBackground;
