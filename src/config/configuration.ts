export default () => ({
    database: process.env.MYSQL_DB,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
});
