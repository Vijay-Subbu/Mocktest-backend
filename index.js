import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

// Sample data for mock tests
const mockTests = [
  {
    id: 1,
    name: 'NEET Mock Test 1',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    duration: '3 hours',
    questions: [
      { id: 1, question: 'Question 1', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option A' },
      { id: 2, question: 'Question 2', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option B' },
    ]
  },
  {
    id: 2,
    name: 'NEET Mock Test 2',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    duration: '3 hours',
    questions: [
      { id: 1, question: 'Question 1', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option C' },
      { id: 2, question: 'Question 2', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 'Option D' },
    ]
  },
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// Get all mock tests
app.get('/api/mock-tests', (req, res) => {
  res.json(mockTests);
});

// Get a specific mock test by ID
app.get('/api/mock-test/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mockTest = mockTests.find(test => test.id === id);
  if (mockTest) {
    res.json(mockTest);
  } else {
    res.status(404).json({ message: 'Mock test not found' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
