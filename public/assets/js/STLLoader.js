/**
 * Three.js STLLoader
 * Suporte a malhas STL Binárias e ASCII para renderização WebGL interativa
 */
(function () {
  THREE.STLLoader = function (manager) {
    this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
  };

  THREE.STLLoader.prototype = {
    constructor: THREE.STLLoader,

    load: function (url, onLoad, onProgress, onError) {
      var scope = this;
      var loader = new THREE.FileLoader(scope.manager);
      loader.setPath(scope.path);
      loader.setResponseType('arraybuffer');
      loader.setRequestHeader(scope.requestHeader);
      loader.setWithCredentials(scope.withCredentials);
      loader.load(url, function (text) {
        try {
          onLoad(scope.parse(text));
        } catch (exception) {
          if (onError) {
            onError(exception);
          } else {
            console.error(exception);
          }
          scope.manager.itemError(url);
        }
      }, onProgress, onError);
    },

    setPath: function (value) {
      this.path = value;
      return this;
    },

    setRequestHeader: function (value) {
      this.requestHeader = value;
      return this;
    },

    setWithCredentials: function (value) {
      this.withCredentials = value;
      return this;
    },

    parse: function (data) {
      function isBinary(data) {
        var expect, face_size, n_faces, reader;
        reader = new DataView(data);
        face_size = (32 / 8 * 3) + ((32 / 8 * 3) * 3) + (16 / 8);
        n_faces = reader.getUint32(80, true);
        expect = 80 + (32 / 8) + (n_faces * face_size);

        if (expect === data.byteLength) {
          return true;
        }

        // Confere caracteres não-ASCII
        var fileLength = reader.byteLength;
        for (var index = 0; index < fileLength; index++) {
          if (reader.getUint8(index) > 127) {
            return true;
          }
        }
        return false;
      }

      function parseBinary(data) {
        var reader = new DataView(data);
        var faces = reader.getUint32(80, true);

        var r, g, b, hasColors = false, colors;
        var defaultR, defaultG, defaultB, alpha;

        for (var index = 0; index < 80 - 10; index++) {
          if (reader.getInt32(index, false) == 0x434F4C4F &&
            reader.getUint8(index + 4) == 0x52 &&
            reader.getUint8(index + 5) == 0x3D) {

            hasColors = true;
            colors = new Float32Array(faces * 3 * 3);

            defaultR = reader.getUint8(index + 6) / 255;
            defaultG = reader.getUint8(index + 7) / 255;
            defaultB = reader.getUint8(index + 8) / 255;
            alpha = reader.getUint8(index + 9) / 255;
          }
        }

        var dataOffset = 84;
        var faceLength = 12 * 4 + 2;

        var geometry = new THREE.BufferGeometry();

        var vertices = new Float32Array(faces * 3 * 3);
        var normals = new Float32Array(faces * 3 * 3);

        for (var face = 0; face < faces; face++) {
          var start = dataOffset + face * faceLength;
          var normalX = reader.getFloat32(start, true);
          var normalY = reader.getFloat32(start + 4, true);
          var normalZ = reader.getFloat32(start + 8, true);

          if (hasColors) {
            var packedColor = reader.getUint16(start + 48, true);
            if ((packedColor & 0x8000) === 0) {
              r = (packedColor & 0x1F) / 31;
              g = ((packedColor >> 5) & 0x1F) / 31;
              b = ((packedColor >> 10) & 0x1F) / 31;
            } else {
              r = defaultR;
              g = defaultG;
              b = defaultB;
            }
          }

          for (var i = 1; i <= 3; i++) {
            var vertexstart = start + i * 12;
            var componentIdx = (face * 3 * 3) + ((i - 1) * 3);

            vertices[componentIdx] = reader.getFloat32(vertexstart, true);
            vertices[componentIdx + 1] = reader.getFloat32(vertexstart + 4, true);
            vertices[componentIdx + 2] = reader.getFloat32(vertexstart + 8, true);

            normals[componentIdx] = normalX;
            normals[componentIdx + 1] = normalY;
            normals[componentIdx + 2] = normalZ;

            if (hasColors) {
              colors[componentIdx] = r;
              colors[componentIdx + 1] = g;
              colors[componentIdx + 2] = b;
            }
          }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

        if (hasColors) {
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          geometry.hasColors = true;
        }

        return geometry;
      }

      function parseASCII(data) {
        var geometry = new THREE.BufferGeometry();
        var patternSolid = /solid([\s\S]*?)endsolid/g;
        var patternFace = /facet([\s\S]*?)endfacet/g;
        var faceCounter = 0;

        var patternFloat = /[\s]+([+-]?(?:\d+.\d+|\d+.|\d+|.\d+)(?:[eE][+-]?\d+)?)/.source;
        var patternVertex = new RegExp('vertex' + patternFloat + patternFloat + patternFloat, 'g');
        var patternNormal = new RegExp('normal' + patternFloat + patternFloat + patternFloat, 'g');

        var vertices = [];
        var normals = [];

        var normal = new THREE.Vector3();
        var result;

        while ((result = patternFace.exec(data)) !== null) {
          var vertexCountPerFace = 0;
          var normalCountPerFace = 0;
          var text = result[0];

          while ((result = patternNormal.exec(text)) !== null) {
            normal.x = parseFloat(result[1]);
            normal.y = parseFloat(result[2]);
            normal.z = parseFloat(result[3]);
            normalCountPerFace++;
          }

          while ((result = patternVertex.exec(text)) !== null) {
            vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
            normals.push(normal.x, normal.y, normal.z);
            vertexCountPerFace++;
          }

          if (normalCountPerFace !== 1) {
            console.error('STLLoader: Erro no normal da face: ' + text);
          }

          if (vertexCountPerFace !== 3) {
            console.error('STLLoader: Erro nos vértices da face: ' + text);
          }

          faceCounter++;
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

        return geometry;
      }

      function ensureString(buffer) {
        if (typeof buffer !== 'string') {
          return new TextDecoder().decode(new Uint8Array(buffer));
        }
        return buffer;
      }

      var bin = isBinary(data);
      return bin ? parseBinary(data) : parseASCII(ensureString(data));
    }
  };
})();
