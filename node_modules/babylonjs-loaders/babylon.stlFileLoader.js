(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-loaders", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-loaders"] = factory(require("babylonjs"));
	else
		root["LOADERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_tools__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/loaders/src/STL/index.ts":
/*!*********************************************!*\
  !*** ../../../dev/loaders/src/STL/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoader: () => (/* reexport safe */ _stlFileLoader__WEBPACK_IMPORTED_MODULE_0__.STLFileLoader)
/* harmony export */ });
/* harmony import */ var _stlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stlFileLoader */ "../../../dev/loaders/src/STL/stlFileLoader.ts");



/***/ }),

/***/ "../../../dev/loaders/src/STL/stlFileLoader.metadata.ts":
/*!**************************************************************!*\
  !*** ../../../dev/loaders/src/STL/stlFileLoader.metadata.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoaderMetadata: () => (/* binding */ STLFileLoaderMetadata)
/* harmony export */ });
var STLFileLoaderMetadata = {
    name: "stl",
    extensions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ".stl": { isBinary: true },
    },
};


/***/ }),

/***/ "../../../dev/loaders/src/STL/stlFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/STL/stlFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoader: () => (/* binding */ STLFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stlFileLoader_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stlFileLoader.metadata */ "../../../dev/loaders/src/STL/stlFileLoader.metadata.ts");







/**
 * STL file type loader.
 * This is a babylon scene loader plugin.
 */
