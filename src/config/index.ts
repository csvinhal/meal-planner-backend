process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    databaseURL: `${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`,
    port: process.env.PORT || 4000,
    uploadDest: process.env.UPLOAD_DEST || 'uploads'
}