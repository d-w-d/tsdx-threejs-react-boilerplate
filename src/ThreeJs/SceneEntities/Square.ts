import * as THREE from 'three';

import { AbstractSceneEntity, ISceneEntity } from '../AbstractScene/AbstractSceneEntity';

export class Square extends AbstractSceneEntity implements ISceneEntity {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>

  constructor(private sideLength: number) {
    super();
  }

  async init() {
    return new Promise<THREE.Group>(resolve => {
      // Build Square Mesh
      const material = new THREE.MeshPhongMaterial();
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(this.sideLength, this.sideLength, this.sideLength),
        material
      );
      this._sceneEntityGroup.add(mesh);
      this._sceneEntityGroup.position.z = -10;
      resolve(this._sceneEntityGroup);
    });
  }

  update = (time: number) => {
    this._sceneEntityGroup.position.x += time * 0;
  };
}
