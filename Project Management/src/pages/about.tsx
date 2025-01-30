import React from "react";
import { motion } from "framer-motion";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const About = () => {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gray-50 text-gray-800">
      {/* Animated Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Bubble 1 */}
        <motion.div
          className="absolute w-24 h-24 bg-blue-300 rounded-full opacity-50"
          initial={{ x: -200, y: -100, scale: 0.8 }}
          animate={{ x: [50, -30, 100], y: [20, 80, -50], scale: [0.8, 1.2, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bubble 2 */}
        <motion.div
          className="absolute w-16 h-16 bg-purple-400 rounded-full opacity-40"
          initial={{ x: 150, y: 200, scale: 1 }}
          animate={{ x: [100, 300, 50], y: [200, 100, 250], scale: [1, 0.9, 1.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bubble 3 */}
        <motion.div
          className="absolute w-32 h-32 bg-pink-300 rounded-full opacity-50"
          initial={{ x: 200, y: -50, scale: 1.2 }}
          animate={{ x: [250, -50, 100], y: [150, 300, -100], scale: [1.2, 1, 1.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Header />
      <main className="container mx-auto p-6 relative z-10">
        {/* Page Title */}
        <motion.h1
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Taskify
        </motion.h1>

        {/* Mission Section */}
        <section className="mb-12 p-6 bg-white shadow-lg rounded-lg">
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            At Taskify, our mission is to empower teams to work smarter, not harder. We simplify task management, enhance communication, and help teams achieve success. By combining cutting-edge technology with intuitive design, we ensure that every user can focus on what matters most – their goals and productivity.
          </motion.p>
          <motion.p
            className="text-lg mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            We believe that teamwork and collaboration are the cornerstones of innovation. Our platform is designed to eliminate friction, streamline workflows, and inspire creativity across teams of all sizes.
          </motion.p>
        </section>

        {/* What We Do Section */}
        <section className="mb-12 p-6 bg-white shadow-lg rounded-lg">
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            What We Do
          </motion.h2>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            We provide a powerful task management tool for modern teams. With Taskify, users can create, assign, and track tasks in real-time using an intuitive interface designed for seamless collaboration. Our features include:
          </motion.p>
          <ul className="list-disc pl-6 mt-4 text-lg">
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Comprehensive task tracking with deadlines and priorities.
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Real-time notifications and updates to keep everyone aligned.
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Integration with popular tools to streamline your workflow.
            </motion.li>
          </ul>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-12 p-6 bg-white shadow-lg rounded-lg">
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Taskify goes beyond task management, becoming your team’s collaboration hub. Here’s why we stand out:
          </motion.p>
          <ul className="list-disc pl-6 mt-4 text-lg">
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Easy-to-use interface with a focus on user experience.
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Advanced analytics to track team progress and identify bottlenecks.
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Robust security features to protect your data.
            </motion.li>
          </ul>
        </section>

        {/* Our Vision Section */}
        <section className="mb-12 p-6 bg-white shadow-lg rounded-lg">
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Our Vision
          </motion.h2>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Our vision is to be the go-to platform for teams worldwide, helping them become more productive, efficient, and collaborative. We aim to create a future where:
          </motion.p>
          <ul className="list-disc pl-6 mt-4 text-lg">
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Every team, regardless of size, has access to the tools they need to succeed.
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Collaboration is seamless, eliminating barriers to communication.
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Technology empowers creativity and drives meaningful outcomes.
            </motion.li>
          </ul>
        </section>

        {/* Join Us Section */}
        <section className="p-6 bg-white shadow-lg rounded-lg">
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join Us on Our Journey
          </motion.h2>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            We’re excited to be part of your team’s journey. Let’s make work simpler, more organized, and more enjoyable – together. Join our growing community of innovators, and let’s shape the future of teamwork.
          </motion.p>
          <motion.p
            className="text-lg mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Whether you’re a startup, a small business, or a large enterprise, Taskify is here to help you achieve your goals. Let’s build something amazing, together.
          </motion.p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
