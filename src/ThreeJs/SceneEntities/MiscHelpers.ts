import * as THREE from 'three';

import { AbstractSceneEntity, ISceneEntity } from '../AbstractScene/AbstractSceneEntity';

export class MiscHelpers extends AbstractSceneEntity implements ISceneEntity {
  async init() {
    return new Promise<THREE.Group>(resolve => {
      const axesHelper = new THREE.AxesHelper(500);
      // Mark this as helper in order to be toggle-able
      axesHelper.userData.isHelper = true;
      this._sceneEntityGroup.add(axesHelper);
      resolve(this._sceneEntityGroup);
    });
  }

  update = (time: number) => {
    this._sceneEntityGroup.position.x += time * 0;
  };
}
