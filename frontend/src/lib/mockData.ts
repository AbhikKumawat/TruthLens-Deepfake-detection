export const mockStats = {
  totalVideos: 142,
  aiDetected: 18,
  verifiedClean: 124,
  avgScore: 94.5,
};

export const mockDashboardCharts = {
  monthlyUploads: [
    { name: 'Jan', uploads: 12 },
    { name: 'Feb', uploads: 19 },
    { name: 'Mar', uploads: 25 },
    { name: 'Apr', uploads: 32 },
    { name: 'May', uploads: 48 },
    { name: 'Jun', uploads: 64 },
  ],
  detectionResults: [
    { name: 'Authentic', value: 124, color: '#10b981' },
    { name: 'AI Detected', value: 18, color: '#ef4444' },
  ],
};

export const mockVideos = [
  {
    id: 'vid_1',
    title: 'Presidential Speech 2024',
    uploadDate: '2024-06-15T10:30:00Z',
    status: 'Completed',
    score: 98,
    aiPercentage: 2,
    thumbnail: '/placeholder-1.jpg'
  },
  {
    id: 'vid_2',
    title: 'Breaking News - Market Crash',
    uploadDate: '2024-06-14T14:20:00Z',
    status: 'Completed',
    score: 45,
    aiPercentage: 85,
    thumbnail: '/placeholder-2.jpg'
  },
  {
    id: 'vid_3',
    title: 'Celebrity Interview Extracted',
    uploadDate: '2024-06-14T09:15:00Z',
    status: 'Processing',
    score: null,
    aiPercentage: null,
    thumbnail: '/placeholder-3.jpg'
  },
  {
    id: 'vid_4',
    title: 'Local Event Coverage',
    uploadDate: '2024-06-13T16:45:00Z',
    status: 'Completed',
    score: 95,
    aiPercentage: 4,
    thumbnail: '/placeholder-4.jpg'
  },
  {
    id: 'vid_5',
    title: 'Viral TikTok Reaction',
    uploadDate: '2024-06-12T11:05:00Z',
    status: 'Rejected',
    score: 12,
    aiPercentage: 96,
    thumbnail: '/placeholder-5.jpg'
  }
];

export const mockReport = {
  id: 'rep_1',
  videoId: 'vid_1',
  title: 'Presidential Speech 2024',
  uploadDate: '2024-06-15T10:30:00Z',
  status: 'Completed',
  score: 98,
  aiPercentage: 2,
  confidence: 99.5,
  processingTime: '24s',
  timeline: [
    { time: '0:00 - 1:15', status: 'Clean' },
    { time: '1:16 - 1:22', status: 'Suspicious', details: 'Lip sync anomaly detected' },
    { time: '1:23 - 5:00', status: 'Clean' },
  ],
  frameAnalysis: [
    { frame: 100, score: 99 },
    { frame: 200, score: 98 },
    { frame: 300, score: 97 },
    { frame: 400, score: 82 },
    { frame: 500, score: 99 },
  ]
};
