import {Collection, Db, MongoClient} from "mongodb";

// npm run testmongoutil

/*
Example:
const mongoHandler = await connectDb(process.env.MONGODB_URL, process.env.MONGO_DATABASE_NAME);
const test = await findInCollection(mongoHandler, "pswdDatabase", {name: "Leon17"});
console.log(test);

*/

let client: MongoClient = null;
let db: Db = null;

export type PasswordDoc = {
  name: string;
  pswd: string;
};
// ------------------
// Connect with Globals

export async function connectDbWithGolbals(url: string, dbname: string) {
  client = await MongoClient.connect(url, {useUnifiedTopology: true});
  db = client.db(dbname);
}

export function getCollection<T>(collectionName: string): Collection<T> {
  return db.collection<T>(collectionName);
}

// ------------------
// HANDLER

export async function connectDb(url: string, dbname: string) {
  const client = await MongoClient.connect(url, {useUnifiedTopology: true});
  const db = await client.db(dbname);
  const stats = await db.stats();
  return {
    client: client,
    db: db,
    stats: stats,
    status: stats.ok,
  };
}

// ------------------
// CREATE:

export async function insertInCollection(
  dbhandler: any,
  collectionName: string,
  insert: object[] | object
) {
  insert = Array.isArray(insert) ? insert : [insert];
  return await dbhandler.db.collection(collectionName).insertMany(insert);
}

// ------------------
// READ:

export const findInCollection = async (
  dbhandler: any,
  collectionName: string,
  findobject?: any
) => {
  return findResultToObject(await dbhandler.db.collection(collectionName).find(findobject));
};

// ------------------
// UPDATE

export async function updateManyInCollection(
  dbhandler: any,
  collectionName: string,
  updatesubject: any,
  updatedata: any
) {
  const changed = await dbhandler.db
    .collection(collectionName)
    .updateMany(updatesubject, updatedata);

  return changed.modifiedCount;
}

export async function updateOneInCollection(
  dbhandler: any,
  collectionName: string,
  updatesubject: any,
  updatedata: any
) {
  const changed = await dbhandler.db
    .collection(collectionName)
    .updateOne(updatesubject, updatedata);

  return changed.modifiedCount >= 1;
}

// ------------------
// DELETE

export async function deleteOneInCollection(
  dbhandler: any,
  collectionName: string,
  deleteobject: any
) {
  const deleteResult = await dbhandler.db.collection(collectionName).deleteOne(deleteobject);
  return deleteResult.deletedCount >= 1;
}

export async function deleteManyInCollection(
  dbhandler: any,
  collectionName: string,
  deleteobject: any
) {
  const deleteResult = await dbhandler.db.collection(collectionName).deleteMany(deleteobject);
  return deleteResult.deletedCount;
}

// ------------------
// CLOSE

export const closeDb = (o: any) => o.client.close();

// ------------------
// HELPER

export async function findResultToObject(cursor: any) {
  let arr: any[] = [];
  await cursor.forEach((e: any) => arr.push(e));
  return arr;
}