var STLFileLoader = /** @class */ (function () {
    function STLFileLoader() {
        /** @internal */
        this.solidPattern = /solid (\S*)([\S\s]*?)endsolid[ ]*(\S*)/g;
        /** @internal */
        this.facetsPattern = /facet([\s\S]*?)endfacet/g;
        /** @internal */
        this.normalPattern = /normal[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g;
        /** @internal */
        this.vertexPattern = /vertex[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g;
        /**
         * Defines the name of the plugin.
         */
        this.name = _stlFileLoader_metadata__WEBPACK_IMPORTED_MODULE_1__.STLFileLoaderMetadata.name;
        /**
         * Defines the extensions the stl loader is able to load.
         * force data to come in as an ArrayBuffer
         * we'll convert to string if it looks like it's an ASCII .stl
         */
        this.extensions = _stlFileLoader_metadata__WEBPACK_IMPORTED_MODULE_1__.STLFileLoaderMetadata.extensions;
    }
    /**
     * Import meshes into a scene.
     * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
     * @param scene The scene to import into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param meshes The meshes array to import into
     * @returns True if successful or false otherwise
     */
    STLFileLoader.prototype.importMesh = function (meshesNames, scene, data, rootUrl, meshes) {
        var matches;
        if (typeof data !== "string") {
            if (this._isBinary(data)) {
                // binary .stl
                var babylonMesh = new babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Mesh("stlmesh", scene);
                this._parseBinary(babylonMesh, data);
                if (meshes) {
                    meshes.push(babylonMesh);
                }
                return true;
            }
            // ASCII .stl
            // convert to string
            data = new TextDecoder().decode(new Uint8Array(data));
        }
        //if arrived here, data is a string, containing the STLA data.
        while ((matches = this.solidPattern.exec(data))) {
            var meshName = matches[1];
            var meshNameFromEnd = matches[3];
            if (meshNameFromEnd && meshName != meshNameFromEnd) {
                babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Error in STL, solid name != endsolid name");
                return false;
            }
            // check meshesNames
            if (meshesNames && meshName) {
                if (meshesNames instanceof Array) {
                    if (!meshesNames.indexOf(meshName)) {
                        continue;
                    }
                }
                else {
                    if (meshName !== meshesNames) {
                        continue;
                    }
                }
            }
            // stl mesh name can be empty as well
            meshName = meshName || "stlmesh";
            var babylonMesh = new babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Mesh(meshName, scene);
            this._parseASCII(babylonMesh, matches[2]);
            if (meshes) {
                meshes.push(babylonMesh);
            }
        }
        return true;
    };
    /**
     * Load into a scene.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns true if successful or false otherwise
     */
    STLFileLoader.prototype.load = function (scene, data, rootUrl) {
        var result = this.importMesh(null, scene, data, rootUrl, null);
        return result;
    };
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    STLFileLoader.prototype.loadAssetContainer = function (scene, data, rootUrl) {
        var container = new babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
        scene._blockEntityCollection = true;
        this.importMesh(null, scene, data, rootUrl, container.meshes);
        scene._blockEntityCollection = false;
        return container;
    };
    STLFileLoader.prototype._isBinary = function (data) {
        // check if file size is correct for binary stl
        var reader = new DataView(data);
        // A Binary STL header is 80 bytes, if the data size is not great than
        // that then it's not a binary STL.
        if (reader.byteLength <= 80) {
            return false;
        }
        var faceSize = (32 / 8) * 3 + (32 / 8) * 3 * 3 + 16 / 8;
        var nFaces = reader.getUint32(80, true);
        if (80 + 32 / 8 + nFaces * faceSize === reader.byteLength) {
            return true;
        }
        // US-ASCII begin with 's', 'o', 'l', 'i', 'd'
        var ascii = [115, 111, 108, 105, 100];
        for (var off = 0; off < 5; off++) {
            if (reader.getUint8(off) !== ascii[off]) {
                return true;
            }
        }
        return false;
    };
    STLFileLoader.prototype._parseBinary = function (mesh, data) {
        var reader = new DataView(data);
        var faces = reader.getUint32(80, true);
        var dataOffset = 84;
        var faceLength = 12 * 4 + 2;
        var offset = 0;
        var positions = new Float32Array(faces * 3 * 3);
        var normals = new Float32Array(faces * 3 * 3);
        var indices = new Uint32Array(faces * 3);
        var indicesCount = 0;
        for (var face = 0; face < faces; face++) {
            var start = dataOffset + face * faceLength;
            var normalX = reader.getFloat32(start, true);
            var normalY = reader.getFloat32(start + 4, true);
            var normalZ = reader.getFloat32(start + 8, true);
            for (var i = 1; i <= 3; i++) {
                var vertexstart = start + i * 12;
                // ordering is intentional to match ascii import
                positions[offset] = reader.getFloat32(vertexstart, true);
                normals[offset] = normalX;
                if (!STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                    positions[offset + 2] = reader.getFloat32(vertexstart + 4, true);
                    positions[offset + 1] = reader.getFloat32(vertexstart + 8, true);
                    normals[offset + 2] = normalY;
                    normals[offset + 1] = normalZ;
                }
                else {
                    positions[offset + 1] = reader.getFloat32(vertexstart + 4, true);
                    positions[offset + 2] = reader.getFloat32(vertexstart + 8, true);
                    normals[offset + 1] = normalY;
                    normals[offset + 2] = normalZ;
                }
                offset += 3;
            }
            if (STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                indices[indicesCount] = indicesCount;
                indices[indicesCount + 1] = indicesCount + 2;
                indices[indicesCount + 2] = indicesCount + 1;
                indicesCount += 3;
            }
            else {
                indices[indicesCount] = indicesCount++;
                indices[indicesCount] = indicesCount++;
                indices[indicesCount] = indicesCount++;
            }
        }
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, positions);
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
        mesh.setIndices(indices);
        mesh.computeWorldMatrix(true);
    };
    STLFileLoader.prototype._parseASCII = function (mesh, solidData) {
        var positions = [];
        var normals = [];
        var indices = [];
        var indicesCount = 0;
        //load facets, ignoring loop as the standard doesn't define it can contain more than vertices
        var matches;
        while ((matches = this.facetsPattern.exec(solidData))) {
            var facet = matches[1];
            //one normal per face
            var normalMatches = this.normalPattern.exec(facet);
            this.normalPattern.lastIndex = 0;
            if (!normalMatches) {
                continue;
            }
            var normal = [Number(normalMatches[1]), Number(normalMatches[5]), Number(normalMatches[3])];
            var vertexMatch = void 0;
            while ((vertexMatch = this.vertexPattern.exec(facet))) {
                if (!STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                    positions.push(Number(vertexMatch[1]), Number(vertexMatch[5]), Number(vertexMatch[3]));
                    normals.push(normal[0], normal[1], normal[2]);
                }
                else {
                    positions.push(Number(vertexMatch[1]), Number(vertexMatch[3]), Number(vertexMatch[5]));
                    // Flipping the second and third component because inverted
                    // when normal was declared.
                    normals.push(normal[0], normal[2], normal[1]);
                }
            }
            if (STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                indices.push(indicesCount, indicesCount + 2, indicesCount + 1);
                indicesCount += 3;
            }
            else {
                indices.push(indicesCount++, indicesCount++, indicesCount++);
            }
            this.vertexPattern.lastIndex = 0;
        }
        this.facetsPattern.lastIndex = 0;
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, positions);
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
        mesh.setIndices(indices);
        mesh.computeWorldMatrix(true);
    };
    /**
     * Defines if Y and Z axes are swapped or not when loading an STL file.
     * The default is false to maintain backward compatibility. When set to
     * true, coordinates from the STL file are used without change.
     */
    STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES = false;
    return STLFileLoader;
}());
(0,babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.registerSceneLoaderPlugin)(new STLFileLoader());


