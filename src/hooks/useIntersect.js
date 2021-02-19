import { useEffect, useRef, useState } from 'react'


/**
 * useIntersect custom hook
 * 
 * @param {object} root - The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
 * @param {string} rootMargin - This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections.
 * @param {number} threshold - Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
 * 
 * @returns {array}
 */
const useIntersect = ({ root = null, rootMargin, threshold = 0 }) => {
  const w = typeof window !== 'undefined' ? window : null;

  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);

  // creting reference for new IntersectionObserver instance and setting entry
  const observer = useRef(
    w && new w.IntersectionObserver(([entry]) => setEntry(entry), {
      root,
      rootMargin,
      threshold
    })
  );

  useEffect(
    () => {
      // since ref.current can be mutated, create reference to currentObserver inside useEffect 
      // to make sure cleanup is performed on right ref
      const { current: currentObserver } = observer;
      console.log('currentObserver: ', currentObserver)
      // if node was observed clean up with disconect()
      currentObserver.disconnect();
      // if node exists start observing
      if (node) {
        currentObserver.observe(node);
      }
      // unsubscribe from observing
      return () => currentObserver.disconnect();
    },
    [node]
  );

  return [setNode, entry];
};


export default useIntersect;