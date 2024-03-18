import { openDB } from "idb";

export const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Logic to add content to the database
export const putDb = async (content) => {
  console.log("Post to JATE");
  const jateDb = await openDb("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.add({ content: content });
  const result = await request;
  console.log("New data saved to DB", result);
};

// Logic to get all content from the database
export const getDb = async () => {
  console.log("Get all content from the DB");
  const jateDb = await openDb("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  if (result.length) {
    console.log("result.value", result);
    return result;
  } else {
    console.log("Error! No result has been found.");
  };
};

initdb();
