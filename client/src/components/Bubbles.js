import React, { useState, useEffect } from 'react';
import { Pack } from '@potion/layout';
import { Svg, Circle } from '@potion/element';

const Bubbles = ({ colors, updateColors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className='bubble-wrap'>
      <p>bubbles</p>
      <Svg width={800} height={800}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[800, 800]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                      onClick={() => updateColors(colors.map(color => color))}
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
