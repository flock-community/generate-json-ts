import {Command, flags} from '@oclif/command'

import {generateJsonModel, outputDir} from '../index'

const glob = require('glob')

class TsJsonModelGen extends Command {

    static description = 'Generate type script bindings from json model';

    static flags = {
        version: flags.version({char: 'v'}),
        help: flags.help({char: 'h'}),
        outputDir: flags.string({char: 'o', description: 'Output directory for definitions'})
    }

    static args = [
        {
            name: 'glob',
            description: 'glob pattern',
            default: '**/*.model.json',
        }
    ];

    async run() {
        const {args, flags} = this.parse(TsJsonModelGen)

        const pattern = args.glob;
        const out = flags.outputDir || outputDir;

        const files = glob.sync(pattern)

        files.forEach((file: any) => this.log(`generate declarations : ${file}`))

        return files.map((file: any) => generateJsonModel(file, out))

    }
}

export = TsJsonModelGen