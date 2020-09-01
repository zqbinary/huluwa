const rt = (code = 200, msg = '', data = {}) => {
    return {
        code,
        msg,
        data
    }
}

function promisefy(original) {
    if (typeof original !== 'function') { // {1} 校验
        throw new Error('The "original" argument must be of type Function. Received type undefined')
    }

    function fn(...args) { // {2}
        return new Promise((resolve, reject) => {
            try {
                // original 例如，fs.readFile.call(this, 'filename', 'utf8', (err, result) => ...)
                args.splice(-1, 1)
                original.call(this, ...args, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    return fn; // {3}
}

function dd(...arr) {
    console.log(...arr)
}

function dot_get(obj, find) {
    const value = find.split('.').reduce((a, b) => a[b], obj);
    return value || ''
}

export {rt, promisefy, dd, dot_get};
