import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/sequalize-database";
import {
  Categories,
  Courses,
  Enrollments,
  Instructor,
  Lectures,
  Payments,
  Review,
  User,
} from "../models";
import { Roles } from "../enums/role.enums";
import { EnrollmentsStatusEnum } from "../enums/enrollement.status.enum";
import { PaymentMethodEnum } from "../enums/payment.status.enum";

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");

    await sequelize.sync({ force: true });
    console.log("Database synced. Seeding data...");

    const category1Id = uuidv4();
    const category2Id = uuidv4();
    const category3Id = uuidv4();

    const userJohnId = uuidv4();
    const userAliceId = uuidv4();
    const instructorId = uuidv4();

    const courseNodeId = uuidv4();
    const coursePythonId = uuidv4();

    const lecture1Id = uuidv4();
    const lecture2Id = uuidv4();

    const enrollmentId = uuidv4();
    const paymentId = uuidv4();
    const reviewId = uuidv4();

    await Categories.bulkCreate([
      { id: category1Id, name: "Web Development", slug: "web-development" },
      { id: category2Id, name: "Data Science", slug: "data-science" },
      { id: category3Id, name: "Mobile Apps", slug: "mobile-apps" },
    ]);

    await User.bulkCreate([
      {
        id: userJohnId,
        name: "John Doe",
        email: "john@example.com",
        password: "hashedpassword1",
        role: Roles.User,
      },
      {
        id: userAliceId,
        name: "Alice Smith",
        email: "alice@example.com",
        password: "hashedpassword2",
        role: Roles.Instructor,
      },
    ]);

    await Instructor.bulkCreate([
      {
        id: instructorId,
        bio: "Expert in Full-Stack Web Development",
        profilePicUrl: "https://example.com/john-profile.jpg",
        expertise: "JavaScript, Node.js",
        userId: userAliceId,
      },
    ]);

    await Courses.bulkCreate([
      {
        id: courseNodeId,
        title: "Mastering Node.js",
        description: "Learn Node.js backend development from scratch.",
        price: 99.99,
        thumbnilUrl: "https://example.com/node-course.jpg",
        instructorId: instructorId,
        categoryId: category1Id,
      },
      {
        id: coursePythonId,
        title: "Python for Data Science",
        description: "Learn Python and machine learning concepts.",
        price: 129.99,
        thumbnilUrl: "https://example.com/python-course.jpg",
        instructorId: instructorId,
        categoryId: category2Id,
      },
    ]);

    await Lectures.bulkCreate([
      {
        id: lecture1Id,
        title: "Introduction to Node.js",
        videoUrl: "https://example.com/videos/node-intro.mp4",
        duration: 20.5,
        courseId: courseNodeId,
      },
      {
        id: lecture2Id,
        title: "Event Loop Explained",
        videoUrl: "https://example.com/videos/node-eventloop.mp4",
        duration: 15.2,
        courseId: courseNodeId,
      },
    ]);

    await Enrollments.bulkCreate([
      {
        id: enrollmentId,
        status: EnrollmentsStatusEnum.InProgress,
        userId: userJohnId,
        courseId: courseNodeId,
      },
    ]);

    await Payments.bulkCreate([
      {
        id: paymentId,
        amount: 99.99,
        status: "Completed",
        userId: userJohnId,
        courseId: courseNodeId,
        paymentMethod: PaymentMethodEnum.CreditCard,
      },
    ]);

    await Review.bulkCreate([
      {
        id: reviewId,
        rating: 5,
        comment: "Excellent course, very detailed!",
        enrollmentId: enrollmentId,
        courseId: courseNodeId,
      },
    ]);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

export default seedDatabase;
