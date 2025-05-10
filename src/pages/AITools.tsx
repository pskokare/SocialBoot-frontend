import React from 'react';
import { MessageSquare, Hash, PenSquare, Zap } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ size?: number; className?: string }>;
  comingSoon?: boolean;
}

const tools: Tool[] = [
  {
    id: 'tweet-generator',
    name: 'Tweet Generator',
    description: 'Generate engaging tweets that capture attention and drive engagement.',
    icon: MessageSquare,
  },
  {
    id: 'hashtag-recommender',
    name: 'Hashtag Recommender',
    description: 'Get smart hashtag suggestions to increase your content reach.',
    icon: Hash,
  },
  {
    id: 'caption-rewriter',
    name: 'Caption Rewriter',
    description: 'Transform your captions into engaging, platform-optimized content.',
    icon: PenSquare,
  },
  {
    id: 'viral-idea-generator',
    name: 'Viral Idea Generator',
    description: 'Generate viral content ideas tailored to your niche.',
    icon: Zap,
  },
];

const AITools: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900">AI Tools</h1>
          <p className="mt-2 text-gray-600">
            Supercharge your social media presence with our AI-powered tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Card key={tool.id} className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <tool.icon size={24} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {tool.name}
                    </h2>
                    <p className="mt-1 text-gray-500">{tool.description}</p>
                  </div>
                </div>
                
                {tool.comingSoon ? (
                  <span className="mt-4 inline-block px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">
                    Coming Soon
                  </span>
                ) : (
                  <button className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                    Try Now →
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AITools;