import * as THREE from "three";
import {sprintf} from 'sprintf-js';
import {Made} from "@exabyte-io/made.js";

import {Wave} from "./wave";

/**
 * Helper to save textual/bitmap data to a file.
 * @param {String} strData - Textual data
 * @param {String} filename
 */
export function saveFile(strData, filename) {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.download = filename;
    link.href = strData;
    link.click();
    document.body.removeChild(link);
}

/**
 * Save image data file with type
 * @param {String} imgData
 * @param {String} type
 */
export function saveImageDataToFile(imgData, type = 'png') {
    try {
        saveFile(imgData, `screenshot.${type}`);

    } catch (e) {
        console.error(e);
    }
}

/**
 * Exports and downloads the content.
 * @param content {String} Content to be saved in downloaded file
 * @param name {String} File name to be written on disk.
 * @param extension {String} File extension.
 * @param mime {String} type of the content.
 * Source: https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
 */
export const exportToDisk = function (content, name = 'file', extension = 'txt', mime = 'application/octet-stream') {
    const blob = new Blob([content], {type: mime});
    const filename = sprintf(`%s.${extension}`, name);
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const blobURL = window.URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);

        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking
        // is enabled.
        if (typeof tempLink.download === 'undefined') tempLink.setAttribute('target', '_blank');

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
};

/**
 * Extracts the lattice from the LineSegments object vertices.
 */
function extractLatticeFromScene(scene) {
/*
    const unitCellObject = scene.getObjectByProperty("type", "LineSegments");
    const vertices = unitCellObject.geometry.vertices;
    const a = vertices[1].sub(vertices[0]).toArray();
    const b = vertices[3].sub(vertices[0]).toArray();
    const c = vertices[17].sub(vertices[0]).toArray();
    console.log(a);
    console.log(b);
    console.log(c);
*/
    const a = [];
    a.push(1.0);
    a.push(0);
    a.push(0);
    const b = [];
    b.push(0);
    b.push(1.0);
    b.push(0);
    const c = [];
    c.push(0);
    c.push(0);
    c.push(1.0);

    return Made.Lattice.fromVectors({
        a,
        b,
        c
    });
}

/**
 * Extracts basis from all SphereMesh objects.
 * The name of the element is extracted from the name of the corresponding 3D object.
 */
function extractBasisFromScene(scene, cell) {
    const elements = [];
    const coordinates = [];
    scene.traverse((object) => {
//        if (object.type === "Mesh") {
//            elements.push(object.name.split("-")[0] || "Si");
//            coordinates.push(object.getWorldPosition().toArray())
//        }
        if ((object.type === "Mesh") && (object.name.indexOf('atom_') === 0)){
            elements.push(object.name.split("_")[2] || "Si");
//            coordinates.push(object.getWorldPosition().toArray())
            coordinates.push(object.position.toArray())
        }
    });
    return new Made.Basis({
        cell,
        elements,
        coordinates,
        units: "cartesian"
    });
}

/**
 * Converts a given scene data to a material.
 * Lattice is constructed from the LineSegments object.
 * Basis is constructed based on all SphereMesh objects.
 */
export function ThreeDSceneDataToMaterial(editor) {
    const scene = editor.scene;
    const vecs = {'max':new THREE.Vector3(), 'min':new THREE.Vector3(), 'center':new THREE.Vector3()}
    const positions = [];
    const posMap = new Map();
    scene.traverse((object) => {
        if ((object.type === "Mesh") && (object.name.indexOf('atom_') === 0)) {
            const pos = new THREE.Vector3();
            object.getWorldPosition(pos);
            positions.push(pos);
            posMap.set(object, pos);
        }
    });

    if(positions.length > 0) {
      vecs.max.x = positions[0].x;
      vecs.max.y = positions[0].y;
      vecs.max.z = positions[0].z;
      vecs.min.x = positions[0].x;
      vecs.min.y = positions[0].y;
      vecs.min.z = positions[0].z;

      for(const pos of positions) {
        if(pos.x > vecs.max.x) vecs.max.x = pos.x;
        if(pos.y > vecs.max.y) vecs.max.y = pos.y;
        if(pos.z > vecs.max.z) vecs.max.z = pos.z;
        if(pos.x < vecs.min.x) vecs.min.x = pos.x;
        if(pos.y < vecs.min.y) vecs.min.y = pos.y;
        if(pos.z < vecs.min.z) vecs.min.z = pos.z;
      }

      vecs.center.x = vecs.max.x - ((vecs.max.x - vecs.min.x) / 2);
      vecs.center.y = vecs.max.y - ((vecs.max.y - vecs.min.y) / 2);
      vecs.center.z = vecs.max.z - ((vecs.max.z - vecs.min.z) / 2);
    }

    for(const [no, mol] of editor.molecules) {
      mol.threeObject.position.x = 0.0;
      mol.threeObject.position.y = 0.0;
      mol.threeObject.position.z = 0.0;
    }

    const offset = 10;
    const lattice = extractLatticeFromScene(scene);
    lattice.type = "ORC";
    lattice.a = vecs.max.x - vecs.min.x + offset;
    lattice.b = vecs.max.y - vecs.min.y + offset;
    lattice.c = vecs.max.z - vecs.min.z + offset;
    lattice.alpha = 90;
    lattice.beta = 90;
    lattice.gamma = 90;

    for(const [obj, pos] of posMap) {
    //scene.traverse((object) => {
        //if ((object.type === "Mesh") && (object.name.indexOf('atom_') === 0)){
            obj.position.x = pos.x - vecs.min.x + offset / 2;
            obj.position.y = pos.y - vecs.min.y + offset / 2;
            obj.position.z = pos.z - vecs.min.z + offset / 2;
            obj.position.x = obj.position.x / lattice.a;
            obj.position.y = obj.position.y / lattice.b;
            obj.position.z = obj.position.z / lattice.c;
        //}
    //});
    }

    const basis = extractBasisFromScene(scene, lattice.vectorArrays);
    basis.toCrystal();
    return new Made.Material({
        //name: scene.getObjectByProperty("type", "Group").name,
        name: "New Molecule",
        lattice: lattice.toJSON(),
        basis: basis.toJSON(),
    });
}

/**
 * Converts given materials to scene data.
 * The first material is used as parent and it's unit cell is used in case multiple materials are passed.
 * Other materials are added as a group under the first material with their cell hidden by default.
 * Atoms are slightly shifted along X axis if multiple materials are passed.
 */
export function materialsToThreeDSceneData(materials, shift = [2, 0, 0]) {
    const wave = new Wave({
        structure: materials[0],
        cell: materials[0].Lattice.unitCell,
        DOMElement: document.createElement("div")
    });
    if (materials.length > 1) {
        wave.structureGroup.name = "New Material";
        materials.slice(1).forEach(material => {
            material.toCartesian();
            const structureGroup = new THREE.Group();
            structureGroup.name = material.name || material.formula;
            const atomsGroup = wave.createAtomsGroup(material.Basis);
            structureGroup.add(atomsGroup);
            const unitCellObject = wave.getUnitCellObject(material.Lattice.unitCell);
            unitCellObject.visible = false;
            structureGroup.add(unitCellObject);
            structureGroup.position.set(...shift); //slightly shift along x axis
            wave.structureGroup.add(structureGroup);
        });
        wave.render();
    }
    return wave.scene.toJSON();
}
