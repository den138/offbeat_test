// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';

// ConfigModule.forRoot({
//     isGlobal: true,
//     load: [dbConfiguration],
// });

// export default dbConfiguration();

// export const typeOrmConfig: TypeOrmModuleOptions = {
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: process.env.MYSQL_USERNAME,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB,
//     synchronize: true,
//     autoLoadEntities: true,
//     entities: [join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
//     migrations: [join(__dirname, 'src', 'migrations', '*.ts')],
// };

export const connectionSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: process.env.ENVIRONMENT === 'development' ? true : false,
    entities: [join(__dirname, 'src', 'modules', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, 'src', 'migrations', '*.ts')],
});

connectionSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
