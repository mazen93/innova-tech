import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Services
  await prisma.service.createMany({
    data: [
      { name: 'Enterprise Web Development', description: 'Building secure, scalable, and high-performance web applications tailored to solve complex business challenges.', icon: 'Blocks' },
      { name: 'Mobile Experiences', description: 'Creating intuitive, natively compiled applications for iOS and Android.', icon: 'Smartphone' },
      { name: 'Growth Marketing', description: 'Data-driven strategies to scale user acquisition and customer retention.', icon: 'LineChart' },
      { name: 'Platform Architecture', description: 'Designing scalable microservices, resolving technical debt, and building resilient APIs.', icon: 'ShieldCheck' },
      { name: 'AI Integration', description: 'Bringing the power of Large Language Models (LLMs) and intelligent automation into workflows.', icon: 'Zap' },
    ],
  });

  // Products
  await prisma.product.createMany({
    data: [
      { 
        name: 'Idarax', 
        tagline: 'Omnichannel Commerce Engine', 
        description: 'A comprehensive SaaS ecosystem designed for modern retail and restaurant operations. From POS to AI-driven call centers, Idarax unifies every touchpoint.', 
        features: 'Multi-tenant POS, AI Call Center, Real-time CRM',
        image: '' 
      },
      { 
        name: 'Drovo', 
        tagline: 'Smart Logistics & Delivery', 
        description: 'Redefining the last mile with intelligent routing and automated fleet management. Drovo ensures speed, efficiency, and full transparency.', 
        features: 'Automated Routing, Real-time Tracking, Dynamic Dispatch',
        image: '' 
      },
      { 
        name: 'Shukran', 
        tagline: 'Customer Appreciation Redefined', 
        description: 'A loyalty and rewards platform built on gratitude. Shukran transforms customer interactions into long-term relationships.', 
        features: 'Reward Tiers, Sentiment Analysis, Unified Wallet',
        image: '' 
      },
    ],
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
