import type { ImageMetadata } from 'astro';
import cover0 from '../assets/learning/ai-engineering.png';
import cover1 from '../assets/learning/obviously-awesome-front.png';
import cover2 from '../assets/learning/supercommunicators-front.jpg';
import cover3 from '../assets/learning/product-management-in-practice.jpg';
import cover4 from '../assets/learning/build-front.jpg';
import cover5 from '../assets/learning/hooked.jpg';
import cover6 from '../assets/learning/grit.jpg';
import cover7 from '../assets/learning/lean-product-playbook-front.jpg';
import cover8 from '../assets/learning/inspired.jpg';
import cover9 from '../assets/learning/thinking-in-bets.jpg';
import cover10 from '../assets/learning/healthcare-strategy.png';
import cover11 from '../assets/learning/lenny-podcast.jpg';
import cover12 from '../assets/learning/how-i-ai.jpg';
import cover13 from '../assets/learning/freakonomics-radio.jpg';
import cover14 from '../assets/learning/planet-money.jpg';
import cover15 from '../assets/learning/hidden-brain.jpg';
import cover16 from '../assets/learning/ahealthcarez.png';
import journalCover from '../assets/learning/the-journal.jpg';
import economicsCover from '../assets/learning/economics-everyday-things.jpg';
import ycCover from '../assets/learning/y-combinator.jpg';
import a16zCover from '../assets/learning/a16z-show.jpg';
import twentyVcCover from '../assets/learning/20vc.jpg';
import acquiredCover from '../assets/learning/acquired.jpg';
import productThinkingCover from '../assets/learning/product-thinking.jpg';
import healthcarePodcastCover from '../assets/learning/business-of-healthcare.jpg';

import addedCover0 from '../assets/learning/radical-candor.jpg';
import addedCover1 from '../assets/learning/high-growth-handbook.jpg';
import addedCover2 from '../assets/learning/scaling-people.jpg';
import addedCover3 from '../assets/learning/monetizing-innovation.jpg';
import addedCover4 from '../assets/learning/storybrand.jpg';
import addedCover5 from '../assets/learning/five-dysfunctions.jpg';
import addedCover6 from '../assets/learning/designing-your-life.jpg';
import addedCover7 from '../assets/learning/creativity-inc.jpg';
import addedCover8 from '../assets/learning/design-of-everyday-things.jpg';
import addedCover9 from '../assets/learning/dont-make-me-think.jpg';

export const bookCategories = [
  { id: 'product', label: 'Product & technology' },
  { id: 'leadership', label: 'Leadership & culture' },
  { id: 'strategy', label: 'Strategy & communication' },
  { id: 'mindset', label: 'Mindset & growth' },
] as const;
export type BookCategory = typeof bookCategories[number]['id'];

interface LearningResource {
  id: string;
  title: string;
  creator: string;
  href: string;
  kind: 'book' | 'podcast' | 'video';
  image: ImageMetadata;
  category?: BookCategory;
}

