import * as React from 'react';

import { AppEntry, IProps } from './Components/AppEntry';

/**
 * Entry Point Into React Apps
 */
export const TsdxThreeJsReactBoilerplate = (props: IProps) => {
  return <AppEntry {...props} />;
};

/**
 * Entry Point Into UMD Apps
 * They must supply their own React and ReactDOM
 */
export const Init = (id: string = 'root', props: IProps) => {
  // @ts-ignore
  ReactDOM.render(
    <TsdxThreeJsReactBoilerplate {...props} />,
    document.getElementById(id)
  );
};
