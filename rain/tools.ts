function mapToObject(e: any) {
    let eo: any = {};
    if (e instanceof Map) {
        for (const [k, v] of e) {
            eo[k] = mapToObject(v);
        }
    } else if (e instanceof Array) {
        eo = [];
        for (const el of e) {
            eo.push(mapToObject(el));
        }
    } else if (e instanceof Object) {
        for (const k in e) {
            eo[k] = mapToObject(e[k]);
        }
    } else {
        return e;
    }
    return eo;
}

export default mapToObject;