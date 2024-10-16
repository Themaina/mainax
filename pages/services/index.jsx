import Color from '../../components/utils/page.colors.util';
import ServiceCards from '../../components/sections/services/ServiceCards.js';
import colors from '../../content/services/_colors.json';

const services = [
  { name: "Full Stack Development", description: "Web development from frontend to backend.", popularity: 1 },
  { name: "Mobile App Development", description: "Native and cross-platform mobile apps.", popularity: 2 },
  { name: "SEO and Digital Marketing", description: "Optimizing websites and marketing strategies.", popularity: 3 },
  { name: "POS System Integration", description: "Integrating POS systems into businesses.", popularity: 4 },
  { name: "Website Design and Development", description: "Building responsive, modern websites.", popularity: 5 },
  { name: "Tech Consultancy", description: "Expert advice and strategies for tech solutions.", popularity: 6 },
  { name: "Social Media Management", description: "Growing and managing social media presence.", popularity: 7 },
  { name: "ERP System Integration", description: "Integrating ERP systems into your business.", popularity: 8 },
  { name: "Cybersecurity Consulting", description: "Securing digital assets and networks.", popularity: 9 },
  { name: "Software Sales and Installation", description: "Licensed software sales and installations.", popularity: 10 },
  { name: "Hardware Repair and Maintenance", description: "Repair and maintenance of devices.", popularity: 11 },
  { name: "Digital Marketing Strategy", description: "Creating and executing marketing strategies.", popularity: 12 },
];

export default function Services() {
  return (
    <>
      <Color colors={colors} />
      <ServiceCards services={services} />
    </>
  );
}
