import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('database', () => {
    return {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        synchronize: true,
        autoLoadEntities: true,
        entities: [join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
        migrations: [join(__dirname, '..', 'migrations', '*.ts')],
        cli: {
            migrationsDir: 'src/migrations',
        },
    };
});
