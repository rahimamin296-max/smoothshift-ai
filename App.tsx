import React, { useState, useEffect, useRef } from 'react';
import type { Plan, Testimonial, FaqItem } from './types';

// Custom hook for detecting if an element is on screen
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};


const SectionPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-block bg-gray-900 border border-gray-700 text-white text-sm px-4 py-1 rounded-full mb-4">
    {children}
  </div>
);

const Logo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" />
        <path d="M3 9a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1z" opacity="0.8"/>
        <path d="M4 13a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z" opacity="0.6"/>
      </svg>
    </div>
    <span className="font-bold text-xl">SmoothShift AI</span>
  </div>
);


const AnimatedSection: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};


const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const navItems = ['Process', 'Services', 'Plans', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const upRightArrow = "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25";
  const rightArrow = "M5 12h14m-7-7l7 7-7 7";
  const ctaIconPath = isScrolled && !isCtaHovered ? upRightArrow : rightArrow;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/70 backdrop-blur-xl' : 'bg-transparent'}`}>
       {isScrolled && (
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cg fill='white'%3E%3Ccircle cx='150' cy='200' r='1'/%3E%3Ccircle cx='650' cy='150' r='1'/%3E%3Ccircle cx='350' cy='550' r='1'/%3E%3Ccircle cx='500' cy='400' r='0.5'/%3E%3Ccircle cx='700' cy='700' r='0.5'/%3E%3Ccircle cx='80' cy='650' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
                        animation: `stars-anim 200s linear infinite, twinkle-glow 8s linear infinite`,
                        backgroundSize: '400px 400px'
                    }}
                    className="absolute inset-0"
                ></div>
            </div>
        )}
      <div className={`container mx-auto px-6 max-w-7xl flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <Logo />
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition hover:text-purple-300">{item}</a>)}
        </nav>
        <a 
          href="#contact" 
          onMouseEnter={() => setIsCtaHovered(true)}
          onMouseLeave={() => setIsCtaHovered(false)}
          className={`hidden md:flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${isScrolled ? 'w-10 h-10 p-0' : 'px-5 py-2'}`}
        >
          <span className={`transition-all duration-300 ${isScrolled ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>Book a call</span>
           <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={ctaIconPath} />
          </svg>
        </a>
      </div>
    </header>
  );
};

const AnimatedStars: React.FC = () => (
    <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(128,0,128,0.2),_transparent_40%)]"></div>
        <div
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                animation: `stars-anim 120s linear infinite`
            }}
            className="absolute inset-0 opacity-50"
        ></div>
        <style>{`
            @keyframes stars-anim {
                from { background-position: 0 0; }
                to { background-position: 0 -1000px; }
            }
        `}</style>
    </div>
);


