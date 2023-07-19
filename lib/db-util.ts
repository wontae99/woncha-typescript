import { Collection, Db, Document, MongoClient, Sort, Filter } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://wontae:${process.env.mongodb_password}@cluster0.ehbtvjv.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );

  return client;
}

export async function findDocument(
  client: MongoClient,
  collection: string,
  filter: object
) {
  const db = client.db();

  const result = await db.collection(collection).findOne(filter);

  return result;
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: Document
) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(
  client: MongoClient,
  collection: string,
  sort: Sort,
  filter: object
) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
