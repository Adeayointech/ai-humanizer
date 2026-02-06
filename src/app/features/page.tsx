import { Card, CardContent } from "@/components/ui/card";
import { Clipboard, Sparkles, FileDown } from "lucide-react";
import Navigation from '@/components/Navigation';

export default function FeaturesSection() {
  const features = [
    {
      title: "AI Detection",
      description:
        "Paste your text and instantly see whether it’s AI-generated or human-written with accurate detection.",
      icon: <Sparkles className="w-8 h-8 text-green-300" />,
    },
    {
      title: "Humanize Text",
      description:
        "One-click humanization makes AI text undetectable while keeping the meaning and flow natural.",
      icon: <Clipboard className="w-8 h-8 text-blue-300" />,
    },
    {
      title: "Download Reports",
      description:
        "Export detailed detection reports for proof — download as PDF or DOCX in seconds.",
      icon: <FileDown className="w-8 h-8 text-purple-300" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950">
        <Navigation/>
    
<section className="py-12">
        
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mb-6">
          <span className="text-5xl">⚡</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-4 drop-shadow-xl">
          Powerful Features at Your Fingertips
        </h2>
        <p className="text-lg text-violet-300 max-w-2xl mx-auto mb-12 drop-shadow-md">
          Transform AI-generated content into authentic human writing with our advanced suite of tools
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-3xl p-6 bg-gradient-to-br from-violet-900/70 to-indigo-900/70 backdrop-blur-lg border-2 border-violet-500/40 hover:border-violet-400/60 transform hover:scale-105"
            >
              <CardContent className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="p-4 bg-gradient-to-br from-violet-700/50 to-indigo-700/50 rounded-2xl shadow-lg backdrop-blur-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-violet-200">{feature.title}</h3>
                <p className="text-violet-300 text-sm leading-relaxed">
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

