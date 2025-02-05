import React, { useState } from 'react';
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { 
  Home, FileText, Brain, Code, Monitor, 
  Folder, Mic, Trophy, ArrowRight
} from 'lucide-react';

const JobReadyDashboard = () => {
  const [activeRound, setActiveRound] = useState('dashboard');
  const [progress] = useState(75);

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'resume', icon: FileText, label: 'Resume' },
    { id: 'aptitude', icon: Brain, label: 'Aptitude' },
    { id: 'technical', icon: Code, label: 'Technical' },
    { id: 'cs', icon: Monitor, label: 'CS' },
    { id: 'project', icon: Folder, label: 'Project' },
    { id: 'soft', icon: Mic, label: 'Interview' },
    { id: 'result', icon: Trophy, label: 'Result' }
  ];

  const tests = [
    { 
      title: 'Resume Screening',
      status: 'Completed',
      score: 92,
      time: '12 min'
    },
    { 
      title: 'Aptitude Test',
      status: 'In Progress',
      score: 75,
      time: '45 min'
    },
    { 
      title: 'Technical MCQ',
      status: 'Pending',
      time: '60 min'
    },
    { 
      title: 'Coding Test',
      status: 'Pending',
      time: '90 min'
    }
  ];

  return (
    <div className="ml-3.5 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">JobReady</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm opacity-70">John Doe</div>
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              JD
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-3xl font-bold">Job Readiness Score</h2>
            <span className="text-5xl font-bold text-blue-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1 bg-white/10" />
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-12">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveRound(id)}
              className={`p-4 rounded-lg transition-all ${
                activeRound === id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <Icon className="h-6 w-6 mb-2 mx-auto" />
              <span className="text-sm block text-center">{label}</span>
            </button>
          ))}
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test, index) => (
            <Card key={index} className="bg-white/5 border-0 hover:bg-white/10 transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-semibold">{test.title}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    test.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400'
                      : test.status === 'In Progress'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-white/10 text-white/70'
                  }`}>
                    {test.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm opacity-70">
                      Duration: {test.time}
                    </div>
                    {test.score && (
                      <div className="text-sm">
                        Score: <span className="text-blue-400">{test.score}%</span>
                      </div>
                    )}
                  </div>
                  <button className={`p-2 rounded-lg ${
                    test.status === 'Pending' 
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobReadyDashboard;