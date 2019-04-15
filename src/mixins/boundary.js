import * as THREE from "three";
import {Made} from "@exabyte-io/made.js";

import {BOUNDARY_CONDITIONS} from "../enums";

export const BoundaryMixin = (superclass) => class extends superclass {

    /**
     * boundaryConditions.type {String}: type of the boundary.
     * boundaryConditions.offset {Number} boundary offset (esm_w).
     */
    constructor(config) {
        super(config);
        this.boundaryConditions = config.boundaryConditions || {};
    }

    /**
     * Boundaries are drawn only if type is "bc1", "bc2", or "bc3".
     *  bc1 : Immerse the slab between two semi-infinite vacuum regions;
     *  bc2 : Immerse the slab between two semi-infinite metallic electrodes, with optional fixed field applied between them.
     *  bc3 : Immerse the slab between one semi-infinite vacuum region (left) and one semi-infinite metallic electrode (right).
     */
    get areNonPeriodicBoundariesPresent() {
        return BOUNDARY_CONDITIONS.filter(e => e.enabled).map(e => e.type).includes(this.boundaryConditions.type);
    }

    /**
     * Returns a plane-like mesh object with given corner vertices in counterclockwise order.
     */
    getBoundaryMeshObject(color, coordinates1, coordinates2, coordinates3, coordinates4, zOffset = 0) {

        const point1 = new THREE.Vector3(...coordinates1).add(new THREE.Vector3(0, 0, zOffset));
        const point2 = new THREE.Vector3(...coordinates2).add(new THREE.Vector3(0, 0, zOffset));
        const point3 = new THREE.Vector3(...coordinates3).add(new THREE.Vector3(0, 0, zOffset));
        const point4 = new THREE.Vector3(...coordinates4).add(new THREE.Vector3(0, 0, zOffset));

        const geometry = new THREE.Geometry();
        geometry.vertices.push(point1, point2, point3, point4);
        const face1 = new THREE.Face3(0, 1, 2);
        const face2 = new THREE.Face3(2, 3, 0);
        geometry.faces.push(face1, face2);
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        var material = new THREE.MeshBasicMaterial({
            color: color,
            opacity: 0.5,
            transparent: true,
            side: THREE.DoubleSide
        });

        return new THREE.Mesh(geometry, material);

    }

    get boundaryMeshObjectZOffset() {return this.boundaryConditions.offset + this.latticeCConstant / 2}

    /**
     * Draw boundaries with +/- [L_z/2 + this.boundaryConditions.offset] z coordinates.
     */
    drawBoundaries() {
        if (this.areNonPeriodicBoundariesPresent) {
            const vertices = this.getCellVertices(this.cell);
            const colors = this.settings.boundaryConditionTypeColors[this.boundaryConditions.type];
            const boundaryMeshObjectVertices = [vertices[0], vertices[1], vertices[3], vertices[2]];
            const plane1 = this.getBoundaryMeshObject(colors[0], ...boundaryMeshObjectVertices, this.boundaryMeshObjectZOffset);
            const plane2 = this.getBoundaryMeshObject(colors[1], ...boundaryMeshObjectVertices, -this.boundaryMeshObjectZOffset);
            this.repeatObject3DAtRepetitionCoordinates(plane1);
            this.repeatObject3DAtRepetitionCoordinates(plane2);
        }
    }

    /**
     * Returns a basis with elements inside boundary conditions.
     */
    get basisWithElementsInsideNonPeriodicBoundaries() {
        const newBasis = new Made.Basis({
            ...this._basis.toJSON(),
            elements: [],
            coordinates: [],
        });
        const basisCloneInCrystalCoordinates = this._basis.clone();

        newBasis.toCrystal();
        basisCloneInCrystalCoordinates.toCrystal();

        const threshold = this.boundaryMeshObjectZOffset / this.latticeCConstant;

        basisCloneInCrystalCoordinates.elements.forEach((element, index) => {
            const coord = basisCloneInCrystalCoordinates.getCoordinateByIndex(index);
            newBasis.addAtom({
                element: element,
                coordinate: [
                    coord[0],
                    coord[1],
                    Made.math.abs(coord[2]) <= threshold ? coord[2] : coord[2] - 1
                ]
            });
        });

        if (this._basis.isInCartesianUnits) newBasis.toCartesian();
        return newBasis;

    }

};
