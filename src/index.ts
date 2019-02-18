const fs = require("fs")
const path = require("path")
const mkdirp = require('mkdirp');

const schemaCompiler = require('json-schema-to-typescript');
const jsonmodels = require('jsonmodels');

export const outputDir = 'generated';

export function generateJsonSchema(file:string, outputDir:string){
    const base = path.dirname(file)
    const dir = `${outputDir}/${base}`
    const name = path.basename(file, path.extname(file))

    const content = fs.readFileSync(file)
    const schema = JSON.parse(content);

    return schemaCompiler.compile(schema, name).then((ts: string) => {
        return mkdirp(dir, () => {
            return fs.writeFileSync(`${outputDir}/${file}.d.ts`, ts)
        })
    })
}

export function generateJsonModel(file:string, outputDir:string){
    const base = path.dirname(file);
    const dir = `${outputDir}/${base}`;
    const name = path.basename(file, path.extname(file))

    const content = fs.readFileSync(file)
    const model = JSON.parse(content);
    const schema = jsonmodels(model);


    return schemaCompiler.compile(schema, name).then((ts: string) => {
        console.log(ts)
        return mkdirp(dir, () => {
            return fs.writeFileSync(`${outputDir}/${file}.d.ts`, ts)
        })
    })
}