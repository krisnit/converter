import { Storage } from '@google-cloud/storage';
import { v4 as uuid } from 'uuid';
const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCP_KEY_FILE,
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);

export async function uploadToBucket(buffer: Buffer, filename: string) {
    const uuidFilename = `${uuid()}-${filename}`;

    const file = bucket.file(uuidFilename);
    const data = await file.save(buffer);
    console.log(data);
    return `gs://${bucket.name}/${uuidFilename}`
}
