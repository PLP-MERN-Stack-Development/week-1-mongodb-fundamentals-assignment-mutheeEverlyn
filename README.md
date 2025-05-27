# PLP Bookstore MongoDB Project

This project demonstrates how to interact with a MongoDB database using Node.js. It includes basic CRUD operations, aggregation pipelines, index creation, and performance analysis using `explain()`.

## Features

- Find books by genre, author, or publication year
- Update and delete specific books
- Aggregation pipelines:
  - Average price of books by genre
  - Author with the most books
  - Books grouped by publication decade
- Create single and compound indexes
- Use `explain()` to demonstrate index performance improvements

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v18 or higher recommended)
- MongoDB (running locally at `mongodb://localhost:27017`)

```

## Sample Document Schema

Each document in the `books` collection should look like:

```json
{
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  }
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-1-mongodb-fundamentals-assignment-mutheeEverlyn.git
cd week-1-mongodb-fundamentals-assignment-mutheeEverlyn
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start MongoDB Locally

If using local MongoDB, ensure it's running:

```bash
mongod
```

## A.adding the books to the database

```bash
node insert_books
```

### B. Run the Queries

Execute all queries, aggregation pipelines, and index operations:

```bash
node queries.js
```

## Queries Performed in `queries.js`

### Basic Queries

- Find all books in a specific genre
- Find books published after a specific year
- Find books by a specific author
- Update the price of a specific book
- Delete a book by title

### Aggregation Pipelines

- Calculate average price of books by genre
- Find the author with the most books
- Group books by decade of publication and count them

### Indexing

- Create an index on the `title` field
- Create a compound index on `author` and `published_year`

### Performance Analysis

- Use `explain()` to analyze the query execution plan and performance improvements due to indexes

## Example Output

```
✅ Connected to MongoDB

📚 Books in genre "Dystopian":
[ { title: '1984', author: 'George Orwell', ... } ]

📘 Books published after 2000:
[ { title: 'The Road', author: 'Cormac McCarthy', ... } ]

✍️ Books by George Orwell:
[ { title: '1984', ... }, { title: 'Animal Farm', ... } ]

💰 Updated price for "1984": Success

🗑️ Deleted "Brave New World": Success

📊 Average book price by genre:
[ { _id: 'Dystopian', avgPrice: 18.99 }, { _id: 'Fantasy', avgPrice: 22.50 } ]

🏆 Author with the most books:
[ { _id: 'George Orwell', count: 2 } ]

📚 Books grouped by decade:
[ { decade: 1940, count: 2 }, { decade: 2000, count: 1 } ]

⚡ Created index on title
⚡ Created compound index on author and published_year

🔍 Query performance with index on title:
{ totalDocsExamined: 1, totalKeysExamined: 1, ... }

🔒 Connection closed
```

## Testing with MongoDB Compass

If you're using MongoDB Compass:

1. Connect to `mongodb://localhost:27017`
2. Choose `plp_bookstore` database
3. Select the `books` collection
4. You can paste queries into the **"Filter"** or **"Aggregation"** tab

Example Filter:

```json
{ "genre": "Dystopian" }
```

## Author

**Your Name**  
GitHub: [@mutheeEverlyn](https://github.com/mutheeEverlyn)


