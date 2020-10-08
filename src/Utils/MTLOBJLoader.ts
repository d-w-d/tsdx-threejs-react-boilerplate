import * as THREE from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

import { resizeThreeJsObject } from './resizeThreeJsObject';
import { enshadowChildren } from './enshadowChildren';
import { centerOnBoundingBox } from './centerOnBoundingBox';

/**
 * Wrapper around OBJLoader2, MTLLoader, and MtlObjBridge letting me just specify
 * urls to the obj and mtl files, a scaling factor, and a callback to use resulting threeJs object
 * based on this source: https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_obj2.html
 */
export function MTLOBJLoader(
  mtlUrl: string,
  objUrl: string,
  cbOnReady: (obj: THREE.Object3D) => void,
  targetRadius?: number,
  isCenteredOnBoundingBox?: boolean,
  isShadowShown?: boolean
): void {
  new MTLLoader().load(mtlUrl, function(mtlParseResult) {
    // ----------------------------------------------->>>

    const objLoader2 = new OBJLoader2();
    objLoader2.setModelName('name-give-here');
    objLoader2.addMaterials(MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult), true);
    objLoader2.load(
      objUrl,
      object => {
        if (!!targetRadius) resizeThreeJsObject(object, targetRadius);
        if (!!isCenteredOnBoundingBox) centerOnBoundingBox(object);
        if (!!isShadowShown) enshadowChildren(object);
        cbOnReady(object); // Signal object readiness
      },
      xhr => {
        // Called when loading is in progress
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      error => {
        console.log('Loading error occurred:', error.message);
      }
    );
  });
}