/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-stlFileLoader.ts":
/*!***************************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-stlFileLoader.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoader: () => (/* reexport safe */ loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__.STLFileLoader)
/* harmony export */ });
/* harmony import */ var loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/STL/index */ "../../../dev/loaders/src/STL/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__) {
        if (!globalObject.BABYLON[key]) {
            globalObject.BABYLON[key] = loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__[key];
        }
    }
}



/***/ }),

/***/ "babylonjs/Misc/tools":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_tools__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/stlFileLoader.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loaders: () => (/* reexport module object */ _lts_loaders_legacy_legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_loaders_legacy_legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/loaders/legacy/legacy-stlFileLoader */ "../../../lts/loaders/src/legacy/legacy-stlFileLoader.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_loaders_legacy_legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5zdGxGaWxlTG9hZGVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7Ozs7Ozs7Ozs7QUNHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFZQTs7O0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUE2T0E7QUFwT0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFPQTs7OztBQUlBO0FBQ0E7QUFzT0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL1JBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FDaEJBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9TVEwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvU1RML3N0bEZpbGVMb2FkZXIubWV0YWRhdGEudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvU1RML3N0bEZpbGVMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9sdHMvbG9hZGVycy9zcmMvbGVnYWN5L2xlZ2FjeS1zdGxGaWxlTG9hZGVyLnRzIiwid2VicGFjazovL0xPQURFUlMvZXh0ZXJuYWwgdW1kIHtcInJvb3RcIjpcIkJBQllMT05cIixcImNvbW1vbmpzXCI6XCJiYWJ5bG9uanNcIixcImNvbW1vbmpzMlwiOlwiYmFieWxvbmpzXCIsXCJhbWRcIjpcImJhYnlsb25qc1wifSIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uL3NyYy9zdGxGaWxlTG9hZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1sb2FkZXJzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtbG9hZGVyc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiTE9BREVSU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfdG9vbHNfXykgPT4ge1xucmV0dXJuICIsImV4cG9ydCAqIGZyb20gXCIuL3N0bEZpbGVMb2FkZXJcIjtcclxuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzXHJcbmltcG9ydCB0eXBlIHsgSVNjZW5lTG9hZGVyUGx1Z2luRXh0ZW5zaW9ucywgSVNjZW5lTG9hZGVyUGx1Z2luTWV0YWRhdGEgfSBmcm9tIFwiY29yZS9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNUTEZpbGVMb2FkZXJNZXRhZGF0YSA9IHtcclxuICAgIG5hbWU6IFwic3RsXCIsXHJcblxyXG4gICAgZXh0ZW5zaW9uczoge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuICAgICAgICBcIi5zdGxcIjogeyBpc0JpbmFyeTogdHJ1ZSB9LFxyXG4gICAgfSBhcyBjb25zdCBzYXRpc2ZpZXMgSVNjZW5lTG9hZGVyUGx1Z2luRXh0ZW5zaW9ucyxcclxufSBhcyBjb25zdCBzYXRpc2ZpZXMgSVNjZW5lTG9hZGVyUGx1Z2luTWV0YWRhdGE7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB7IFZlcnRleEJ1ZmZlciB9IGZyb20gXCJjb3JlL0J1ZmZlcnMvYnVmZmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuaW1wb3J0IHR5cGUgeyBJU2NlbmVMb2FkZXJQbHVnaW4gfSBmcm9tIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCI7XHJcbmltcG9ydCB7IHJlZ2lzdGVyU2NlbmVMb2FkZXJQbHVnaW4gfSBmcm9tIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCI7XHJcbmltcG9ydCB7IEFzc2V0Q29udGFpbmVyIH0gZnJvbSBcImNvcmUvYXNzZXRDb250YWluZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IFNUTEZpbGVMb2FkZXJNZXRhZGF0YSB9IGZyb20gXCIuL3N0bEZpbGVMb2FkZXIubWV0YWRhdGFcIjtcclxuaW1wb3J0IFwiY29yZS9NYXRlcmlhbHMvc3RhbmRhcmRNYXRlcmlhbFwiO1xyXG5cclxuZGVjbGFyZSBtb2R1bGUgXCJjb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXJcIiB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganNkb2MvcmVxdWlyZS1qc2RvY1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBTY2VuZUxvYWRlclBsdWdpbk9wdGlvbnMge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluZXMgb3B0aW9ucyBmb3IgdGhlIHN0bCBsb2FkZXIuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgW1NUTEZpbGVMb2FkZXJNZXRhZGF0YS5uYW1lXToge307XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTVEwgZmlsZSB0eXBlIGxvYWRlci5cclxuICogVGhpcyBpcyBhIGJhYnlsb24gc2NlbmUgbG9hZGVyIHBsdWdpbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTVExGaWxlTG9hZGVyIGltcGxlbWVudHMgSVNjZW5lTG9hZGVyUGx1Z2luIHtcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBzb2xpZFBhdHRlcm4gPSAvc29saWQgKFxcUyopKFtcXFNcXHNdKj8pZW5kc29saWRbIF0qKFxcUyopL2c7XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGZhY2V0c1BhdHRlcm4gPSAvZmFjZXQoW1xcc1xcU10qPyllbmRmYWNldC9nO1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIG5vcm1hbFBhdHRlcm4gPSAvbm9ybWFsW1xcc10rKFstK10/WzAtOV0rXFwuP1swLTldKihbZUVdWy0rXT9bMC05XSspPykrW1xcc10rKFstK10/WzAtOV0qXFwuP1swLTldKyhbZUVdWy0rXT9bMC05XSspPykrW1xcc10rKFstK10/WzAtOV0qXFwuP1swLTldKyhbZUVdWy0rXT9bMC05XSspPykrL2c7XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgdmVydGV4UGF0dGVybiA9IC92ZXJ0ZXhbXFxzXSsoWy0rXT9bMC05XStcXC4/WzAtOV0qKFtlRV1bLStdP1swLTldKyk/KStbXFxzXSsoWy0rXT9bMC05XSpcXC4/WzAtOV0rKFtlRV1bLStdP1swLTldKyk/KStbXFxzXSsoWy0rXT9bMC05XSpcXC4/WzAtOV0rKFtlRV1bLStdP1swLTldKyk/KSsvZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIG5hbWUgb2YgdGhlIHBsdWdpbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBTVExGaWxlTG9hZGVyTWV0YWRhdGEubmFtZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGV4dGVuc2lvbnMgdGhlIHN0bCBsb2FkZXIgaXMgYWJsZSB0byBsb2FkLlxyXG4gICAgICogZm9yY2UgZGF0YSB0byBjb21lIGluIGFzIGFuIEFycmF5QnVmZmVyXHJcbiAgICAgKiB3ZSdsbCBjb252ZXJ0IHRvIHN0cmluZyBpZiBpdCBsb29rcyBsaWtlIGl0J3MgYW4gQVNDSUkgLnN0bFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZXh0ZW5zaW9ucyA9IFNUTEZpbGVMb2FkZXJNZXRhZGF0YS5leHRlbnNpb25zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiBZIGFuZCBaIGF4ZXMgYXJlIHN3YXBwZWQgb3Igbm90IHdoZW4gbG9hZGluZyBhbiBTVEwgZmlsZS5cclxuICAgICAqIFRoZSBkZWZhdWx0IGlzIGZhbHNlIHRvIG1haW50YWluIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkuIFdoZW4gc2V0IHRvXHJcbiAgICAgKiB0cnVlLCBjb29yZGluYXRlcyBmcm9tIHRoZSBTVEwgZmlsZSBhcmUgdXNlZCB3aXRob3V0IGNoYW5nZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBET19OT1RfQUxURVJfRklMRV9DT09SRElOQVRFUyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wb3J0IG1lc2hlcyBpbnRvIGEgc2NlbmUuXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzTmFtZXMgQW4gYXJyYXkgb2YgbWVzaCBuYW1lcywgYSBzaW5nbGUgbWVzaCBuYW1lLCBvciBlbXB0eSBzdHJpbmcgZm9yIGFsbCBtZXNoZXMgdGhhdCBmaWx0ZXIgd2hhdCBtZXNoZXMgYXJlIGltcG9ydGVkXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgVGhlIHNjZW5lIHRvIGltcG9ydCBpbnRvXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBpbXBvcnRcclxuICAgICAqIEBwYXJhbSByb290VXJsIFRoZSByb290IHVybCBmb3Igc2NlbmUgYW5kIHJlc291cmNlc1xyXG4gICAgICogQHBhcmFtIG1lc2hlcyBUaGUgbWVzaGVzIGFycmF5IHRvIGltcG9ydCBpbnRvXHJcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHN1Y2Nlc3NmdWwgb3IgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbXBvcnRNZXNoKG1lc2hlc05hbWVzOiBhbnksIHNjZW5lOiBTY2VuZSwgZGF0YTogYW55LCByb290VXJsOiBzdHJpbmcsIG1lc2hlczogTnVsbGFibGU8QWJzdHJhY3RNZXNoW10+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG1hdGNoZXM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNCaW5hcnkoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGJpbmFyeSAuc3RsXHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaCA9IG5ldyBNZXNoKFwic3RsbWVzaFwiLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJzZUJpbmFyeShiYWJ5bG9uTWVzaCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaGVzLnB1c2goYmFieWxvbk1lc2gpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFTQ0lJIC5zdGxcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gc3RyaW5nXHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoZGF0YSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pZiBhcnJpdmVkIGhlcmUsIGRhdGEgaXMgYSBzdHJpbmcsIGNvbnRhaW5pbmcgdGhlIFNUTEEgZGF0YS5cclxuXHJcbiAgICAgICAgd2hpbGUgKChtYXRjaGVzID0gdGhpcy5zb2xpZFBhdHRlcm4uZXhlYyhkYXRhKSkpIHtcclxuICAgICAgICAgICAgbGV0IG1lc2hOYW1lID0gbWF0Y2hlc1sxXTtcclxuICAgICAgICAgICAgY29uc3QgbWVzaE5hbWVGcm9tRW5kID0gbWF0Y2hlc1szXTtcclxuICAgICAgICAgICAgaWYgKG1lc2hOYW1lRnJvbUVuZCAmJiBtZXNoTmFtZSAhPSBtZXNoTmFtZUZyb21FbmQpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLkVycm9yKFwiRXJyb3IgaW4gU1RMLCBzb2xpZCBuYW1lICE9IGVuZHNvbGlkIG5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIG1lc2hlc05hbWVzXHJcbiAgICAgICAgICAgIGlmIChtZXNoZXNOYW1lcyAmJiBtZXNoTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc2hlc05hbWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1lc2hlc05hbWVzLmluZGV4T2YobWVzaE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc2hOYW1lICE9PSBtZXNoZXNOYW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHN0bCBtZXNoIG5hbWUgY2FuIGJlIGVtcHR5IGFzIHdlbGxcclxuICAgICAgICAgICAgbWVzaE5hbWUgPSBtZXNoTmFtZSB8fCBcInN0bG1lc2hcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJhYnlsb25NZXNoID0gbmV3IE1lc2gobWVzaE5hbWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgdGhpcy5fcGFyc2VBU0NJSShiYWJ5bG9uTWVzaCwgbWF0Y2hlc1syXSk7XHJcbiAgICAgICAgICAgIGlmIChtZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgIG1lc2hlcy5wdXNoKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGludG8gYSBzY2VuZS5cclxuICAgICAqIEBwYXJhbSBzY2VuZSBUaGUgc2NlbmUgdG8gbG9hZCBpbnRvXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBpbXBvcnRcclxuICAgICAqIEBwYXJhbSByb290VXJsIFRoZSByb290IHVybCBmb3Igc2NlbmUgYW5kIHJlc291cmNlc1xyXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBzdWNjZXNzZnVsIG9yIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZChzY2VuZTogU2NlbmUsIGRhdGE6IGFueSwgcm9vdFVybDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5pbXBvcnRNZXNoKG51bGwsIHNjZW5lLCBkYXRhLCByb290VXJsLCBudWxsKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBpbnRvIGFuIGFzc2V0IGNvbnRhaW5lci5cclxuICAgICAqIEBwYXJhbSBzY2VuZSBUaGUgc2NlbmUgdG8gbG9hZCBpbnRvXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBpbXBvcnRcclxuICAgICAqIEBwYXJhbSByb290VXJsIFRoZSByb290IHVybCBmb3Igc2NlbmUgYW5kIHJlc291cmNlc1xyXG4gICAgICogQHJldHVybnMgVGhlIGxvYWRlZCBhc3NldCBjb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRBc3NldENvbnRhaW5lcihzY2VuZTogU2NlbmUsIGRhdGE6IHN0cmluZywgcm9vdFVybDogc3RyaW5nKTogQXNzZXRDb250YWluZXIge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IG5ldyBBc3NldENvbnRhaW5lcihzY2VuZSk7XHJcbiAgICAgICAgc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pbXBvcnRNZXNoKG51bGwsIHNjZW5lLCBkYXRhLCByb290VXJsLCBjb250YWluZXIubWVzaGVzKTtcclxuICAgICAgICBzY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc0JpbmFyeShkYXRhOiBhbnkpIHtcclxuICAgICAgICAvLyBjaGVjayBpZiBmaWxlIHNpemUgaXMgY29ycmVjdCBmb3IgYmluYXJ5IHN0bFxyXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBEYXRhVmlldyhkYXRhKTtcclxuXHJcbiAgICAgICAgLy8gQSBCaW5hcnkgU1RMIGhlYWRlciBpcyA4MCBieXRlcywgaWYgdGhlIGRhdGEgc2l6ZSBpcyBub3QgZ3JlYXQgdGhhblxyXG4gICAgICAgIC8vIHRoYXQgdGhlbiBpdCdzIG5vdCBhIGJpbmFyeSBTVEwuXHJcbiAgICAgICAgaWYgKHJlYWRlci5ieXRlTGVuZ3RoIDw9IDgwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGZhY2VTaXplID0gKDMyIC8gOCkgKiAzICsgKDMyIC8gOCkgKiAzICogMyArIDE2IC8gODtcclxuICAgICAgICBjb25zdCBuRmFjZXMgPSByZWFkZXIuZ2V0VWludDMyKDgwLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKDgwICsgMzIgLyA4ICsgbkZhY2VzICogZmFjZVNpemUgPT09IHJlYWRlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVVMtQVNDSUkgYmVnaW4gd2l0aCAncycsICdvJywgJ2wnLCAnaScsICdkJ1xyXG4gICAgICAgIGNvbnN0IGFzY2lpID0gWzExNSwgMTExLCAxMDgsIDEwNSwgMTAwXTtcclxuICAgICAgICBmb3IgKGxldCBvZmYgPSAwOyBvZmYgPCA1OyBvZmYrKykge1xyXG4gICAgICAgICAgICBpZiAocmVhZGVyLmdldFVpbnQ4KG9mZikgIT09IGFzY2lpW29mZl0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcGFyc2VCaW5hcnkobWVzaDogTWVzaCwgZGF0YTogQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRGF0YVZpZXcoZGF0YSk7XHJcbiAgICAgICAgY29uc3QgZmFjZXMgPSByZWFkZXIuZ2V0VWludDMyKDgwLCB0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YU9mZnNldCA9IDg0O1xyXG4gICAgICAgIGNvbnN0IGZhY2VMZW5ndGggPSAxMiAqIDQgKyAyO1xyXG5cclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShmYWNlcyAqIDMgKiAzKTtcclxuICAgICAgICBjb25zdCBub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheShmYWNlcyAqIDMgKiAzKTtcclxuICAgICAgICBjb25zdCBpbmRpY2VzID0gbmV3IFVpbnQzMkFycmF5KGZhY2VzICogMyk7XHJcbiAgICAgICAgbGV0IGluZGljZXNDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGZhY2UgPSAwOyBmYWNlIDwgZmFjZXM7IGZhY2UrKykge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGRhdGFPZmZzZXQgKyBmYWNlICogZmFjZUxlbmd0aDtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsWCA9IHJlYWRlci5nZXRGbG9hdDMyKHN0YXJ0LCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsWSA9IHJlYWRlci5nZXRGbG9hdDMyKHN0YXJ0ICsgNCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbFogPSByZWFkZXIuZ2V0RmxvYXQzMihzdGFydCArIDgsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhzdGFydCA9IHN0YXJ0ICsgaSAqIDEyO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9yZGVyaW5nIGlzIGludGVudGlvbmFsIHRvIG1hdGNoIGFzY2lpIGltcG9ydFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zW29mZnNldF0gPSByZWFkZXIuZ2V0RmxvYXQzMih2ZXJ0ZXhzdGFydCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW29mZnNldF0gPSBub3JtYWxYO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghU1RMRmlsZUxvYWRlci5ET19OT1RfQUxURVJfRklMRV9DT09SRElOQVRFUykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tvZmZzZXQgKyAyXSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0ICsgNCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zW29mZnNldCArIDFdID0gcmVhZGVyLmdldEZsb2F0MzIodmVydGV4c3RhcnQgKyA4LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsc1tvZmZzZXQgKyAyXSA9IG5vcm1hbFk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsc1tvZmZzZXQgKyAxXSA9IG5vcm1hbFo7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tvZmZzZXQgKyAxXSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0ICsgNCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zW29mZnNldCArIDJdID0gcmVhZGVyLmdldEZsb2F0MzIodmVydGV4c3RhcnQgKyA4LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsc1tvZmZzZXQgKyAxXSA9IG5vcm1hbFk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsc1tvZmZzZXQgKyAyXSA9IG5vcm1hbFo7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChTVExGaWxlTG9hZGVyLkRPX05PVF9BTFRFUl9GSUxFX0NPT1JESU5BVEVTKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2luZGljZXNDb3VudF0gPSBpbmRpY2VzQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2luZGljZXNDb3VudCArIDFdID0gaW5kaWNlc0NvdW50ICsgMjtcclxuICAgICAgICAgICAgICAgIGluZGljZXNbaW5kaWNlc0NvdW50ICsgMl0gPSBpbmRpY2VzQ291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlc0NvdW50ICs9IDM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2luZGljZXNDb3VudF0gPSBpbmRpY2VzQ291bnQrKztcclxuICAgICAgICAgICAgICAgIGluZGljZXNbaW5kaWNlc0NvdW50XSA9IGluZGljZXNDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlc1tpbmRpY2VzQ291bnRdID0gaW5kaWNlc0NvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1lc2guc2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQsIHBvc2l0aW9ucyk7XHJcbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQsIG5vcm1hbHMpO1xyXG4gICAgICAgIG1lc2guc2V0SW5kaWNlcyhpbmRpY2VzKTtcclxuICAgICAgICBtZXNoLmNvbXB1dGVXb3JsZE1hdHJpeCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wYXJzZUFTQ0lJKG1lc2g6IE1lc2gsIHNvbGlkRGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICAgICAgY29uc3Qgbm9ybWFscyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgICAgICBsZXQgaW5kaWNlc0NvdW50ID0gMDtcclxuXHJcbiAgICAgICAgLy9sb2FkIGZhY2V0cywgaWdub3JpbmcgbG9vcCBhcyB0aGUgc3RhbmRhcmQgZG9lc24ndCBkZWZpbmUgaXQgY2FuIGNvbnRhaW4gbW9yZSB0aGFuIHZlcnRpY2VzXHJcbiAgICAgICAgbGV0IG1hdGNoZXM7XHJcbiAgICAgICAgd2hpbGUgKChtYXRjaGVzID0gdGhpcy5mYWNldHNQYXR0ZXJuLmV4ZWMoc29saWREYXRhKSkpIHtcclxuICAgICAgICAgICAgY29uc3QgZmFjZXQgPSBtYXRjaGVzWzFdO1xyXG4gICAgICAgICAgICAvL29uZSBub3JtYWwgcGVyIGZhY2VcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsTWF0Y2hlcyA9IHRoaXMubm9ybWFsUGF0dGVybi5leGVjKGZhY2V0KTtcclxuICAgICAgICAgICAgdGhpcy5ub3JtYWxQYXR0ZXJuLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGlmICghbm9ybWFsTWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsID0gW051bWJlcihub3JtYWxNYXRjaGVzWzFdKSwgTnVtYmVyKG5vcm1hbE1hdGNoZXNbNV0pLCBOdW1iZXIobm9ybWFsTWF0Y2hlc1szXSldO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZlcnRleE1hdGNoO1xyXG4gICAgICAgICAgICB3aGlsZSAoKHZlcnRleE1hdGNoID0gdGhpcy52ZXJ0ZXhQYXR0ZXJuLmV4ZWMoZmFjZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFTVExGaWxlTG9hZGVyLkRPX05PVF9BTFRFUl9GSUxFX0NPT1JESU5BVEVTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnB1c2goTnVtYmVyKHZlcnRleE1hdGNoWzFdKSwgTnVtYmVyKHZlcnRleE1hdGNoWzVdKSwgTnVtYmVyKHZlcnRleE1hdGNoWzNdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFscy5wdXNoKG5vcm1hbFswXSwgbm9ybWFsWzFdLCBub3JtYWxbMl0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnMucHVzaChOdW1iZXIodmVydGV4TWF0Y2hbMV0pLCBOdW1iZXIodmVydGV4TWF0Y2hbM10pLCBOdW1iZXIodmVydGV4TWF0Y2hbNV0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmxpcHBpbmcgdGhlIHNlY29uZCBhbmQgdGhpcmQgY29tcG9uZW50IGJlY2F1c2UgaW52ZXJ0ZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIG5vcm1hbCB3YXMgZGVjbGFyZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFscy5wdXNoKG5vcm1hbFswXSwgbm9ybWFsWzJdLCBub3JtYWxbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChTVExGaWxlTG9hZGVyLkRPX05PVF9BTFRFUl9GSUxFX0NPT1JESU5BVEVTKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzLnB1c2goaW5kaWNlc0NvdW50LCBpbmRpY2VzQ291bnQgKyAyLCBpbmRpY2VzQ291bnQgKyAxKTtcclxuICAgICAgICAgICAgICAgIGluZGljZXNDb3VudCArPSAzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlcy5wdXNoKGluZGljZXNDb3VudCsrLCBpbmRpY2VzQ291bnQrKywgaW5kaWNlc0NvdW50KyspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmVydGV4UGF0dGVybi5sYXN0SW5kZXggPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5mYWNldHNQYXR0ZXJuLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCwgcG9zaXRpb25zKTtcclxuICAgICAgICBtZXNoLnNldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCwgbm9ybWFscyk7XHJcbiAgICAgICAgbWVzaC5zZXRJbmRpY2VzKGluZGljZXMpO1xyXG4gICAgICAgIG1lc2guY29tcHV0ZVdvcmxkTWF0cml4KHRydWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5yZWdpc3RlclNjZW5lTG9hZGVyUGx1Z2luKG5ldyBTVExGaWxlTG9hZGVyKCkpO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgKiBhcyBMb2FkZXJzIGZyb20gXCJsb2FkZXJzL1NUTC9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gTG9hZGVycykge1xyXG4gICAgICAgIGlmICghKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0pIHtcclxuICAgICAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5Mb2FkZXJzKVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcImxvYWRlcnMvU1RML2luZGV4XCI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY190b29sc19fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGxvYWRlcnMgZnJvbSBcIkBsdHMvbG9hZGVycy9sZWdhY3kvbGVnYWN5LXN0bEZpbGVMb2FkZXJcIjtcclxuZXhwb3J0IHsgbG9hZGVycyB9O1xyXG5leHBvcnQgZGVmYXVsdCBsb2FkZXJzO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=