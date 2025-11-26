import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Sitemap() {
  const siteStructure = [
    {
      category: "Main Pages",
      pages: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" }
      ]
    },
    {
      category: "Services",
      pages: [
        { name: "Investment Management", path: "/investment-management" },
        { name: "Real Estate Exchanges (1031)", path: "/real-estate-exchanges" },
        { name: "Retirement Planning", path: "/retirement-planning" }
      ]
    },
    {
      category: "Tools",
      pages: [
        { name: "Financial Questionnaire", path: "/questionnaire" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bennco-beige via-white to-sage-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-bennco-navy mb-4">
            Site Map
          </h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Navigate through all pages and services offered by BennCo Advisors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteStructure.map((section) => (
            <Card key={section.category} className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl text-bennco-navy">
                  {section.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.pages.map((page) => (
                    <li key={page.path}>
                      <Link href={page.path}>
                        <span className="text-warm-gray hover:text-bennco-green cursor-pointer transition-colors duration-200 block py-2 px-3 rounded hover:bg-bennco-beige">
                          {page.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-warm-gray">
            Need help finding something? <Link href="/contact"><span className="text-bennco-green hover:underline cursor-pointer">Contact us</span></Link> for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}