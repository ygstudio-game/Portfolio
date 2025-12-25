import React from 'react';
import { Code2, Target, Briefcase, Wrench, Rocket, BookOpen } from 'lucide-react';
import StackingCards from '@ui/StackingCards';
import { portfolioData } from '@data/portfolioData';

const About = () => {
  // Icon mapping
  const iconMap = {
    'Code2': Code2,
    'Target': Target,
    'Briefcase': Briefcase,
    'Wrench': Wrench,
    'Rocket': Rocket,
    'BookOpen': BookOpen
  };

  // Transform the data to include actual icon components
  const cards = portfolioData.aboutme.map(card => ({
    ...card,
    icon: React.createElement(iconMap[card.iconName] || Code2, { className: "w-12 h-12" })
  }));

  return (
    <section id="about">
      <StackingCards cards={cards} />
    </section>
  );
};

export default About;
