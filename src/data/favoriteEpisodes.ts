import claireVo from '../assets/learning/episode-claire-vo.png';
import matthewDicks from '../assets/learning/episode-matthew-dicks.png';
import maggieCrowley from '../assets/learning/episode-maggie-crowley.png';
import jiaonaZhang from '../assets/learning/episode-jiaona-zhang.png';
import billCarr from '../assets/learning/episode-bill-carr.png';
import toddJackson from '../assets/learning/episode-todd-jackson.png';
import nickBaumann from '../assets/learning/episode-nick-baumann.webp';
import agentLoops from '../assets/learning/episode-agent-loops.webp';
import iphoneApp from '../assets/learning/episode-iphone-app.webp';
import claudePm from '../assets/learning/episode-claude-pm.webp';

export const favoriteEpisodeShows = [
  { id: 'lenny', title: 'Lenny’s Podcast', episodes: [
    { title: 'A Framework for Finding Product-Market Fit', guest: 'Todd Jackson', href: 'https://www.lennysnewsletter.com/p/a-framework-for-finding-product-market', image: toddJackson },
    { title: 'Unpacking Amazon’s Unique Ways of Working', guest: 'Bill Carr', href: 'https://www.lennysnewsletter.com/p/unpacking-amazons-unique-ways-of', image: billCarr },
    { title: 'Bending the Universe in Your Favor', guest: 'Claire Vo', href: 'https://www.lennysnewsletter.com/p/bending-the-universe-in-your-favor', image: claireVo },
    { title: 'How to Tell Better Stories', guest: 'Matthew Dicks', href: 'https://www.lennysnewsletter.com/p/how-to-tell-better-stories-matthew', image: matthewDicks },
    { title: 'Mastering Product Strategy and Growing as a PM', guest: 'Maggie Crowley', href: 'https://www.lennysnewsletter.com/p/mastering-product-strategy-and-growing', image: maggieCrowley },
    { title: 'Building Minimum Lovable Products', guest: 'Jiaona Zhang', href: 'https://www.lennysnewsletter.com/p/building-minimum-lovable-products', image: jiaonaZhang },
  ] },
  { id: 'how-i-ai', title: 'How I AI', episodes: [
    { title: 'ChatGPT Codex Voice + Browser + Sites: An Expert’s AI Workflow', guest: 'Nick Baumann', href: 'https://podcasts.apple.com/us/podcast/chatgpt-codex-voice-browser-sites-an-experts-ai/id1809663079?i=1000779677863', image: nickBaumann },
    { title: 'How to Design AI Agent Loops: Schedules, Goals, and Subagents in Claude Code and Codex', guest: 'Claire Vo', href: 'https://podcasts.apple.com/us/podcast/how-to-design-ai-agent-loops-schedules-goals-and/id1809663079?i=1000773109920', image: agentLoops },
    { title: 'Building an iPhone App with Zero Technical Skills', guest: 'Bryce Rattner Keithley', href: 'https://podcasts.apple.com/us/podcast/building-an-iphone-app-with-zero-technical-skills/id1809663079?i=1000770565165', image: iphoneApp },
    { title: 'Claude Code for Product Managers: Research, Writing, Context Libraries, Custom To-Do System, and More', guest: 'Teresa Torres', href: 'https://podcasts.apple.com/us/podcast/claude-code-for-product-managers-research-writing-context/id1809663079?i=1000745736218', image: claudePm },
  ] },
];
