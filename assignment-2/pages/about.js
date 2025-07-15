// pages/about.js
import Head from "next/head";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Target,
  Award,
  Code,
  Globe,
  Heart,
  Zap,
  Shield,
  Cpu,
  Languages,
  BookOpen,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Analysis",
      description:
        "Advanced natural language processing to extract key insights from any blog post or article.",
    },
    {
      icon: Languages,
      title: "Urdu Translation",
      description:
        "Professional-quality translation to Urdu with context-aware linguistic processing.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Get comprehensive summaries in seconds with our optimized processing pipeline.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your data is processed securely and never stored permanently on our servers.",
    },
    {
      icon: BookOpen,
      title: "Smart Insights",
      description:
        "Keyword extraction, sentiment analysis, and reading time estimation.",
    },
    {
      icon: Globe,
      title: "Multi-Format Export",
      description:
        "Export your summaries in multiple formats including PDF, Word, and plain text.",
    },
  ];

  const team = [
    {
      name: "Shahzeb Faisal",
      role: "Full Stack Developer",
      image: "/api/placeholder/100/100",
      bio: "Passionate about AI and web development, building the future of content analysis.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Articles Summarized" },
    { number: "5,000+", label: "Happy Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "50+", label: "Languages Supported" },
  ];

  return (
    <>
      <Head>
        <title>About - AI Blog Summariser</title>
        <meta
          name="description"
          content="Learn about our AI-powered blog summarization tool and the team behind it."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                About BlogAI
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                We're revolutionizing how people consume content by making
                lengthy articles accessible through intelligent summarization
                and seamless translation.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try It Now
                </motion.button>
                <motion.button
                  className="btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  To make knowledge accessible to everyone by breaking down
                  language barriers and information overload through intelligent
                  AI-powered summarization.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Target,
                    title: "Accessibility",
                    description:
                      "Making complex information digestible for everyone, regardless of time constraints or reading preferences.",
                  },
                  {
                    icon: Users,
                    title: "Inclusivity",
                    description:
                      "Breaking language barriers by providing high-quality translations in multiple languages.",
                  },
                  {
                    icon: Award,
                    title: "Excellence",
                    description:
                      "Delivering the highest quality summaries and translations through cutting-edge AI technology.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="card card-hover text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <item.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose BlogAI?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our platform combines the latest in AI technology with
                user-friendly design to deliver the best summarization
                experience.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Meet the Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Built with passion during the Nexium AI-First Web Development
                Internship.
              </p>
            </motion.div>

            <div className="flex justify-center">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="card card-hover text-center max-w-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Reading Experience?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already saving time and gaining
                insights with our AI-powered summarization tool.
              </p>
              <motion.button
                className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