export const learningResources: LearningResource[] = [
  { id: "ai-engineering", title: "AI Engineering: Building Applications with Foundation Models", creator: "Chip Huyen", href: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/", kind: "book", category: "product", image: cover0 },
  { id: "obviously-awesome", title: "Obviously Awesome", creator: "April Dunford", href: "https://www.aprildunford.com/books", kind: "book", category: "strategy", image: cover1 },
  { id: "supercommunicators", title: "Supercommunicators", creator: "Charles Duhigg", href: "https://charlesduhigg.com/supercommunicators/", kind: "book", category: "strategy", image: cover2 },
  { id: "product-management-in-practice", title: "Product Management in Practice", creator: "Matt LeMay", href: "https://mattlemay.com/books", kind: "book", category: "product", image: cover3 },
  { id: "build", title: "Build", creator: "Tony Fadell", href: "https://www.buildc.com/the-book/", kind: "book", category: "product", image: cover4 },
  { id: "hooked", title: "Hooked", creator: "Nir Eyal", href: "https://www.penguinrandomhouse.com/books/317898/hooked-by-nir-eyal/9780698190665/", kind: "book", category: "product", image: cover5 },
  { id: "grit", title: "Grit", creator: "Angela Duckworth", href: "https://www.simonandschuster.com/books/Grit/Angela-Duckworth/9781501111105", kind: "book", category: "mindset", image: cover6 },
  { id: "lean-product-playbook", title: "The Lean Product Playbook", creator: "Dan Olsen", href: "https://leanproductplaybook.com/book/", kind: "book", category: "product", image: cover7 },
  { id: "inspired", title: "Inspired", creator: "Marty Cagan", href: "https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love-2nd-edition/", kind: "book", category: "product", image: cover8 },
  { id: "thinking-in-bets", title: "Thinking in Bets", creator: "Annie Duke", href: "https://www.penguinrandomhouse.com/books/552885/thinking-in-bets-by-annie-duke/", kind: "book", category: "mindset", image: cover9 },
  { id: "healthcare-strategy", title: "HBR’s 10 Must Reads on Strategy for Healthcare", creator: "Harvard Business Review", href: "https://store.hbr.org/product/hbr-s-10-must-reads-on-strategy-for-healthcare-featuring-the-strategy-that-will-fix-healthcare-by-michael-e-porter-and-thomas-h-lee-md/10186", kind: "book", category: "strategy", image: cover10 },
  { id: "radical-candor", title: "Radical Candor", creator: "Kim Scott", href: "https://a.co/d/0nHdaMM", kind: "book", category: "leadership", image: addedCover0 },
  { id: "high-growth-handbook", title: "High Growth Handbook: Scaling Startups from 10 to 10,000 People", creator: "Elad Gil", href: "https://a.co/d/7C50W2b", kind: "book", category: "leadership", image: addedCover1 },
  { id: "scaling-people", title: "Scaling People: Tactics for Management and Company Building", creator: "Claire Hughes Johnson", href: "https://a.co/d/6AU9Ex3", kind: "book", category: "leadership", image: addedCover2 },
  { id: "monetizing-innovation", title: "Monetizing Innovation: How Smart Companies Design the Product Around the Price", creator: "Madhavan Ramanujam & Georg Tacke", href: "https://a.co/d/h5fT1uc", kind: "book", category: "strategy", image: addedCover3 },
  { id: "storybrand", title: "Building a StoryBrand: Clarify Your Message So Customers Will Listen", creator: "Donald Miller", href: "https://www.amazon.com/dp/0718033329", kind: "book", category: "strategy", image: addedCover4 },
  { id: "five-dysfunctions", title: "The Five Dysfunctions of a Team: A Leadership Fable", creator: "Patrick Lencioni", href: "https://a.co/d/aHOl4gw", kind: "book", category: "leadership", image: addedCover5 },
  { id: "designing-your-life", title: "Designing Your Life", creator: "Bill Burnett & Dave Evans", href: "https://a.co/d/cb4fXXW", kind: "book", category: "mindset", image: addedCover6 },
  { id: "creativity-inc", title: "Creativity, Inc.: Overcoming the Unseen Forces That Stand in the Way of True Inspiration", creator: "Ed Catmull & Amy Wallace", href: "https://a.co/d/8bGDuhU", kind: "book", category: "leadership", image: addedCover7 },
  { id: "design-of-everyday-things", title: "The Design of Everyday Things", creator: "Don Norman", href: "https://a.co/d/6n1SWHC", kind: "book", category: "product", image: addedCover8 },
  { id: "dont-make-me-think", title: "Don’t Make Me Think, Revisited: A Common Sense Approach to Web Usability", creator: "Steve Krug", href: "https://a.co/d/bIzWJOs", kind: "book", category: "product", image: addedCover9 },
  { id: "lenny-podcast", title: "Lenny’s Podcast", creator: "Lenny Rachitsky", href: "https://podcasts.apple.com/us/podcast/lennys-podcast-product-career-growth/id1627920305", kind: "podcast", image: cover11 },
  { id: "how-i-ai", title: "How I AI", creator: "Claire Vo", href: "https://podcasts.apple.com/us/podcast/how-i-ai/id1809663079", kind: "podcast", image: cover12 },
  { id: "freakonomics-radio", title: "Freakonomics Radio", creator: "Freakonomics Radio", href: "https://podcasts.apple.com/us/podcast/freakonomics-radio/id354668519", kind: "podcast", image: cover13 },
  { id: "planet-money", title: "Planet Money", creator: "NPR", href: "https://podcasts.apple.com/us/podcast/planet-money/id290783428", kind: "podcast", image: cover14 },
  { id: "hidden-brain", title: "Hidden Brain", creator: "Shankar Vedantam", href: "https://podcasts.apple.com/us/podcast/hidden-brain/id1028908750", kind: "podcast", image: cover15 },
  { id: "the-journal", title: "The Journal.", creator: "The Wall Street Journal & Spotify Studios", href: "https://podcasts.apple.com/us/podcast/the-journal/id1469394914", kind: "podcast", image: journalCover },
  { id: "economics-everyday-things", title: "The Economics of Everyday Things", creator: "Zachary Crockett", href: "https://podcasts.apple.com/us/podcast/the-economics-of-everyday-things/id1666678354", kind: "podcast", image: economicsCover },
  { id: "y-combinator", title: "Y Combinator Startup Podcast", creator: "Y Combinator", href: "https://podcasts.apple.com/us/podcast/y-combinator-startup-podcast/id1236907421", kind: "podcast", image: ycCover },
  { id: "a16z-show", title: "The a16z Show", creator: "Andreessen Horowitz", href: "https://podcasts.apple.com/us/podcast/the-a16z-show/id842818711", kind: "podcast", image: a16zCover },
  { id: "20vc", title: "20VC", creator: "Harry Stebbings", href: "https://podcasts.apple.com/us/podcast/the-twenty-minute-vc-20vc-venture-capital-startup/id958230465", kind: "podcast", image: twentyVcCover },
  { id: "acquired", title: "Acquired", creator: "Ben Gilbert and David Rosenthal", href: "https://podcasts.apple.com/us/podcast/acquired/id1050462261", kind: "podcast", image: acquiredCover },
  { id: "product-thinking", title: "Product Thinking", creator: "Melissa Perri", href: "https://podcasts.apple.com/us/podcast/product-thinking/id1550800132", kind: "podcast", image: productThinkingCover },
  { id: "business-of-healthcare", title: "The Business of Healthcare Podcast", creator: "UT Dallas, Center for Healthcare Leadership and Management", href: "https://podcasts.apple.com/us/podcast/the-business-of-healthcare-podcast/id1271887430", kind: "podcast", image: healthcarePodcastCover },
  { id: "ahealthcarez", title: "AHealthcareZ", creator: "Dr. Eric Bricker", href: "https://www.youtube.com/@ahealthcarez/videos", kind: "video", image: cover16 },
];
