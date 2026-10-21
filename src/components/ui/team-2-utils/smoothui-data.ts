export interface Person {
  name: string;
  role: string;
  discipline?: string;
  experience: string;
  avatar: string;
  skills?: string[];
}

export function getAvatarUrl(avatar: string, size = 160): string {
  if (
    avatar.startsWith("http://") ||
    avatar.startsWith("https://") ||
    avatar.startsWith("/")
  ) {
    return avatar;
  }
  return `https://images.unsplash.com/${avatar}?auto=format&fit=crop&w=${size}&h=${size}&q=80`;
}

export function getAllPeople(): Person[] {
  return [
    {
      name: "Arkan Bhuiyan",
      role: "Founder & CEO / Chief Executive Officer",
      discipline: "Executive Leadership",
      experience:
        "Directs global brand architecture, 4K commercial video production, e-commerce & SaaS growth strategy, and high-ROAS omnichannel advertising across Meta, Google, TikTok, and LinkedIn.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
      skills: [
        "Brand Architecture",
        "4K Commercial Film",
        "Omnichannel Scaling",
        "SaaS Strategy",
      ],
    },
    {
      name: "Ridwan Arnob",
      role: "CTO / Chief Technology Officer",
      discipline: "Technical Leadership",
      experience:
        "Leads full-stack web engineering, Next.js & Node.js SaaS architecture, scalable cloud databases, and interactive GSAP & Three.js 3D web experiences.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
      skills: [
        "Next.js 16 & React 19",
        "Three.js & GSAP",
        "Cloud Architecture",
        "Full-Stack SaaS",
      ],
    },
  ];
}
