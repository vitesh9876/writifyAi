import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Handify database...");

  // Clean existing records
  await prisma.order.deleteMany();
  await prisma.canvasDesign.deleteMany();
  await prisma.scrollLetter.deleteMany();
  await prisma.letter.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.user.deleteMany();

  // Create primary demo user
  const demoUser = await prisma.user.create({
    data: {
      id: "usr_handify_pro_demo",
      email: "student@handify.in",
      displayName: "Alex Rivera",
      role: "user",
      planId: "pass_30d",
      planName: "30 Days Full Access Pro Pass",
      planExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isPro: true,
    },
  });

  // Create free guest user
  const freeUser = await prisma.user.create({
    data: {
      id: "usr_guest_demo",
      email: "guest@example.com",
      displayName: "Guest User",
      role: "user",
      planId: "free",
      planName: "Free Access",
      isPro: false,
    },
  });

  // Seed sample assignments
  await prisma.assignment.create({
    data: {
      id: "asgn_distributed_systems_01",
      userId: demoUser.id,
      title: "Distributed Systems & Raft Consensus Notes",
      fileName: "distributed-systems-homework.pdf",
      content: `Title: Distributed Systems and Consensus in Modern Cloud Architecture\n\n1. Introduction to Fault Tolerance\nIn contemporary distributed computing, achieving consensus across asynchronous nodes represents a foundational milestone. By maintaining an immutable replicated log, state machine replication prevents split-brain anomalies under network partitions.\n\n2. Key Quorum Properties\nA cluster consisting of 2F + 1 nodes can seamlessly tolerate up to F simultaneous fail-stop node crashes without stalling the commitment pipeline.`,
      contentPreview: "Title: Distributed Systems and Consensus in Modern Cloud Architecture...",
      pageCount: 2,
      wordCount: 84,
      charCount: 540,
      fontFamily: "cursive_real",
      fontSize: 21,
      lineHeight: 1.85,
      letterSpacing: 1.2,
      wordSpacing: 2.4,
      inkColor: "#002f6c",
      paperTemplate: "Classic White Notebook (Ruled)",
      scannerEffect: "camscanner",
      shadowEffect: "phone_camera",
      exportFormat: "pdf",
      settings: JSON.stringify({
        scannerContrast: 80,
        enablePageNumbers: true,
        headerDate: "November 13, 2026",
      }),
    },
  });

  await prisma.assignment.create({
    data: {
      id: "asgn_organic_chemistry_02",
      userId: demoUser.id,
      title: "Organic Chemistry Lab Report - Reaction Kinetics",
      fileName: "organic-chemistry-lab.jpg",
      content: `Experiment 4: Nucleophilic Substitution & Rate Kinetics\n\nObjectives:\n1. Determine the activation energy of second-order nucleophilic substitution (SN2).\n2. Calculate the specific rate constant k using polarimetric measurement.\n\nData & Results:\nTrial 1 achieved 94.2% theoretical yield after purification via fractional vacuum distillation. Refractive index confirmed clean esterification.`,
      contentPreview: "Experiment 4: Nucleophilic Substitution & Rate Kinetics...",
      pageCount: 1,
      wordCount: 46,
      charCount: 320,
      fontFamily: "tomatoes",
      fontSize: 19,
      lineHeight: 1.75,
      letterSpacing: 0.8,
      wordSpacing: 2.0,
      inkColor: "#111827",
      paperTemplate: "Natural Cream Paper (Ruled)",
      scannerEffect: "clean_document",
      shadowEffect: "study_lamp",
      exportFormat: "image",
    },
  });

  // Seed sample letters
  await prisma.letter.create({
    data: {
      id: "ltr_anniversary_rose_01",
      userId: demoUser.id,
      title: "My Favorite Part of Every Day",
      fileName: "anniversary-letter.pdf",
      category: "Love & Romance",
      templateId: "love-favorite-part-of-day",
      salutation: "My Sweet Angel,",
      dateText: "November 13, 2026",
      body: "No matter how chaotic or exhausting the world gets, hearing your voice or seeing your sweet smile instantly puts my heart at ease. You are my safe place, my comfort person, and my happiest thought every single day.\n\nThank you for being my constant sunshine and reminding me of everything that truly matters in life.",
      closing: "With all my heart,\nYours always and forever",
      fontFamily: "darlington",
      inkColor: "#1e3a8a",
      stationery: "stationery_rose",
      stamp: "stamp-royal-rose",
      exportFormat: "pdf",
    },
  });

  // Seed sample scroll letter
  await prisma.scrollLetter.create({
    data: {
      id: "scrl_ancient_decree_01",
      userId: demoUser.id,
      title: "Royal Knight Decree",
      fileName: "knighthood-decree.pdf",
      body: "Be it known to all kingdoms and travelers of the realm: on this momentous day, by royal proclamation and honor, our noble brotherhood hereby bestows the Order of the Golden Laurel.\n\nMay valor guide your blade and wisdom illuminate your path.",
      fontFamily: "halimun",
      inkColor: "#1a1a1a",
      parchmentStyle: "antique_scroll",
      stamps: JSON.stringify(["stamp-royal-crown", "stamp-paris-airmail"]),
      waxSeal: "imperial_crest",
      exportFormat: "pdf",
    },
  });

  // Seed sample orders
  await prisma.order.create({
    data: {
      id: "ord_rzp_98472918",
      userId: demoUser.id,
      planId: "pass_30d",
      planName: "30 Days Full Access Pro Pass",
      amount: 399,
      currency: "INR",
      gateway: "razorpay",
      gatewayOrderId: "order_Qz839kdm291",
      gatewayPaymentId: "pay_9824nvc938",
      status: "paid",
    },
  });

  console.log("Database seeded successfully with realistic Handify records!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

