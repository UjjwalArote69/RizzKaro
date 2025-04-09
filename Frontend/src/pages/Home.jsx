import { useState } from 'react';
// import { motion } from 'framer-motion';
import { Search, Bell, Plus, Home, MessageCircle, User } from 'lucide-react';
// import { Card, CardContent } from "../components/ui/card";
import Navbar from '../components/Shared/Navbar';

const stories = [
  { id: 1, img: '/your-story.jpg', name: 'Your Story' },
  { id: 2, img: '/story-2.jpg' },
  { id: 3, img: '/story-3.jpg' },
  { id: 4, img: '/story-4.jpg' },
  { id: 5, img: '/story-5.jpg' },
];

const posts = [
  {
    id: 1,
    user: 'Nilesh',
    time: '1h ago',
    content:
      "Discover adventure in patagonia’s peaks or serenity provence’s @hamlets – arrival",
    images: ['/post1.jpg', '/post2.jpg', '/post3.jpg'],
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Discover');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white  space-y-4">
      {/* Topbar */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Bell className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white rounded-full text-xs flex items-center justify-center">
            3
          </div>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src="/avatar.jpg" alt="User Avatar" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 mt-4">
        {['Discover', 'Following'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-lg font-semibold ${
              activeTab === tab ? 'text-black' : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stories */}
      <div className="flex space-x-4 overflow-x-auto py-2">
        {stories.map((story, index) => (
          <div key={story.id} className="w-16 flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-400">
              <img
                src={story.img}
                alt={`Story ${index}`}
                className="object-cover w-full h-full"
              />
            </div>
            {story.name && <p className="text-xs mt-1">{story.name}</p>}
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {/* {posts.map((post) => (
          // <Card key={post.id} className="rounded-2xl p-4">
          //   <CardContent>
          //     <div className="flex items-center space-x-3 mb-2">
          //       <div className="w-10 h-10 rounded-full overflow-hidden">
          //         <img src="/avatar.jpg" alt="avatar" className="object-cover w-full h-full" />
          //       </div>
          //       <div>
          //         <p className="font-semibold text-sm">{post.user}</p>
          //         <p className="text-xs text-gray-500">Posted in u8s – {post.time}</p>
          //       </div>
          //     </div>
          //     <p className="text-sm mb-3">
          //       {post.content.split(/(\s@\w+)/g).map((word, i) => (
          //         <span
          //           key={i}
          //           className={word.startsWith('@') ? 'text-green-600 font-medium' : ''}
          //         >
          //           {word}
          //         </span>
          //       ))}
          //     </p>
          //     <div className="grid grid-cols-3 gap-2">
          //       {post.images.map((img, i) => (
          //         <img
          //           key={i}
          //           src={img}
          //           alt={`post-img-${i}`}
          //           className="rounded-xl object-cover w-full h-24"
          //         />
          //       ))}
          //     </div>
          //   </CardContent>
          // </Card>
        ))} */}
      </div>

      <Navbar/>
    </div>
  );
}
