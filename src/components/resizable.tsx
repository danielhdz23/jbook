import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';
import { useEffect, useState } from 'react';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [widthInner, setInnerWidth] = useState(window.innerWidth);
  const [heightInner, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      width,
      height: Infinity,
      resizeHandles: ['e'],
      maxConstraints: [widthInner * 0.75, Infinity],
      minConstraints: [widthInner * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, heightInner * 0.9],
      minConstraints: [Infinity, 24]
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
