class Cache {

    constructor(preloadCallback) {
        this.cacheList = [];
        this.mtlEntries = 0;
        this.mtlEntriesDone = 0;
        this.objEntries = 0;
        this.objEntriesDone = 0;

        console.log("[CACHE] Loading MTLs...");

        this.preloadMtls(() => {
            console.log("[CACHE] Done loading all MTLs");
            console.log("[CACHE] Loading OBJs...");

            this.preloadObj(() => {
                console.log("[CACHE] Done loading all OBJs");
                console.log(preloadCallback);
                preloadCallback();
            });
        });

    }

    has(name) {
        for (var i = 0; i < this.cacheList.length; i++) {
            var entry = this.cacheList[i];

            if (entry.name == name) {
                return true;
            }
        }

        return false;
    }

    set(name, object) {
        this.cacheList.push({
            name: name,
            obj: object
        });
    }

    get(name) {
        for (var i = 0; i < this.cacheList.length; i++) {
            var entry = this.cacheList[i];
            if (entry.name == name) {
                return clone(entry.obj);
            }
        }
        return null;

        function clone(obj) {
            var copy;

            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }

            // Handle Object
            if (obj instanceof Object) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
                }
                return copy;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        }
    }

    preloadMtls(doneCb) {
        var self = this;
        this.cacheMtl("Models/Ammo/Bier/", "Bier.mtl", "bierMtl", () => { checkMtl(self); });
        this.cacheMtl("Models/Ammo/Appel/", "Apple.mtl", "appleMtl", () => { checkMtl(self); });
        this.cacheMtl("Models/Tank/", "shadowsword.mtl", "tankMtl", () => { checkMtl(self); });
        this.cacheMtl("Models/Ammo/Ei/", "Egg_01.mtl", "eiMtl", () => { checkMtl(self); });
        this.cacheMtl("Models/Level/", "level2.mtl", "levelMtl", () => { checkMtl(self); });

        function checkMtl(self) {
            console.log("[CACHE] MTL Progress " + Math.round((self.mtlEntriesDone / self.mtlEntries) * 100) + "%");
            if (self.mtlEntries == self.mtlEntriesDone) {
                doneCb();
            }
        }
    }

    preloadObj(doneCb) {
        var self = this;
        this.cacheObj("bierMtl", "Models/Ammo/Bier/", "Bier.obj", "bierObj", () => { checkObj(self); });
        this.cacheObj("appleMtl", "Models/Ammo/Appel/", "Apple.obj", "appleObj", () => { checkObj(self); });
        this.cacheObj("tankMtl", "Models/Tank/", "shadowsword.obj", "tankObj", () => { checkObj(self); });
        this.cacheObj("eiMtl", "Models/Ammo/Ei/", "Egg_01.obj", "eiObj", () => { checkObj(self); });
        this.cacheObj("levelMtl", "Models/Level/", "level2.obj", "levelObj", () => { checkObj(self); });

        function checkObj(self) {
            console.log("[CACHE] OBJ Progress " + Math.round((self.objEntriesDone / self.objEntries) * 100) + "%");
            if (self.objEntries == self.objEntriesDone) {
                doneCb();
            }
        }
    }

    cacheMtl(path, name, cacheName, cb) {

        var self = this;
        this.mtlEntries++;

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath(path);
        mtlLoader.load(name, function (mtl) {
            mtl.preload();
            self.mtlEntriesDone++;
            self.set(cacheName, mtl);
            cb();
        });
    }

    cacheObj(material, path, name, cacheName, cb) {
        this.objEntries++;

        var self = this;
        var mat = this.get(material);

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(mat);
        objLoader.setPath(path);
        objLoader.load(name, function (object) {
            self.objEntriesDone++;
            self.set(cacheName, object);
            cb();
        });
    }
}