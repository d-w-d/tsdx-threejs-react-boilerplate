import React, { useEffect, useRef, useState } from 'react';

import { SceneManager } from '../ThreeJs/SceneManager';
import { useWindowSize } from '../Hooks/useWindowSize';
import { setIsFpsStatsShown } from '../Utils/setIsFpsStatsShown';
import { getSimpleUID } from '../Utils/simpleUID';

export interface IProps {
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
}

const defaultProps: IProps = {
  backgroundColor: 'transparent',
  width: '100%',
  height: '100%',
};

export const AppEntry = (props: IProps) => {
  // ------------------------------------>>>

  const { backgroundColor, width, height } = { ...defaultProps, ...props };
  const uid = useRef(getSimpleUID());
  const containerId = 'container-id-' + uid.current;
  const windowSize = useWindowSize();
  const [demoSceneManager] = useState(new SceneManager(containerId));
  const [isHelpersShown, setIsHelpersShown] = useState(false);

  // On First Render Events
  useEffect(() => {
    demoSceneManager.init();
  }, []);

  useEffect(() => {
    setIsFpsStatsShown(isHelpersShown);
    demoSceneManager.setHelpersVisibility(isHelpersShown);
  }, [isHelpersShown]);

  useEffect(() => {
    demoSceneManager.updateCameraAspect();
  }, [windowSize]);

  return (
    <>
      <div
        id={containerId}
        style={{
          position: 'relative',
          width,
          height,
          minWidth: 100,
          minHeight: 100,
          backgroundColor,
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          onClick={() => setIsHelpersShown(prev => !prev)}
        >
          Toggle Helpers
        </button>
        <button
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          onClick={() => demoSceneManager.toggleRotation()}
        >
          Toggle Camera Rotation
        </button>
      </div>
    </>
  );
};
