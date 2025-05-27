const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Your Mongo URI
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 1. Find all books in a specific genre
    const genre = 'Dystopian';
    const booksInGenre = await collection.find({ genre }).toArray();
    console.log(`\n📚 Books in genre "${genre}":\n`, booksInGenre);

    // 2. Find books published after a certain year
    const year = 2000;
    const booksAfterYear = await collection.find({ published_year: { $gt: year } }).toArray();
    console.log(`\n📘 Books published after ${year}:\n`, booksAfterYear);

    // 3. Find books by a specific author
    const author = 'George Orwell';
    const booksByAuthor = await collection.find({ author }).toArray();
    console.log(`\n✍️ Books by ${author}:\n`, booksByAuthor);

    // 4. Update the price of a specific book
    const bookToUpdate = '1984';
    const newPrice = 19.99;
    const updateResult = await collection.updateOne(
      { title: bookToUpdate },
      { $set: { price: newPrice } }
    );
    console.log(`\n💰 Updated price for "${bookToUpdate}":`, updateResult.modifiedCount > 0 ? 'Success' : 'Not found');

    // 5. Delete a book by its title
    const bookToDelete = 'Brave New World';
    const deleteResult = await collection.deleteOne({ title: bookToDelete });
    console.log(`\n🗑️ Deleted "${bookToDelete}":`, deleteResult.deletedCount > 0 ? 'Success' : 'Not found');

    // 6. Aggregation: Average price of books by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { _id: '$genre', avgPrice: { $avg: '$price' } } }
    ]).toArray();
    console.log('\n📊 Average book price by genre:\n', avgPriceByGenre);

    // 7. Aggregation: Author with most books
    const topAuthor = await collection.aggregate([
      { $group: { _id: '$author', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('\n🏆 Author with the most books:\n', topAuthor);

    // 8. Group books by publication decade
    const booksByDecade = await collection.aggregate([
      {
        $group: {
          _id: { $floor: { $divide: ['$published_year', 10] } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          decade: { $multiply: ['$_id', 10] },
          count: 1,
          _id: 0
        }
      },
      { $sort: { decade: 1 } }
    ]).toArray();
    console.log('\n📚 Books grouped by decade:\n', booksByDecade);

    // 9. Create index on title
    await collection.createIndex({ title: 1 });
    console.log('\n⚡ Created index on title');

    // 10. Create compound index on author + published_year
    await collection.createIndex({ author: 1, published_year: -1 });
    console.log('⚡ Created compound index on author and published_year');

    // 11. Use explain() to compare performance
    const withoutIndex = await collection.find({ title: '1984' }).explain('executionStats');
    console.log('\n🔍 Query performance with index on title:\n', withoutIndex.executionStats);

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.close();
    console.log('\n🔒 Connection closed');
  }
}

runQueries();