const TechCarousel: React.FC = () => {
    const tech = ['OpenAI', 'ElevenLabs', 'Zapier', 'n8n', 'Make.com', 'LangChain', 'Midjourney'];
    const duplicatedTech = [...tech, ...tech]; // Duplicate for seamless loop
    return (
        <div className="w-full overflow-hidden relative grayscale opacity-60 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:bg-gradient-to-r before:from-[#030014] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:bg-gradient-to-l after:from-[#030014] after:to-transparent after:z-10">
            <div className="flex w-max scroller-inner">
                {duplicatedTech.map((item, index) => (
                    <div key={index} className="px-8 md:px-12 flex-shrink-0">
                        <p className="font-mono text-2xl tracking-widest">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const Hero: React.FC = () => (
  <section className="pt-32 pb-16 text-center relative overflow-hidden">
    <AnimatedStars />
    <div className="container mx-auto px-6 max-w-7xl">
    <AnimatedSection>
      <SectionPill>AI Automation Agency</SectionPill>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
        Breaking manual loops with AI automation
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        Automate More. Manage Less.
      </p>
      <div className="flex justify-center items-center space-x-4 mb-16">
        <a href="#services" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105">
          <span>Our Services</span>
        </a>
        <a href="#plans" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105">
          See Plans
        </a>
      </div>
      </AnimatedSection>
      <TechCarousel />
    </div>
  </section>
);

const About: React.FC = () => (
    <section className="py-20 text-center relative animated-gradient">
        <AnimatedSection>
            <div className="container mx-auto px-6 max-w-7xl">
                <SectionPill>Who We Are</SectionPill>
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    We build AI-powered workflows, conversational AI, and autonomous agents that close the loop on repetitive tasks. So, you can scale operations without scaling your team.
                </p>
            </div>
        </AnimatedSection>
    </section>
);

// --- Animated Mock UIs ---

const DiscoveryMockUI: React.FC = () => (
    <div className="bg-gray-900/50 p-4 rounded-lg h-48 flex items-end space-x-2 border border-gray-800">
        {[0.3, 0.5, 0.4, 0.7, 0.6, 0.9, 0.8].map((h, i) => (
            <div key={i} style={{ height: `${h * 100}%`, animationDelay: `${i * 100}ms` }} className="graph-bar bg-purple-500/60 w-1/6 rounded-t-sm"></div>
        ))}
    </div>
);

const DevTestMockUI: React.FC = () => (
    <div className="bg-gray-900/50 p-4 rounded-lg h-48 border border-gray-800 font-mono text-xs text-gray-400">
        <p><span className="text-purple-400">const</span> <span className="text-blue-400">solution</span> = <span className="text-purple-400">await</span> <span className="text-yellow-300">buildAI</span>(&#123;</p>
        <p className="pl-4">task: <span className="text-green-400">'automate_workflow'</span>,</p>
        <p className="pl-4">integrate: [<span className="text-green-400">'CRM'</span>, <span className="text-green-400">'API'</span>],</p>
        <p>&#125;);<span className="inline-block w-1 border-r-2 h-4 code-cursor -mb-1"></span></p>
    </div>
);

const LaunchMaintainMockUI: React.FC = () => (
    <div className="bg-gray-900/50 p-4 rounded-lg h-48 border border-gray-800 flex items-center justify-around">
        {[ 'Security', 'Efficiency', 'Speed' ].map(item => (
            <div key={item} className="text-center">
                <div className="relative w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-green-500/50 animate-ping"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="mt-3 text-sm font-semibold">{item}</p>
            </div>
        ))}
    </div>
);

const ChatbotMockUI: React.FC = () => (
    <div className="bg-gray-900/50 p-4 rounded-lg h-48 border border-gray-800 flex flex-col justify-end space-y-2">
        <div className="bg-purple-600 text-white p-3 rounded-lg rounded-br-none self-end max-w-xs">Hello! How can I help you today?</div>
        <div className="bg-gray-700 p-3 rounded-lg rounded-bl-none self-start flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
        </div>
    </div>
);

const ContentCreationMockUI: React.FC = () => (
    <div className="bg-gray-900/50 p-4 rounded-lg h-48 border border-gray-800 font-mono text-xs text-gray-400 overflow-hidden">
        <style>{`
            .line-appear { animation: appear 1s ease-out forwards; opacity: 0; }
            @keyframes appear { to { opacity: 1; } }
        `}</style>
        <p className="line-appear" style={{animationDelay: '0s'}}>// Generating content...</p>
        <p className="line-appear" style={{animationDelay: '0.5s'}}><span className="text-purple-400">Title:</span> "The Future of AI"</p>
        <div className="line-appear mt-2 w-full h-2 bg-gray-700 rounded" style={{animationDelay: '1s'}}></div>
        <div className="line-appear mt-1 w-5/6 h-2 bg-gray-700 rounded" style={{animationDelay: '1.2s'}}></div>
        <div className="line-appear mt-1 w-full h-2 bg-gray-700 rounded" style={{animationDelay: '1.4s'}}></div>
        <div className="line-appear mt-1 w-4/6 h-2 bg-gray-700 rounded" style={{animationDelay: '1.6s'}}></div>
    </div>
);

const DataInsightsMockUI: React.FC = () => (
    <div className="bg-gray-900/50 p-4 rounded-lg h-48 border border-gray-800 flex items-center justify-center">
        <style>{`
            .pie-chart {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: conic-gradient(#8b5cf6 0% 40%, #3b82f6 40% 75%, #10b981 75% 100%);
                animation: spin-in 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                transform: scale(0) rotate(-180deg);
            }
            @keyframes spin-in {
                to { transform: scale(1) rotate(0deg); }
            }
        `}</style>
        <div className="pie-chart"></div>
    </div>
);

const ConsultingMockUI: React.FC = () => (
    <div className="bg-gray-900/50 p-4 rounded-lg h-48 border border-gray-800 flex items-center justify-center relative overflow-hidden">
        <style>{`
            .node { animation: zoom-in 0.5s ease forwards; transform: scale(0); opacity: 0; }
            .line-path { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw-line 0.7s ease forwards; }
            @keyframes zoom-in { to { transform: scale(1); opacity: 1; } }
            @keyframes draw-line { to { stroke-dashoffset: 0; } }
        `}</style>
        <svg width="100%" height="100%" viewBox="0 0 200 100">
            <path d="M 40 50 H 80" stroke="#4b5563" strokeWidth="2" className="line-path" style={{animationDelay: '0.5s'}} />
            <path d="M 120 50 H 160" stroke="#4b5563" strokeWidth="2" className="line-path" style={{animationDelay: '0.7s'}} />
            <g className="node" style={{animationDelay: '0s'}}>
                <circle cx="20" cy="50" r="15" fill="#4f46e5" />
                <text x="20" y="53" textAnchor="middle" fill="white" fontSize="8">Start</text>
            </g>
            <g className="node" style={{animationDelay: '0.3s'}}>
                <rect x="80" y="35" width="40" height="30" rx="5" fill="#1f2937" stroke="#4b5563" />
                <text x="100" y="53" textAnchor="middle" fill="white" fontSize="8">Strategy</text>
            </g>
            <g className="node" style={{animationDelay: '0.9s'}}>
                 <circle cx="180" cy="50" r="15" fill="#10b981" />
                <text x="180" y="53" textAnchor="middle" fill="white" fontSize="8">Goal</text>
            </g>
        </svg>
    </div>
);


// --- Sections ---

const ProcessSection: React.FC = () => {
    const processSteps = [
        { title: 'Discovery & Analysis', description: 'We assess your workflows to uncover repetitive tasks and automation opportunities.', mock: <DiscoveryMockUI /> },
        { title: 'Development & Test', description: 'Custom AI solutions are designed and seamlessly integrated into your existing systems or an independent system.', mock: <DevTestMockUI /> },
        { title: 'Launch & Maintain', description: 'We monitor, refine, and scale automation for peak performance and long-term growth with privacy & security.', mock: <LaunchMaintainMockUI /> },
    ];
    return (
        <section id="process" className="py-20 text-center">
             <AnimatedSection>
            <div className="container mx-auto px-6 max-w-7xl">
                <SectionPill>Process</SectionPill>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Automation Process</h2>
                <p className="text-lg text-gray-400 mb-12">A structured path to seamless automation</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {processSteps.map((step) => (
                        <div key={step.title} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl text-left flex flex-col">
                            {step.mock}
                            <h3 className="text-xl font-bold mt-6 mb-2">{step.title}</h3>
                            <p className="text-gray-400 flex-grow">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            </AnimatedSection>
        </section>
    );
};


const ServicesSection: React.FC = () => {
    const services = [
        { title: 'AI Business Chatbot', description: 'Powerful AI chatbots and voice agents enhance customer experiences by automating responses and providing seamless, 24/7 support.', mock: <ChatbotMockUI/> },
        { title: 'AI Content Creation System', description: 'Workflows that\'ll effortlessly create high-quality, engaging content tailored to your audience\'s needs using AI-driven tools.', mock: <ContentCreationMockUI/> },
        { title: 'AI Lead Generation Workflow', description: 'AI Automation boosts your sales pipeline by accurately targeting high-quality prospects from your data or through scraping.', mock: <DiscoveryMockUI/> },
        { title: 'AI Data Insights', description: 'We build powerful AI systems that extract actionable insights from complex data, enabling businesses to make informed decisions.', mock: <DataInsightsMockUI/> },
        { title: 'AI Consulting', description: 'Work with our experts to develop personalized AI strategies that streamline operations and deliver impactful results.', mock: <ConsultingMockUI/> },
    ];
    return (
        <section id="services" className="py-20 text-center">
            <AnimatedSection>
            <div className="container mx-auto px-6 max-w-7xl">
                <SectionPill>Services</SectionPill>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Custom Automation Services</h2>
                <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">AI automation to streamline, innovate, and scale—without growing your team. We provide custom solutions across diverse industries.</p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {services.slice(0, 3).map((service, index) => (
                         <div key={index} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl flex flex-col">
                            {service.mock}
                            <h3 className="text-xl font-bold mt-6 mb-2">{service.title}</h3>
                            <p className="text-gray-400 flex-grow">{service.description}</p>
                        </div>
                    ))}
                </div>
                 <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
                    {services.slice(3, 5).map((service, index) => (
                         <div key={index} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl flex flex-col">
                             {service.mock}
                            <h3 className="text-xl font-bold mt-6 mb-2">{service.title}</h3>
                            <p className="text-gray-400 flex-grow">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            </AnimatedSection>
        </section>
    );
}

const BenefitsSection: React.FC = () => {
    const benefits = [
        { title: 'Cost reduction', description: 'Automate repetitive tasks and minimize manual effort to significantly cut operational expenses.', icon: 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6' },
        { title: 'High ROI', description: 'Implement AI strategies that deliver measurable returns by improving efficiency and performance across your business.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { title: 'Increased Profits', description: 'Optimize workflows, boost productivity, and make data-driven decisions that directly impact your bottom line.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    ];
    return (
        <section id="benefits" className="py-20 text-center">
            <AnimatedSection>
            <div className="container mx-auto px-6 max-w-7xl">
                <SectionPill>Benefits</SectionPill>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Maximize efficiency and impact</h2>
                <p className="text-lg text-gray-400 mb-12">Discover the key benefits of partnering with us.</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-900 to-purple-900/20 border border-gray-800 p-8 rounded-2xl text-left">
                            <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={benefit.icon} /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                            <p className="text-gray-400">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            </AnimatedSection>
        </section>
    );
};

const PricingSection: React.FC = () => {
    const [planType, setPlanType] = useState<'monthly' | 'annually'>('monthly');
    const plans: Plan[] = [
        { name: 'Foundation Plan', price: '449', annualPrice: '4850', audience: 'Solopreneurs / Startups', description: 'Deploy your first automation system and start saving hours every week, fully built and launched in under 14 days.', features: ['Up to 1 custom automation flow', 'Async email-based support', 'Access to automation dashboard', '1 monthly strategy call', 'Launch Guarantee', '100% Money-Back Guarantee'], ctaText: 'Go with this plan' },
        { name: 'Accelerator Plan', price: '1,149', annualPrice: '12410', audience: 'Growth-stage teams', description: 'Expand your automation stack and unlock intelligent, connected operations that respond, qualify, and act automatically.', features: ['Up to 5 automation systems', '1 advanced AI chatbot', 'AI Readiness Report', 'Slack + Email support (48-hour response)', 'AI Opportunity Tracker', '2 monthly strategy calls', 'Airtable, Notion, Sheets integrations', 'ROI Guarantee', '100% Money-Back Guarantee'], ctaText: 'Go with this plan' },
        { name: 'Scale Plus Plan', price: '2,320', annualPrice: '25050', audience: 'Mid-size ops & marketing teams', description: 'Turn your operations into a fully automated AI ecosystem. Connect data, conversations, and decision-making into one intelligent flow.', features: ['Up to 10 advanced automations', 'Multi-channel AI chatbots', 'Semi-custom analytics dashboard', 'Priority Slack support (<12-hour response)', 'AI Opportunity Discovery Dashboard', '4 monthly strategy calls', 'Airtable, Notion, Sheets, and 35+ SaaS integrations', 'Team dashboard access', 'Team onboarding', 'Performance-Backed Guarantee', '100% Money-Back Guarantee'], popular: true, ctaText: 'Go with this plan' },
        { name: 'Velocity Premium Plan', price: 'Custom', audience: 'Large orgs with 10+ workflows', description: 'Your AI Department-as-a-Service. We build, manage, and optimize your complete AI automation infrastructure and tech stack.', features: ['Unlimited custom workflows', 'Advanced Custom-built AI agents', 'Custom analytics dashboards', 'Dedicated Slack + live team (24/7 SLA)', 'Premium AI Opportunity Discovery Dashboard', 'Weekly calls with AI strategist', 'Unlimited Airtable, Notion, Sheets integrations', 'Team collaboration hub', 'On-premise or VPC deployment', 'Branded AI-powered automation toolkit', 'Performance-Backed Guarantee: 6X operational efficiency'], ctaText: 'Schedule a call' },
    ];
    
    return (
        <section id="plans" className="py-20 text-center">
            <AnimatedSection>
            <div className="container mx-auto px-6 max-w-7xl">
                <SectionPill>Plans</SectionPill>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible plans for growth</h2>
                <p className="text-lg text-gray-400 mb-12">Transparent pricing designed to fit your requirements.</p>
                <div className="inline-flex bg-gray-900 border border-gray-800 rounded-lg p-1 mb-12 relative">
                     <button onClick={() => setPlanType('annually')} className={`px-6 py-2 rounded-md transition ${planType === 'annually' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Annually</button>
                    <button onClick={() => setPlanType('monthly')} className={`px-6 py-2 rounded-md transition ${planType === 'monthly' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Monthly</button>
                    <span className={`absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full transition-opacity duration-300 ${planType === 'annually' ? 'opacity-100' : 'opacity-0'}`}>Save 10%</span>
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 text-left">
                    {plans.map((plan, index) => (
                        <div key={index} className={`relative bg-gray-900 border border-gray-800 p-8 rounded-2xl flex flex-col transition-transform transform hover:scale-105 hover:border-purple-600 ${plan.popular ? 'border-purple-500' : ''}`}>
                            {plan.popular && <div className="absolute top-0 -translate-y-1/2 right-8 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                            <div>
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                {plan.price === 'Custom' ? (
                                    <p className="text-4xl font-bold mb-2">Custom</p>
                                ) : (
                                    <p className="text-4xl font-bold mb-2">${planType === 'monthly' ? plan.price : plan.annualPrice}<span className="text-lg font-normal text-gray-400">/{planType === 'monthly' ? 'month' : 'year'}</span></p>
                                )}
                                <p className="text-gray-400 font-semibold mb-4">{plan.audience}</p>
                                <p className="text-gray-400 mb-6">{plan.description}</p>
                            </div>
                            <a href="#contact" className={`w-full text-center font-semibold py-3 rounded-lg transition mb-8 transform hover:scale-105 ${plan.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}>
                                {plan.ctaText}
                            </a>
                            <ul className="space-y-4">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            </AnimatedSection>
        </section>
    );
};

const TestimonialsSection: React.FC = () => {
    const testimonials: Testimonial[] = [
        { quote: '"SmoothShift AI transformed our workflow with incredible AI solutions. Their expertise truly exceeded all expectations!"', name: 'Dean Watson', title: 'Managing Director', company: 'Farmland', avatarUrl: 'https://picsum.photos/id/1005/100/100' },
        { quote: '"The team at SmoothShift provided game-changing insights that helped us optimize processes and scale operations fast."', name: 'Emily Zhang', title: 'CEO', company: 'Futuresync', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
        { quote: '"SmoothShift AI\'s tools revolutionized how we work, saving time and driving our productivity forward."', name: 'James Carter', title: 'Marketing Director', company: 'Innolystic', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
        { quote: '"Working with SmoothShift AI has been seamless. Their solutions are both innovative and highly effective."', name: 'Liam Walker', title: 'Product Manager', company: 'Brightpath', avatarUrl: 'https://picsum.photos/id/1012/100/100' },
        { quote: '"Thanks to SmoothShift, we\'ve achieved incredible growth by automating tasks and improving accuracy."', name: 'Miguel Torres', title: 'IT Consultant', company: 'Alphaedge', avatarUrl: 'https://picsum.photos/id/1013/100/100' },
        { quote: '"Their team delivered outstanding results, improving our efficiency beyond what we imagined!"', name: 'Priya Sharma', title: 'Founder', company: 'NexGen', avatarUrl: 'https://picsum.photos/id/1014/100/100' },
    ];
    
    return (
        <section className="py-20 text-center">
             <AnimatedSection>
             <div className="container mx-auto px-6 max-w-7xl">
                <SectionPill>Testimonials</SectionPill>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by satisfied clients</h2>
                <p className="text-lg text-gray-400 mb-12">Discover how we've driven growth and innovation.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-900 to-purple-900/20 border border-gray-800 p-8 rounded-2xl flex flex-col">
                            <p className="text-gray-300 mb-6 flex-grow">"{testimonial.quote}"</p>
                            <div className="flex items-center">
                                <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <p className="font-bold">{testimonial.name}</p>
                                    <p className="text-gray-400 text-sm">{testimonial.title} - {testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
             </AnimatedSection>
        </section>
    );
};


const ContactSection: React.FC = () => (
    <section id="contact" className="py-20">
        <AnimatedSection>
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Talk With Our Team</h2>
                    <p className="text-lg text-gray-400 mb-8">Whether you're curious about how AI can transform your business or ready to get started, we're here to help. Reach out today, we'd love to hear from you.</p>
                    <img src="https://picsum.photos/id/1005/800/1000" alt="Team member" className="rounded-2xl grayscale w-full object-cover h-96 md:h-auto" />
                </div>
                <div>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input type="text" name="name" id="name" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input type="email" name="email" id="email" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                            <textarea name="message" id="message" rows={5} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="I am looking to build a powerful AI agent for sales..."></textarea>
                        </div>
                        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105">Submit</button>
                    </form>
                    <div className="mt-8 space-y-4 text-gray-400">
                        <p className="flex items-center space-x-3"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span>contact@smoothshift.ai</span></p>
                        <p className="flex items-center space-x-3"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg><span>(213) 555-0123</span></p>
                        <p className="flex items-center space-x-3"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg><span>123 AI Avenue, San Francisco, CA 94107</span></p>
                    </div>
                </div>
            </div>
        </div>
        </AnimatedSection>
    </section>
);

const FaqAccordion: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-purple-900/20 last:border-b-0">
            <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left">
                <span className="text-lg font-medium text-white">{item.question}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pb-5 pr-10 text-gray-400">
                    <p>{item.answer}</p>
                </div>
            </div>
        </div>
    );
};

const FaqSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqItems: FaqItem[] = [
        { question: 'What technologies does SmoothShift AI use for automation?', answer: 'We use a wide range of state-of-the-art AI and automation technologies, including large language models (LLMs) like GPT, machine learning frameworks, and integration platforms like Zapier to create robust and scalable solutions.' },
        { question: 'How long does an AI automation project take?', answer: 'The timeline for a project depends on its complexity. A simple workflow can be deployed in as little as two weeks, while more complex, multi-system integrations may take several months. We provide a detailed timeline after the initial discovery phase.' },
        { question: 'Do you replace my team or work alongside them?', answer: 'Our goal is to augment your team, not replace them. We build AI tools that handle repetitive tasks, freeing up your employees to focus on strategic, high-value work that requires a human touch.' },
        { question: 'How do you ensure data security and privacy?', answer: 'Data security is our top priority. We follow industry best practices, including data encryption, access controls, and regular security audits. We are also compliant with major data protection regulations to ensure your information is always handled securely.'},
        { question: 'What kind of support can I expect after the project is launched?', answer: 'We offer various levels of ongoing support and maintenance plans, from async email support to dedicated live teams. Our goal is to ensure your AI systems run smoothly and continue to deliver value long after the initial launch.'},
        { question: 'What makes SmoothShift AI different from other agencies?', answer: 'We combine deep technical expertise with a strong focus on business outcomes. We don\'t just build technology; we build solutions that solve real-world problems and deliver a measurable return on investment, all while working as a true partner to your team.'},
        { question: 'Can you integrate with our existing tools and CRM?', answer: 'Yes. Our solutions are designed to be highly interoperable. We have extensive experience integrating with a wide variety of popular CRMs, ERPs, and other business software to ensure a seamless workflow.' },
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 text-center">
             <AnimatedSection>
            <div className="container mx-auto px-6 max-w-4xl">
                <SectionPill>FAQs</SectionPill>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">We're here to help</h2>
                <p className="text-lg text-gray-400 mb-12">FAQs designed to provide the information you need.</p>
                <div className="bg-purple-900/10 backdrop-blur-lg border border-purple-900/20 rounded-2xl px-8">
                    {faqItems.map((item, index) => (
                        <FaqAccordion key={index} item={item} isOpen={openIndex === index} onClick={() => handleToggle(index)} />
                    ))}
                </div>
            </div>
            </AnimatedSection>
        </section>
    );
};

const CtaSection: React.FC = () => (
    <section className="py-20 text-center">
        <AnimatedSection>
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex justify-center mb-4">
               <Logo />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Let's talk about<br />your next big move</h2>
            <p className="text-lg text-gray-400 mb-8">Hop on a call with us to see how our services can accelerate your growth.</p>
            <a href="#contact" className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105">
                <span>Schedule a quick call</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <p className="text-sm text-gray-500 mt-2">It's Free</p>
        </div>
        </AnimatedSection>
    </section>
);

const Footer: React.FC = () => (
    <footer className="py-12 border-t border-gray-800 bg-gray-900/20">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                 <div className="md:col-span-5 lg:col-span-6">
                    <Logo />
                    <p className="text-gray-400 mt-4 max-w-xs">Your trusted partner in AI solutions, creating smarter systems for smarter businesses.</p>
                </div>
                
                <div className="md:col-span-3 lg:col-span-2">
                    <h4 className="font-semibold mb-4">Explore</h4>
                    <ul className="space-y-2">
                        <li><a href="#process" className="text-gray-400 hover:text-white transition">Process</a></li>
                        <li><a href="#services" className="text-gray-400 hover:text-white transition">Services</a></li>
                        <li><a href="#plans" className="text-gray-400 hover:text-white transition">Plans</a></li>
                        <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                <div className="md:col-span-4 lg:col-span-4">
                    <h4 className="font-semibold mb-4">Get in Touch</h4>
                    <a href="mailto:contact@smoothshift.ai" className="block text-gray-400 hover:text-white transition mb-4">contact@smoothshift.ai</a>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-500 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.23 8.352a.75.75 0 00-1.06-1.06l-2.753 2.753.001-.001-3.72-3.72a.75.75 0 00-1.06 1.061l3.72 3.72-.001.001-2.753 2.753a.75.75 0 101.06 1.06l2.753-2.753-.001.001 3.72 3.72a.75.75 0 101.06-1.06l-3.72-3.72.001-.001 2.753-2.753z" /><path d="M11.5 6.035a5.483 5.483 0 014.331 1.63.75.75 0 10.976-1.148 6.983 6.983 0 00-5.807-2.066.75.75 0 00-.435 1.428A5.48 5.48 0 0111.5 6.035z" /><path d="M4.18 8.44a5.483 5.483 0 011.63-4.33.75.75 0 10-1.148-.977A6.983 6.983 0 002.6 9.04a.75.75 0 001.428.435A5.48 5.48 0 014.18 8.44z" /><path d="M17.459 11.977a5.483 5.483 0 01-1.63 4.331.75.75 0 101.148.976 6.983 6.983 0 002.066-5.807.75.75 0 10-1.428-.435 5.48 5.48 0 01-1.63 1.44z" /><path d="M8.44 19.82a5.483 5.483 0 01-4.33-1.63.75.75 0 10-.977 1.148 6.983 6.983 0 005.807 2.066.75.75 0 00.435-1.428A5.48 5.48 0 018.44 19.82z" /></svg></a>
                        <a href="#" className="text-gray-500 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.388 0-1.601 1.086-1.601 2.206v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.336 8.905H4.002v-8.59h2.671v8.59zM17.638 2H6.362A4.362 4.362 0 002 6.362v11.276A4.362 4.362 0 006.362 22h11.276A4.362 4.362 0 0022 17.638V6.362A4.362 4.362 0 0017.638 2z" clipRule="evenodd" /></svg></a>
                        <a href="#" className="text-gray-500 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.29 2.72 7.922 6.543 9.341.5.092.682-.217.682-.482 0-.237-.009-.865-.014-1.696-2.64.574-3.196-1.272-3.196-1.272-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.913.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.645 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.336 1.909-1.295 2.747-1.026 2.747-1.026.546 1.375.202 2.392.1 2.645.64.698 1.027 1.59 1.027 2.682 0 3.841-2.339 4.688-4.566 4.935.359.308.678.92.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .268.18.578.688.48A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" /></svg></a>
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p className="mb-4 md:mb-0">Created by the AI Engineer</p>
                <p>&copy; {new Date().getFullYear()} SmoothShift AI. All rights reserved.</p>
            </div>
        </div>
    </footer>
);


function App() {
  return (
    <div className="bg-[#030014] text-white font-sans overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <ProcessSection />
        <ServicesSection />
        <BenefitsSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
