import {Command, flags} from '@oclif/command'

import {generateJsonSchema, outputDir} from '../index'

const glob = require('glob')

class TsJsonSchemaGen extends Command {

    static description = 'Generate type script bindings from json schema';

    static flags = {
        version: flags.version({char: 'v'}),
        help: flags.help({char: 'h'}),
        outputDir: flags.string({char: 'o', description: 'Output directory for definitions'})
    }

    static args = [
        {
            name: 'glob',
            description: 'glob pattern',
            default: '**/*.schema.json',
        }
    ];

    async run() {
        const {args, flags} = this.parse(TsJsonSchemaGen)

        const pattern = args.glob
        const out = flags.outputDir || outputDir;

        const files = glob.sync(pattern)

        files.forEach((file: any) => this.log(`generate declarations : ${file}`))

        return files.map((file: any) => generateJsonSchema(file, out))


    }
}

export = TsJsonSchemaGen