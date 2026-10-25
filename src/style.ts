import { Fluent } from "@amateras/fluent";

export const style = new Fluent<string | [string, string]>()
.prop('fg', {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',

    // Bright Variants
    brightRed: '\x1b[91m',
    brightGreen: '\x1b[92m',
    brightYellow: '\x1b[93m',
    brightBlue: '\x1b[94m',
    brightMagenta: '\x1b[95m',
    brightCyan: '\x1b[96m',
    brightWhite: '\x1b[97m',
    fg256: (id: number) => `\x1b[38;5;${id}m`,
    fgRgb: (r: number, g: number, b: number) => `\x1b[38;2;${r};${g};${b}m`,
})
.prop('bg', {
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
    bgGray: '\x1b[100m',

    // Bright Background Variants
    bgBrightRed: '\x1b[101m',
    bgBrightGreen: '\x1b[102m',
    bgBrightYellow: '\x1b[103m',
    bgBrightBlue: '\x1b[104m',
    bgBrightMagenta: '\x1b[105m',
    bgBrightCyan: '\x1b[106m',
    bgBrightWhite: '\x1b[107m',
    bg256: (id: number) => `\x1b[48;5;${id}m`,
    bgRgb: (r: number, g: number, b: number) => `\x1b[48;2;${r};${g};${b}m`,
})
.option('reset', { reset: '\x1b[0m' })
.option('bold', { bold: ['\x1b[1m', '\x1b[22m'] })
.option('dim', { dim: ['\x1b[2m', '\x1b[22m'] })
.option('italic', { italic: ['\x1b[3m', '\x1b[23m'] })
.option('underline', { underline: ['\x1b[4m', '\x1b[24m'] })
.option('slowBlink', { slowBlink: ['\x1b[5m', '\x1b[25m'] })
.option('rapidBlink', { rapidBlink: ['\x1b[6m', '\x1b[25m'] })
.option('inverse', { inverse: ['\x1b[7m', '\x1b[27m'] })
.option('hidden', { hidden: ['\x1b[8m', '\x1b[28m'] })
.option('strikethrough', { strikethrough: ['\x1b[9m', '\x1b[29m'] })
.executor('$', (data) => {
    return (...args: any[]) => {
        const { fg, bg, ...rest } = data as Record<string, string>;
        const fgClose = fg ? '\x1b[39m' : '';
        const bgClose = bg ? '\x1b[49m' : '';
        const openList: string[] = [];
        const closeList: string[] = [];
        for (const [_, [open, close]] of Object.entries(rest)) {
            openList.push(open as string);
            closeList.push(close as string);
        }

        return `${bg ?? ''}${fg ?? ''}${openList.join('')}${args.join('')}${closeList.reverse().join('')}${fgClose}${bgClose}`
    }
})
.proxy();