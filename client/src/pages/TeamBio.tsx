import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Users, Award, Mail, Phone, Linkedin } from "lucide-react";
import { useLocation, useRoute } from "wouter";

import Brian from "@assets/Brian.jpg";
import Taylor from "@assets/Taylor.jpg";
import Roland from "@assets/Roland_1753982586022.jpg";
import Drew from "@assets/Drew.jpg";
import Marie from "@assets/Marie.jpg";

interface TeamMemberBio {
  name: string;
  title: string;
  image: string | null;
  bio: string;
  credentials: string[];
  specialties: string[];
  experience: string;
  education: string[];
  contact: {
    email?: string;
    phone?: string;
    linkedin?: string;
  };
}

const teamBios: Record<string, TeamMemberBio> = {
  "brian-bennett": {
    name: "Brian Bennett",
    title: "President",
    image: "attached_assets/brian-bennett-final.jpg",
    bio: "Brian Bennett started as a broker with EF Hutton in 1976, followed by 13 years with Boettcher and Company, a Colorado investment banking firm. In order to avoid the ethical conflicts associated with the corporate brokerage model, he became an independent advisor in 1991 and transitioned from an investment \"sales culture\" to a \"consultative problem solving\" culture. He created BennCo Advisors in 1998.\n\nBrian has had extensive experience as a decision maker for institutions lending valuable insights when advising individual investors.\n\nHe has served as trustee of the Colorado Episcopal Foundation, and the chair of the Foundation's Investment Committee overseeing management of over $30 million church funds. He served 21 years on the Regis University Investment Oversight Committee, managing the University's current $90 million endowment.\n\nAs an active community volunteer, he has served as chair of the Better Business Bureau, the BBB Foundation, President of the Cathedral Ridge Camp and Retreat Center in Woodland Park, Colorado, and is a member of the Rotary Club of East Colorado Springs.\n\nAs members of Chapel of our Savior Episcopal Church, he and his wife Becky conceived, organized and are currently founders and co-chairs of the Feast of Saint Arnold, Colorado's Family Friendly Beer Festival which has raised over $400,000 for charity since 2012.\n\nHe and Becky have been married for 26 years and with their blended family have 6 grandchildren. Hobbies include cooking, entertaining at home, and wine and craft beer tasting.",
    credentials: ["Series 7", "Series 66", "xxx"],
    specialties: ["Retirement Planning", "Investment Management", "Estate Planning", "Tax Strategies"],
    experience: "49+ years in financial services",
    education: ["University of Colorado Boulder - Bachelor of Business Administration", "Certified Financial Planner Certificate Program"],
    contact: {
      email: "brian@bennco.com",
      phone: "(719) 577-0099"
    }
  },
  "taylor-wilson": {
    name: "Taylor Willson",
    title: "Financial Advisor",
    image: "taylor-skiing.svg",
    bio: "Taylor Willson started his career in financial services in 2008 as an administrative assistant at Morgan Stanley Smith Barney. He then joined Northwestern Mutual as a financial representative in 2010 specializing in life, disability and long-term care insurance. After three years at Northwestern Mutual, Taylor joined Bennco Advisors as an independent financial advisor. In his 12 years at Bennco Advisors Taylor has assisted clients of all ages with retirement, income and insurance planning.\n\nTaylor is a Colorado Springs native and active in the community, serving as a board member for the Maytag Crawford charitable trust, coaching youth sports for Colorado Springs Parks and Recreation as well as running the kickoff golf tournament for the Empty Stocking Foundation.\n\nTaylor is a proud uncle to four nephews. He is an avid golfer sporting a 2-handicap index, enjoys working out, spending time outside and traveling.",
    credentials: ["Life Insurance License", "Disability Insurance License", "Long-term Care Insurance License"],
    specialties: ["Retirement Planning", "Income Planning", "Insurance Planning", "Client Service"],
    experience: "16+ years in financial services",
    education: ["Financial Services Training", "Northwestern Mutual Training Program"],
    contact: {
      email: "taylor@bennco.com",
      phone: "(719) 577-0099"
    }
  },
  "roland-quast": {
    name: "Roland Quast",
    title: "Chief Executive Officer",
    image: "roland-mountains.svg",
    bio: "Mr. Quast is a senior business executive with over 3 decades of experience in the financial services industry. He has held leadership and executive management roles at several capital market firms including the two companies which he founded. He has not only been involved with the de novo formation of several distribution platforms retail broker dealer and RIA channels but subsequently was accountable for raising the capital for those firm's various investment programs.\n\nRoland has a deep knowledge of investment product structures including stock and bonds, REITs, private placements mutual funds, and qualified retirement platforms.\n\nThe favorite part of his career is working with clients to help them find a solution to their specific investment needs and objectives.\n\nRoland graduated from the University of Minnesota where he received a B.B.A in Finance and a B.A. in Economics. He has received program certification awards from firms such as Sequoia, Miller Heiman, The Fusion Group, Dale Carnegie, Zig Ziglar and The Wholesaler Institute. Mr. Quast has completed several Financial Industry Regulatory Authority (FINRA) securities exams, including the Series 6, 7, 24, 63, 65 and 99.\n\nIn his spare time Roland enjoys Colorado's diverse outdoor activities such as fly fishing, skiing, golfing, biking and hiking. He also enjoys reading, cooking, wine and listening to music.",
    credentials: ["Series 6", "Series 7", "Series 24", "Series 63", "Series 65", "Series 99"],
    specialties: ["Investment Product Structures", "Business Development", "Distribution Platform Development", "Client Solutions"],
    experience: "30+ years in financial services leadership",
    education: ["University of Minnesota - B.B.A in Finance", "University of Minnesota - B.A. in Economics", "Program certifications from Sequoia, Miller Heiman, The Fusion Group, Dale Carnegie, Zig Ziglar, The Wholesaler Institute"],
    contact: {
      email: "roland@bennco.com",
      phone: "(719) 577-0099"
    }
  },
  "marie-patti": {
    name: "Marie Patti",
    title: "Executive Administrative Assistant",
    image: "marie-photo.jpg",
    bio: "Marie returned to BennCo Advisors for the second time in 2021 and has over 20 years of experience as an Executive Administrative Assistant. Marie holds a degree in Forensic Psychology. In addition to her role at BennCo Advisors, she also provides counseling for women of all ages. She brings varied expertise which is an ideal addition to the BennCo team. She plays a significant supportive role in communications, administration, branding, and client service.\n\nMarie relocated to Colorado Springs from California in 2012 to marry her high-school sweetheart. She has one son, Steven, and one daughter, Adriana. Together with their blended family they have five children and eight grandchildren. Marie loves spending time with her three dogs—English Lab Scott, Scott's daughter Abigail, a Malshipoo named Hazel—and the two cats, Princess and Luna. She also enjoys traveling, specifically to Italy to visit her extended family, entertaining, and gardening.",
    credentials: ["Executive Administrative Experience", "Forensic Psychology Degree"],
    specialties: ["Administrative Support", "Client Communications", "Branding Support", "Counseling Services"],
    experience: "20+ years as Executive Administrative Assistant",
    education: ["Degree in Forensic Psychology"],
    contact: {
      email: "marie@bennco.com",
      phone: "(719) 577-0099"
    }
  },
  "drew-elwell": {
    name: "Drew Elwell",
    title: "Intern",
    image: "drew-photo.jpg",
    bio: "Drew Elwell is an intern at BennCo Advisors, where he brings fresh perspectives and enthusiasm to the team. He is a student at the University of Colorado Boulder where he is majoring in business with a focus on finance and personal financial planning. Drew is dedicated to growing professionally and contributing to BennCo Advisors' mission of providing exceptional financial guidance to clients in Colorado Springs and beyond. Outside of work and school, Drew enjoys fishing on mountain lakes, biking local trails, and skiing in the Rockies.",
    credentials: ["Student", "Intern in Training"],
    specialties: ["Research Support", "Administrative Assistance", "Client Service Support", "Financial Planning Fundamentals"],
    experience: "Current intern gaining industry experience",
    education: ["Currently pursuing a degree in business administration with an emphasis in finance and personal financial planning"],
    contact: {
      email: "drew@bennco.com",
      phone: "(719) 577-0099"
    }
  }
};

