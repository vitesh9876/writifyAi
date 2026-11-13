export interface LetterPresetItem {
  id: string;
  name: string;
  category: "Love & Romance" | "Apology" | "Birthday" | "Thank You" | "Formal & Career";
  icon: string;
  salutation: string;
  body: string;
  closing: string;
  theme: string;
}

export const LETTER_PRESETS: LetterPresetItem[] = [
  {
    id: "love-favorite-part-of-day",
    name: "My Favorite Part of Every Day",
    category: "Love & Romance",
    icon: "💖",
    salutation: "My Sweet Angel,",
    body: "No matter how chaotic or exhausting the world gets, hearing your voice or seeing your sweet smile instantly puts my heart at ease. You are my safe place, my comfort person, and my happiest thought every single day.\n\nThank you for being my constant sunshine and reminding me of everything that truly matters in life.",
    closing: "With all my heart,\nYours always and forever",
    theme: "rose"
  },
  {
    id: "love-late-night-thoughts",
    name: "Late Night Thoughts of You",
    category: "Love & Romance",
    icon: "🌙",
    salutation: "To My Dearest Human,",
    body: "It is late at night and the whole city is quiet, but my mind is still completely full of you. I was just lying here reminiscing about how hard we laughed today and how lucky I am to have someone who understands my quirks and dreams completely.\n\nI miss you every second you're not around.",
    closing: "Counting down until I see you,\nForever yours",
    theme: "night"
  },
  {
    id: "apology-sincere-amends",
    name: "A Sincere Heartfelt Apology",
    category: "Apology",
    icon: "🕊️",
    salutation: "Dear Friend,",
    body: "I am writing this because words sometimes stumble when spoken aloud, but I need you to know how deeply sorry I am for my recent behavior and the words I said in anger.\n\nOur bond means the world to me, and hurting you was never my intention. I take full responsibility and hope you can find it in your heart to forgive me.",
    closing: "With deepest regret and sincerity,\nTruly yours",
    theme: "neutral"
  },
  {
    id: "birthday-golden-wishes",
    name: "Golden Milestone Birthday",
    category: "Birthday",
    icon: "🎂",
    salutation: "Dearest Birthday Star,",
    body: "Happy Birthday! Today marks another wonderful lap around the sun for someone who brings nothing but warmth, laughter, and wisdom into every room they walk into.\n\nMay this year ahead overflow with spontaneous adventures, boundless good health, achieved dreams, and unending joy.",
    closing: "Cheers to you today and always,\nWith warmest love",
    theme: "gold"
  },
  {
    id: "thankyou-mentor-gratitude",
    name: "Gratitude to a Cherished Mentor",
    category: "Thank You",
    icon: "🌱",
    salutation: "Respected Professor / Mentor,",
    body: "I wanted to take a quiet moment to express my deepest gratitude for your patient guidance, thoughtful advice, and unwavering belief in my potential throughout this past semester.\n\nYour mentorship has shaped not only my academic and professional direction, but the way I approach life's challenges.",
    closing: "With profound respect and regards,\nGratefully yours",
    theme: "classic"
  }
];

export const SAMPLE_ASSIGNMENT_TEXT = `Title: Distributed Systems and Consensus in Modern Cloud Architecture
Author: Academic Research Group

1. Introduction to Fault Tolerance
In contemporary distributed systems, achieving reliable consistency across geographically dispersed nodes presents fundamental algorithmic challenges. As outlined by the Fischer-Lynch-Paterson (FLP) impossibility result, no deterministic asynchronous consensus algorithm can guarantee liveness in the presence of unannounced node crashes.

2. State Machine Replication
To overcome asynchronous network partitions, protocols such as Paxos and Raft coordinate replicated logs. Each state machine transitions deterministically through ordered client proposals:
- Leader Election: Periodic heartbeats ensure rapid term renewal.
- Log Replication: Quorum agreement requires consensus from a majority (N/2 + 1) of active replicas before commitment.
- Safety Invariants: Committed entries persist across leader transitions, guaranteeing monotonic log matching.

3. Performance and Latency Tradeoffs
Modern edge computing architectures frequently leverage optimistic concurrency control and Conflict-Free Replicated Data Types (CRDTs) to prioritize local write availability under high packet jitter conditions.`;

