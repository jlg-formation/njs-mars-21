import mongodb from "mongodb";

async function main() {
  try {
    const db = await mongodb.connect("mongodb://localhost:27017", {
      useUnifiedTopology: true,
    });
    console.log("successfully connected...");
    await db.close();
    console.log("closed.");
  } catch (err) {
    console.log("err: ", err);
  }
}

main();
