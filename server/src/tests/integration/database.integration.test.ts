import mongoose from 'mongoose';
import { connectDB } from '../../config/database';

const checkMongoDBConnection = async (): Promise<boolean> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mychessstudy');
    await mongoose.connection.close();
    return true;
  } catch (error) {
    return false;
  }
};

describe('MongoDB Integration', () => {
  beforeAll(async () => {
    // Check if MongoDB is available
    const isMongoAvailable = await checkMongoDBConnection();
    if (!isMongoAvailable) {
      console.warn('\nMongoDB is not available. Skipping integration tests.\n');
      // Skip all tests in this suite
      return Promise.reject('MongoDB is not available');
    }

    // MongoDB is available, proceed with connection
    await connectDB(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to MongoDB and perform CRUD operations', async () => {
    // Create a test schema
    const TestSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });

    // Create a test model
    const TestModel = mongoose.model('Test', TestSchema);

    // Create
    const testDoc = await TestModel.create({
      name: 'Integration Test'
    });
    expect(testDoc.name).toBe('Integration Test');

    // Read
    const foundDoc = await TestModel.findById(testDoc._id);
    expect(foundDoc).toBeDefined();
    expect(foundDoc?.name).toBe('Integration Test');

    // Update
    const updatedDoc = await TestModel.findByIdAndUpdate(
      testDoc._id,
      { name: 'Updated Test' },
      { new: true }
    );
    expect(updatedDoc?.name).toBe('Updated Test');

    // Delete
    await TestModel.findByIdAndDelete(testDoc._id);
    const deletedDoc = await TestModel.findById(testDoc._id);
    expect(deletedDoc).toBeNull();

    // Clean up - drop the test collection
    await mongoose.connection.collections['tests'].drop();
  });

  it('should handle concurrent operations', async () => {
    const TestSchema = new mongoose.Schema({
      counter: Number
    });
    const TestModel = mongoose.model('TestConcurrent', TestSchema);

    // Create initial document
    const doc = await TestModel.create({ counter: 0 });

    // Perform multiple increments concurrently
    const numberOfOperations = 10;
    const incrementOperations = Array(numberOfOperations).fill(null).map(() =>
      TestModel.findByIdAndUpdate(
        doc._id,
        { $inc: { counter: 1 } },
        { new: true }
      )
    );

    // Wait for all operations to complete
    await Promise.all(incrementOperations);

    // Verify final count
    const finalDoc = await TestModel.findById(doc._id);
    expect(finalDoc?.counter).toBe(numberOfOperations);

    // Clean up
    await mongoose.connection.collections['testconcurrents'].drop();
  });

  it('should handle large dataset operations', async () => {
    const TestSchema = new mongoose.Schema({
      index: Number,
      data: String
    });
    const TestModel = mongoose.model('TestBulk', TestSchema);

    // Create multiple documents
    const documents = Array(100).fill(null).map((_, index) => ({
      index,
      data: `Test data ${index}`
    }));

    // Bulk insert
    await TestModel.insertMany(documents);

    // Test pagination
    const pageSize = 10;
    const page = 2;
    const results = await TestModel
      .find()
      .sort({ index: 1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    expect(results).toHaveLength(pageSize);
    expect(results[0].index).toBe(pageSize);

    // Test aggregation
    const stats = await TestModel.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          avgIndex: { $avg: '$index' }
        }
      }
    ]);

    expect(stats[0].count).toBe(100);
    expect(stats[0].avgIndex).toBe(49.5);

    // Clean up
    await mongoose.connection.collections['testbulks'].drop();
  });
});