// Function to get the correct image for each team member
const getTeamMemberImage = (memberName: string) => {
  switch (memberName) {
    case "Brian Bennett":
      return Brian;
    case "Taylor Willson":
      return Taylor;
    case "Roland Quast":
      return Roland;
    case "Drew Elwell":
      return Drew;
    case "Marie Patti":
      return Marie;
    default:
      return null;
  }
};

export default function TeamBio() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/team/:member");
  
  const memberKey = params?.member;
  const member = memberKey ? teamBios[memberKey] : null;

  const handleGoBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation("/");
  };

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Team Member Not Found</h1>
          <Button onClick={handleGoBack} className="bg-bennco-green hover:bg-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 animate-page-enter">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            onClick={handleGoBack}
            variant="ghost"
            className="mb-6 text-bennco-navy hover:text-green-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Button>
        </div>
      </section>
      {/* Bio Content */}
      <section className="py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-bennco-navy to-purple-900 text-white p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  {getTeamMemberImage(member.name) ? (
                    <img 
                      src={getTeamMemberImage(member.name)!}
                      alt={member.name}
                      className={`w-32 h-32 rounded-full object-cover shadow-lg ${
                        member.name === "Marie Patti" ? "object-center" : "object-top"
                      }`}
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-bennco-beige to-gray-200 shadow-lg flex items-center justify-center">
                      <Users className="text-gray-400 h-16 w-16" />
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-premium rounded-full flex items-center justify-center">
                    <Award className="text-white h-4 w-4" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
                  <p className="text-xl text-white/90 mb-4">{member.title}</p>
                  <p className="text-white/80">{member.experience}</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Bio */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-bennco-navy mb-4">About {member.name.split(' ')[0]}</h2>
                  <div className="text-gray-700 leading-relaxed mb-6">
                    {member.name === "Brian Bennett" ? (
                      <div className="space-y-4">
                        <p>Brian Bennett started as a broker with EF Hutton in 1976, followed by 13 years with Boettcher and Company, a Colorado investment banking firm. In order to avoid the ethical conflicts associated with the corporate brokerage model, he became an independent advisor in 1991 and transitioned from an investment "sales culture" to a "consultative problem solving" culture. He created BennCo Advisors in 1998.</p>
                        
                        <p>Brian has had extensive experience as a decision maker for institutions lending valuable insights when advising individual investors.</p>
                        
                        <p>He has served as trustee of the Colorado Episcopal Foundation, and the chair of the Foundation's Investment Committee overseeing management of over $30 million church funds. He served 21 years on the Regis University Investment Oversight Committee, managing the University's current $90 million endowment.</p>
                        
                        <p>As an active community volunteer, he has served as chair of the Better Business Bureau, the BBB Foundation, President of the Cathedral Ridge Camp and Retreat Center in Woodland Park, Colorado, and is a member of the Rotary Club of East Colorado Springs.</p>
                        
                        <p>As members of Chapel of our Saviour Episcopal Church, he and his wife Becky conceived, organized and are currently founders and co-chairs of the Feast of Saint Arnold, <em>Colorado's Family Friendly Beer Festival</em> which has raised over $400,000 for charity since 2012.</p>
                        
                        <p>He and Becky have been married for 26 years and with their blended family have 6 grandchildren. Hobbies include cooking, entertaining at home, and wine and craft beer tasting.</p>
                      </div>
                    ) : member.name === "Roland Quast" ? (
                      <div className="space-y-4">
                        <p>Mr. Quast is a senior business executive with over 3 decades of experience in the financial services industry. He has held leadership and executive management roles at several capital market firms including the two companies which he founded. He has not only been involved with the de novo formation of several distribution platforms retail broker dealer and RIA channels but subsequently was accountable for raising the capital for those firm’s various investment programs.</p>
                        
                        <p>Roland has a deep knowledge of investment product structures including stock and bonds, REITs, private placements mutual funds, and qualified retirement platforms.</p>
                        
                        <p>The favorite part of his career is working with clients to help them find a solution to their specific investment needs and objectives.</p>
                        
                        <p>Roland graduated from the University of Minnesota where he received a B.B.A in Finance and a B.A. in Economics. He has received program certification awards from firms such as Sequoia, Miller Heiman, The Fusion Group, Dale Carnegie, Zig Ziglar and The Wholesaler Institute. Mr. Quast has completed several Financial Industry Regulatory Authority (FINRA) securities exams, including the Series 6, 7, 24, 63, 65 and 99.</p>
                        
                        <p>In his spare time Roland enjoys Colorado's diverse outdoor activities such as fly fishing, skiing, golfing, biking and hiking. He also enjoys reading, cooking, wine and listening to music.</p>
                      </div>
                    ) : member.name === "Taylor Willson" ? (
                      <div className="space-y-4">
                        <p>Taylor Willson started his career in financial services in 2008 as an administrative assistant at Morgan Stanley Smith Barney. He then joined Northwestern Mutual as a financial representative in 2010 specializing in life, disability and long-term care insurance. After three years at Northwestern Mutual, Taylor joined Bennco Advisors as an independent financial advisor. In his 12 years at Bennco Advisors Taylor has assisted clients of all ages with retirement, income and insurance planning.</p>
                        
                        <p>Taylor is a Colorado Springs native and active in the community, serving as a board member for the Maytag Crawford charitable trust, coaching youth sports for Colorado Springs Parks and Recreation as well as running the kickoff golf tournament for the Empty Stocking Foundation.</p>
                        
                        <p>Taylor is a proud uncle to four nephews. He is an avid golfer sporting a 2-handicap index, enjoys working out, spending time outside and traveling.</p>
                      </div>
                    ) : (
                      <p>{member.bio}</p>
                    )}
                  </div>

                  
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  

                  {/* Specialties */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-bennco-navy mb-3">Specialties</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {member.specialties.map((specialty, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-bennco-green rounded-full mr-2"></div>
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Contact */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-bennco-navy mb-3">Contact</h3>
                      <div className="space-y-3">
                        {member.contact.email && (
                          <div className="flex items-center text-sm text-gray-700">
                            <Mail className="h-4 w-4 mr-2 text-bennco-green" />
                            <a href={`mailto:${member.contact.email}`} className="hover:text-bennco-green">
                              {member.contact.email}
                            </a>
                          </div>
                        )}
                        {member.contact.phone && (
                          <div className="flex items-center text-sm text-gray-700">
                            <Phone className="h-4 w-4 mr-2 text-bennco-green" />
                            <a href={`tel:${member.contact.phone}`} className="hover:text-bennco-green">
                              {member.contact.phone}
                            </a>
                          </div>
                        )}
                        {member.contact.linkedin && (
                          <div className="flex items-center text-sm text-gray-700">
                            <Linkedin className="h-4 w-4 mr-2 text-bennco-green" />
                            <a href={member.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-bennco-green">
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-bennco-beige">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-bennco-navy mb-4">
            Ready to Work with {member.name.split(' ')[0]}?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Schedule a consultation to discuss your financial goals.
          </p>
          <Button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setLocation("/contact");
            }}
            className="bg-bennco-green hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
          >
            Schedule Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}