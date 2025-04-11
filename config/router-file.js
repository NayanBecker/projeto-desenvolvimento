const filename = {
    'blog/api/v1/rest': [
        'post-resource',
        'reply-resource',
    ],
    'blog/api/v1/': [
    ],
};

function toFileList(imports, folder) {
    return { ...imports, ...filename[folder].map(toRelatiePaths(folder)) };
}
function toRelatiePaths(folder) {
    return (filename) => {
        return `../src/module/${folder}/${filename}`;
    };
}
module.exports = Object.keys(filename).reduce(toFileList, []);