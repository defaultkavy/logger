import { style } from './src/style';

const DEFAULT_DATE_TIME_FORMAT = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
export interface LoggerConfig {
    dateTimeFormat: Intl.DateTimeFormat;
    prefix: any[];
    level: LogLevel;
}

export type LogLevel = 0 | 1 | 2 | 3;

export class Logger {
    config: LoggerConfig;
    parent?: Logger;
    constructor(config?: Partial<LoggerConfig>, parent?: Logger) {
        this.config = {
          dateTimeFormat: config?.dateTimeFormat ?? DEFAULT_DATE_TIME_FORMAT,
          prefix: config?.prefix ?? [],
          level: config?.level ?? 0
        };
        this.parent = parent;
    }

    get level(): LogLevel {
        return this.parent?.level ?? this.config.level;
    }

    set level(level: LogLevel) {
        this.config.level = level;
    }

    error(...args: any[]) {
        if (this.level >= 1) console.error(`${style.dim.$(this.date())} ${style.bgBrightRed.black.bold.$(' ERROR ')} ${style.red.$(this.config.prefix.join(' '))}`, ...args)
        return new Error()
    }

    info(...args: any[]) {
        if (this.level >= 2) console.info(`${style.dim.$(this.date())} ${style.bgBrightBlue.black.bold.$(' INFO  ')} ${style.blue.$(this.config.prefix.join(' '))}`, ...args)
    }

    debug(...args: any[]) {
        if (this.level >= 3) console.debug(`${style.dim.$(this.date())} ${style.bgBrightYellow.black.bold.$(' DEBUG ')} ${style.yellow.$(this.config.prefix.join(' '))}`, ...args)
    }

    fatal(...args: any[]) {
        console.error(`${style.dim.$(this.date())} ${style.bgRed.white.bold.$(' FATAL ')} ${style.red.$(this.config.prefix.join(' '))}`, ...args)
        return new Error()
    }

    prefix(...args: any[]) {
        return new Logger({
            ...this.config,
            prefix: [...this.config.prefix, ...args]
        }, this)
    }

    private date(date = new Date()) {
        return this.config.dateTimeFormat.format(date)
    }
}