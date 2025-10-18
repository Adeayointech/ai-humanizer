import { Card, CardContent } from "@/components/ui/card";
import { Clipboard, Sparkles, FileDown } from "lucide-react";
import Navigation from '@/components/Navigation';

export default function FeaturesSection() {
  const features = [
    {
      title: "AI Detection",
      description:
        "Paste your text and instantly see whether it’s AI-generated or human-written with accurate detection.",
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
    },
    {
      title: "Humanize Text",
      description:
        "One-click humanization makes AI text undetectable while keeping the meaning and flow natural.",
      icon: <Clipboard className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Download Reports",
      description:
        "Export detailed detection reports for proof — download as PDF or DOCX in seconds.",
      icon: <FileDown className="w-8 h-8 text-purple-600" />,
    },
  ];

  return (
    <div className="">
        <Navigation/> { }
    
<section className="py-16 bg-gray-50">
        
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Powerful Features at Your Fingertips
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-xl transition rounded-2xl p-6"
            >
              <CardContent className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-white rounded-full shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </div>
    );
    }

